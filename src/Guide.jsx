import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/header";
import CategorySelector from "./components/classification/CategorySelector";
import QuestionRenderer from "./components/classification/QuestionRenderer";
import ReportGenerator from "./components/classification/reportGenerator";
import { getQuestions } from "./components/Questions";
import { QuestionSetLoader } from "./components/QuestionSetLoader";
import useSessionHandling from "./hooks/useSessionHandling";  // Re-enabled session handling

function Guide() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Get translated questions
  const questions = getQuestions();
  
  // Define initial state
  const initialState = {
    currentQuestions: null,
    currentQuestionIndex: 0,
    answers: {},
    selectedCategories: [],
    questionSequence: [],
    currentSequenceIndex: 0,
    documentInfo: {
      name: "",
      type: "",
      owner: "",
      department: "",
      description: "",
    },
    showReport: false,
    regulationFlags: {},
    // Add loading state for question sets
    currentlyLoadingModule: null
  };

  // Clear session storage when component mounts to ensure fresh start
  useEffect(() => {
    // Only clear if there's no specific query parameter to preserve state
    if (!location.search.includes('preserve=true')) {
      sessionStorage.removeItem('guide-questionnaire');
      sessionStorage.removeItem('guide-questionnaire_stack');
    }
  }, [location.search]);

  // Use our custom hook for state management
  const {
    state,
    updateState,
    navigateTo,
    goBack,
    resetState,
    canGoBack
  } = useSessionHandling('guide-questionnaire', initialState);
  
  // Update current questions when language changes
  useEffect(() => {
    if (state.currentQuestions === questions && questions) {
      updateState({
        currentQuestions: questions
      });
    }
  }, [questions, state.currentQuestions, updateState]);

  // Destructure state for easier access
  const {
    currentQuestions,
    currentQuestionIndex,
    answers,
    selectedCategories,
    questionSequence,
    currentSequenceIndex,
    documentInfo,
    showReport,
    regulationFlags,
    currentlyLoadingModule
  } = state;

  // UI state that doesn't need persistence
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWelcomeExpanded, setIsWelcomeExpanded] = useState(false);

  // Handle document info form submission
  const handleDocumentInfoSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    
    // Use navigateTo to save current state and update
    navigateTo({
      currentQuestions: questions
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Handler for toggling categories
  const handleCategoryToggle = (categoryValue) => {
    console.log("Toggle category:", categoryValue);
    const newSelectedCategories = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter(cat => cat !== categoryValue)
      : [...selectedCategories, categoryValue];
    
    // Use updateState to only update selectedCategories without creating a new navigation entry
    updateState({ selectedCategories: newSelectedCategories });
  };

  // Handler for proceeding from category selection
  const handleProceedFromCategories = () => {
    console.log("Proceeding from categories with:", selectedCategories);
    setIsAnimating(true);
    
    // Remove any special markers used to force questions
    const actualCategories = selectedCategories.filter(cat => cat !== "_forceQuestions");
    
    // Log for debugging
    console.log("Categories screen state before transition:", {
      multiSelect: currentQuestions?.multiSelect,
      id: currentQuestions?.id,
      selectedCategories: actualCategories,
    });
    
    // Calculate regulation flags
    const newRegulationFlags = {
      gdpr: actualCategories.includes("pii") || actualCategories.includes("customer"),
      hipaa: actualCategories.includes("health"),
      sox: actualCategories.includes("financial"),
      pciDss: actualCategories.includes("financial") && actualCategories.includes("credentials")
    };
    
    // Always show at least one question set - start with an empty array
    const newQuestionSequence = [];
    
    // Only "public" is selected - show confidentiality questions
    if (actualCategories.length === 1 && actualCategories[0] === "public") {
      newQuestionSequence.push("confidentialityQuestions");
    }
    // Multiple categories or non-public categories selected
    else {
      // Determine question sequence based on selected categories
      if (
        actualCategories.includes("pii") ||
        actualCategories.includes("customer") ||
        actualCategories.includes("financial") ||
        actualCategories.includes("health") ||
        actualCategories.includes("credentials")
      ) {
        newQuestionSequence.push("legalRegulationsQuestions");
      }

      if (
        actualCategories.includes("pii") ||
        actualCategories.includes("customer") ||
        actualCategories.includes("financial") ||
        actualCategories.includes("hr")
      ) {
        newQuestionSequence.push("confidentialityQuestions");
      }

      if (actualCategories.includes("financial")) {
        newQuestionSequence.push("integrityQuestions");
      }

      if (actualCategories.includes("credentials")) {
        newQuestionSequence.push("accessControlQuestions");
      }

      if (actualCategories.length > 0) {
        newQuestionSequence.push("availabilityQuestions");
      }

      // Fallback: If somehow we still have no questions, add confidentiality
      if (newQuestionSequence.length === 0) {
        newQuestionSequence.push("confidentialityQuestions");
      }
    }

    // Debug log to help troubleshoot
    console.log("Question sequence:", newQuestionSequence);
    console.log("Selected categories:", actualCategories);

    // Important: Save the current state with categories visible to the navigation stack
    // This ensures we can go back to categories from the first question
    navigateTo({
      regulationFlags: newRegulationFlags,
      questionSequence: newQuestionSequence,
      selectedCategories: actualCategories,
      // Set the first module to load
      currentlyLoadingModule: newQuestionSequence[0],
      // Flag to indicate we're transitioning from categories
      _transitionFromCategories: true
    });
  };

  // Handler for when a question set is successfully loaded
  const handleQuestionSetLoaded = (questionSet) => {
    console.log("Question set loaded:", questionSet);
    
    // Determine if this is a direct transition from categories
    const isFromCategories = state._transitionFromCategories === true;
    
    // Stop animating and update state with the loaded questions
    setIsAnimating(false);
    
    // For the transition from categories to first question, use navigateTo
    // to ensure it's properly tracked in navigation history
    navigateTo({
      currentQuestions: questionSet,
      currentQuestionIndex: 0,
      currentlyLoadingModule: null,
      // Clear the transition flag
      _transitionFromCategories: false
    });
    
    // Log navigation state for debugging
    console.log("Question set loaded, navigation state:", {
      isFromCategories,
      questionSetLength: questionSet.length,
      firstQuestionId: questionSet[0]?.id,
      canGoBack
    });
  };

  // Handler for errors when loading question sets
  const handleQuestionSetError = (error) => {
    console.error("Error loading question set:", error);
    
    // If we have more modules in the sequence, try the next one
    if (currentSequenceIndex < questionSequence.length - 1) {
      const nextSequenceIndex = currentSequenceIndex + 1;
      navigateTo({  // Changed from updateState to navigateTo for better tracking
        currentSequenceIndex: nextSequenceIndex,
        currentlyLoadingModule: questionSequence[nextSequenceIndex]
      });
    } else {
      // If we've tried all modules, show the report
      console.error("Failed to load any question modules. Moving to report.");
      navigateTo({
        currentQuestions: [],
        showReport: true,
        currentlyLoadingModule: null
      });
      setIsAnimating(false);
    }
  };

  // Handler to move to the next question set in the sequence
  const loadNextQuestionSet = () => {
    if (currentSequenceIndex < questionSequence.length - 1) {
      const nextSequenceIndex = currentSequenceIndex + 1;
      navigateTo({  // Changed from updateState to navigateTo for consistent navigation
        currentSequenceIndex: nextSequenceIndex,
        currentlyLoadingModule: questionSequence[nextSequenceIndex]
      });
    } else {
      // If no more question sets, move to report
      navigateTo({
        currentQuestions: [],
        showReport: true,
        currentlyLoadingModule: null
      });
      setIsAnimating(false);
    }
  };

  // Handle answer selection
  const handleAnswer = (option) => {
    console.log("Handling answer:", option);
    setIsAnimating(true);
    
    try {
      const currentQuestion = currentQuestions[currentQuestionIndex];
      const newAnswers = { ...answers, [currentQuestion.id]: option.label };
      
      // Save current state and update answers
      navigateTo({
        answers: newAnswers
      });

      // Handle different navigation scenarios
      if (option.next === "skipToClassification") {
        console.log("Skipping to classification report due to skipToClassification");
        navigateTo({
          currentQuestions: [],
          showReport: true
        });
        setIsAnimating(false);
        return;
      }

      // Handle the case where finalQuestions is specified
      if (option.next === "finalQuestions") {
        console.log("Final questions option selected, moving to next set or report");
        // If we have more questions in the sequence, go to the next set
        if (currentSequenceIndex < questionSequence.length - 1) {
          loadNextQuestionSet();
          return;
        } else {
          // Otherwise proceed to report
          console.log("Moving to report after finalQuestions");
          navigateTo({
            currentQuestions: [],
            showReport: true
          });
          setIsAnimating(false);
          return;
        }
      }

      // Handle moving to a specific question set
      if (option.next && option.next.includes("Questions")) {
        console.log(`Loading specific question set: ${option.next}`);
        navigateTo({  // Changed from updateState to navigateTo for proper state tracking
          currentlyLoadingModule: option.next
        });
        return;
      }

      // Check if we've reached the end of current question set
      if (currentQuestionIndex >= currentQuestions.length - 1) {
        // If there are more question sets in the sequence, load the next one
        if (currentSequenceIndex < questionSequence.length - 1) {
          loadNextQuestionSet();
          return;
        }

        // Otherwise, show the report
        console.log("Completed all questions, moving to report");
        navigateTo({
          currentQuestions: [],
          showReport: true
        });
        setIsAnimating(false);
        return;
      }

      // Move to next question in current set
      console.log(`Moving to next question (${currentQuestionIndex + 1})`);
      navigateTo({
        currentQuestionIndex: currentQuestionIndex + 1
      });
      setIsAnimating(false);
    } catch (error) {
      console.error("Error in handleAnswer:", error);
      navigateTo({
        currentQuestions: [],
        showReport: true
      });
      setIsAnimating(false);
    }
  };

  // Handle document info updates
  const handleDocumentInfoChange = (field, value) => {
    updateState({
      documentInfo: {
        ...documentInfo,
        [field]: value
      }
    });
  };

  // Reset the questionnaire
  const resetClassification = () => {
    setIsAnimating(true);
    setTimeout(() => {
      resetState();
      setIsAnimating(false);
    }, 300);
  };

  // Modified push state to history approach
  useEffect(() => {
    if (isAnimating) return;
    
    // We'll rely on the useSessionHandling hook for navigation
    // This effect is now just for debugging and tracking transitions
    const currentStep = showReport ? 'report' :
                       currentlyLoadingModule ? 'loading' :
                       currentQuestions?.multiSelect ? 'categories' :
                       currentQuestions ? 'questions' : 'info';
    
    console.log(`Current guide step: ${currentStep}`, {
      showReport,
      currentlyLoadingModule,
      hasQuestions: Boolean(currentQuestions),
      isMultiSelect: Boolean(currentQuestions?.multiSelect),
      selectedCategories,
      questionSequence,
      currentSequenceIndex,
      navigationStackLength: canGoBack ? 'Has history' : 'No history',
    });
    
  }, [showReport, currentQuestions, currentlyLoadingModule, isAnimating, currentQuestionIndex, currentSequenceIndex, selectedCategories, questionSequence, canGoBack]);

  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <Header />
      <main className="container mx-auto mt-16 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold transition-opacity duration-300">
              {t('classification_guide_title')}
            </h1>
            <div className="flex space-x-2">
              {canGoBack && (
                <button
                  onClick={() => {
                    console.log("Back button clicked, current state:", {
                      hasQuestions: Boolean(currentQuestions),
                      currentQuestionsId: currentQuestions?.id,
                      multiSelect: currentQuestions?.multiSelect,
                      selectedCategories,
                    });
                    goBack();
                  }}
                  className="bg-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all duration-200"
                >
                  ← {t('common_button_previous')}
                </button>
              )}
              <button
                onClick={resetClassification}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all duration-200"
                title={t('guide.resetTitle')}
              >
                {t('common_button_reset')}
              </button>
            </div>
          </div>
  
          {/* Question set loader component - only rendered when needed */}
          {currentlyLoadingModule && (
            <QuestionSetLoader
              moduleName={currentlyLoadingModule}
              onLoad={handleQuestionSetLoaded}
              onError={handleQuestionSetError}
            />
          )}
  
          <div
            className={`transition-all duration-300 transform ${
              isAnimating
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            }`}
          >
            {showReport ? (
              <ReportGenerator
                documentInfo={documentInfo}
                answers={answers}
                selectedCategories={selectedCategories}
                onReset={resetClassification}
              />
            ) : currentlyLoadingModule ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple mx-auto mb-4"></div>
                <p className="text-gray-600">
                  {t('loading_questions')}...
                </p>
              </div>
            ) : (currentQuestions && (
               currentQuestions.multiSelect === true || 
               currentQuestions.id === 'categories'
             )) ? (
              <CategorySelector
                questions={currentQuestions}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                onCategoriesSelected={handleProceedFromCategories}
              />
            ) : currentQuestions ? (
              <QuestionRenderer
                currentQuestion={currentQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {t('classification_guide_welcome_title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('classification_guide_welcome_description')}
                  </p>
                  <div className="bg-purple/10 rounded-md p-4">
                    <h3 className="font-semibold mb-2">{t('classifcation_guide_what_to_expect')}:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>
                        {t('what_to_expect_item1')}
                      </li>
                      <li>
                        {t('what_to_expect_item2')}
                      </li>
                      <li>
                        {t('what_to_expect_item3')}
                      </li>
                      <li>
                        {t('what_to_expect_item4')}
                      </li>
                      <li>{t('what_to_expect_item5')}</li>
                    </ul>
                  </div>
                </div>
  
                <div className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setIsWelcomeExpanded(!isWelcomeExpanded)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <h2 className="text-xl font-semibold">{t('advanced_options')}</h2>
                    <svg
                      className={`w-6 h-6 transform transition-transform ${
                        isWelcomeExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isWelcomeExpanded
                        ? "max-h-[800px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 pt-0">
                      <p className="text-gray-700 mb-4">
                        {t('advanced_options_subtext')}
                      </p>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('document_name')}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t('common_optional')})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.name}
                          onChange={(e) => handleDocumentInfoChange('name', e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder={t('document_name_placeholder')}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('file_type')}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t('common_optional')})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.type}
                          onChange={(e) => handleDocumentInfoChange('type', e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder={t('file_type_placeholder')}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('document_owner')}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t('common_optional')})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.owner}
                          onChange={(e) => handleDocumentInfoChange('owner', e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder={t('document_owner_placeholder')}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('department')}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t('common_optional')})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.department}
                          onChange={(e) => handleDocumentInfoChange('department', e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder={t('department_placeholder')}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('description')}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t('common_optional')})
                          </span>
                        </label>
                        <textarea
                          value={documentInfo.description}
                          onChange={(e) => handleDocumentInfoChange('description', e.target.value)}
                          className="w-full p-2 border rounded-md"
                          rows="3"
                          placeholder={t('description_placeholder')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
  
                <button
                  onClick={handleDocumentInfoSubmit}
                  className="w-full bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01]"
                >
                  {t('common_button_start_classification')}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Guide;
