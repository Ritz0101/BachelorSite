import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/header";
import CategorySelector from "./components/classification/CategorySelector";
import QuestionRenderer from "./components/classification/QuestionRenderer";
import ReportGenerator from "./components/classification/reportGenerator";
import { questions } from "./components/Questions";
import useSessionHandling from "./hooks/useSessionHandling";

function Guide() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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
  };

  // Clear session storage when component mounts to ensure fresh start
  useEffect(() => {
    // Only clear if there's no specific query parameter to preserve state
    if (!location.search.includes("preserve=true")) {
      sessionStorage.removeItem("guide-questionnaire");
      sessionStorage.removeItem("guide-questionnaire_stack");
    }
  }, [location.search]);

  // Use our custom hook for state management
  const { state, updateState, navigateTo, goBack, resetState, canGoBack } =
    useSessionHandling("guide-questionnaire", initialState);

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
      currentQuestions: questions,
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Handler for toggling categories
  const handleCategoryToggle = (categoryValue) => {
    const newSelectedCategories = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter((cat) => cat !== categoryValue)
      : [...selectedCategories, categoryValue];

    // Use updateState to only update selectedCategories without creating a new navigation entry
    updateState({ selectedCategories: newSelectedCategories });
  };

  // Handler for proceeding from category selection
  const handleProceedFromCategories = () => {
    setIsAnimating(true);

    // Calculate regulation flags
    const newRegulationFlags = {
      gdpr:
        selectedCategories.includes("pii") ||
        selectedCategories.includes("customer"),
      hipaa: selectedCategories.includes("health"),
      sox: selectedCategories.includes("financial"),
      pciDss:
        selectedCategories.includes("financial") &&
        selectedCategories.includes("credentials"),
    };

    // Determine question sequences
    const newQuestionSequence = [];

    if (
      selectedCategories.includes("pii") ||
      selectedCategories.includes("customer") ||
      selectedCategories.includes("financial") ||
      selectedCategories.includes("health") ||
      selectedCategories.includes("credentials")
    ) {
      newQuestionSequence.push("legalRegulationsQuestions");
    }

    if (
      selectedCategories.includes("pii") ||
      selectedCategories.includes("customer") ||
      selectedCategories.includes("financial") ||
      selectedCategories.includes("hr")
    ) {
      newQuestionSequence.push("confidentialityQuestions");
    }

    if (selectedCategories.includes("financial")) {
      newQuestionSequence.push("integrityQuestions");
    }

    if (selectedCategories.includes("credentials")) {
      newQuestionSequence.push("accessControlQuestions");
    }

    if (!selectedCategories.includes("public")) {
      newQuestionSequence.push("availabilityQuestions");
    }

    if (newQuestionSequence.length === 0) {
      newQuestionSequence.push("confidentialityQuestions");
    }

    // Save current state and update with flags and sequence
    // Note: selectedCategories is already up-to-date from handleCategoryToggle
    navigateTo({
      regulationFlags: newRegulationFlags,
      questionSequence: newQuestionSequence,
    });

    // Load first question set
    import(`./components/question-sets/${newQuestionSequence[0]}.js`)
      .then((module) => {
        // Navigate to the first question set
        navigateTo({
          currentQuestions: module.default,
          currentQuestionIndex: 0,
          currentSequenceIndex: 0,
        });
        setIsAnimating(false);
      })
      .catch((error) => {
        console.error("Failed to load first question module:", error);
        navigateTo({
          currentQuestions: [],
          showReport: true,
        });
        setIsAnimating(false);
      });
  };

  // Handle answer selection
  const handleAnswer = (option) => {
    setIsAnimating(true);

    try {
      const currentQuestion = currentQuestions[currentQuestionIndex];
      const newAnswers = { ...answers, [currentQuestion.id]: option.label };

      // Save current state and update answers
      navigateTo({
        answers: newAnswers,
      });

      // Handle different navigation scenarios
      if (option.next === "skipToClassification") {
        navigateTo({
          currentQuestions: [],
          showReport: true,
        });
        setIsAnimating(false);
        return;
      }

      if (option.next && option.next.includes("Questions")) {
        import(`./components/question-sets/${option.next}.js`)
          .then((module) => {
            navigateTo({
              currentQuestions: module.default,
              currentQuestionIndex: 0,
            });
            setIsAnimating(false);
          })
          .catch((error) => {
            console.error(`Failed to load ${option.next}:`, error);
            navigateTo({
              currentQuestions: [],
              showReport: true,
            });
            setIsAnimating(false);
          });
        return;
      }

      if (currentQuestionIndex >= currentQuestions.length - 1) {
        if (currentSequenceIndex < questionSequence.length - 1) {
          const nextSequenceIndex = currentSequenceIndex + 1;
          import(
            `./components/question-sets/${questionSequence[nextSequenceIndex]}.js`
          )
            .then((module) => {
              navigateTo({
                currentQuestions: module.default,
                currentQuestionIndex: 0,
                currentSequenceIndex: nextSequenceIndex,
              });
              setIsAnimating(false);
            })
            .catch((error) => {
              console.error("Failed to load next questionnaire:", error);
              navigateTo({
                currentQuestions: [],
                showReport: true,
              });
              setIsAnimating(false);
            });
          return;
        }

        navigateTo({
          currentQuestions: [],
          showReport: true,
        });
        setIsAnimating(false);
        return;
      }

      // Move to next question in current set
      navigateTo({
        currentQuestionIndex: currentQuestionIndex + 1,
      });
      setIsAnimating(false);
    } catch (error) {
      console.error("Error in handleAnswer:", error);
      navigateTo({
        currentQuestions: [],
        showReport: true,
      });
      setIsAnimating(false);
    }
  };

  // Handle document info updates
  const handleDocumentInfoChange = (field, value) => {
    updateState({
      documentInfo: {
        ...documentInfo,
        [field]: value,
      },
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

  // Handle browser navigation
  useEffect(() => {
    // We're specifically handling just the showReport case here
    // The general navigation is handled by the useSessionHandling hook
    const handleShowReportBack = (event) => {
      if (isAnimating || !showReport) return;

      // Prevent further propagation if we're handling this event
      event.stopPropagation();
      event.preventDefault();

      setIsAnimating(true);

      // Update state to hide the report and show the last question
      updateState({
        showReport: false,
      });

      if (questionSequence.length > 0) {
        const lastSetIndex = questionSequence.length - 1;
        import(
          `./components/question-sets/${questionSequence[lastSetIndex]}.js`
        )
          .then((module) => {
            updateState({
              currentQuestions: module.default,
              currentQuestionIndex: module.default.length - 1,
              currentSequenceIndex: lastSetIndex,
            });
          })
          .catch((error) => {
            console.error("Failed to load last question set:", error);
            updateState({
              currentQuestions: questions,
              currentQuestionIndex: 0,
              currentSequenceIndex: 0,
            });
          });
      }

      setTimeout(() => setIsAnimating(false), 300);
    };

    // Special case for the report screen which needs custom back handling
    if (showReport) {
      window.addEventListener("popstate", handleShowReportBack, {
        capture: true,
      });
      return () =>
        window.removeEventListener("popstate", handleShowReportBack, {
          capture: true,
        });
    }

    return undefined;
  }, [showReport, isAnimating, questionSequence, updateState, questions]);

  // Push state to history when moving forward (on major screen transitions)
  useEffect(() => {
    if (isAnimating) return;

    const currentStep = showReport
      ? "report"
      : currentQuestions?.multiSelect
      ? "categories"
      : currentQuestions
      ? "questions"
      : "info";

    // Only push state on major screen transitions
    if (location.pathname === "/guide") {
      window.history.replaceState(
        {
          step: currentStep,
          timestamp: Date.now(),
          questionIndex: currentQuestionIndex,
          sequenceIndex: currentSequenceIndex,
        },
        "",
        "/guide"
      );
    }
  }, [location.pathname, showReport, currentQuestions, isAnimating]);

  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <Header />
      <main className="container mx-auto mt-16 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold transition-opacity duration-300">
              {t("guide.title")}
            </h1>
            <div className="flex space-x-2">
              {canGoBack && (
                <button
                  onClick={goBack}
                  className="bg-dark-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all duration-200"
                >
                  ← {t("common.previous")}
                </button>
              )}
              <button
                onClick={resetClassification}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all duration-200"
                title={t("guide.resetTitle")}
              >
                {t("guide.reset")}
              </button>
            </div>
          </div>

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
            ) : currentQuestions && currentQuestions.multiSelect ? (
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
                    {t("guide.welcome.title")}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t("guide.welcome.description")}
                  </p>
                  <div className="bg-purple/10 rounded-md p-4">
                    <h3 className="font-semibold mb-2">
                      {t("guide.welcome.expectTitle")}:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>{t("guide.welcome.expectItem1")}</li>
                      <li>{t("guide.welcome.expectItem2")}</li>
                      <li>{t("guide.welcome.expectItem3")}</li>
                      <li>{t("guide.welcome.expectItem4")}</li>
                      <li>{t("guide.welcome.expectItem5")}</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setIsWelcomeExpanded(!isWelcomeExpanded)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <h2 className="text-xl font-semibold">
                      {t("guide.advancedOptions")}
                    </h2>
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
                        {t("guide.documentInfoHelp")}
                      </p>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("guide.form.documentName")}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t("common.optional")})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.name}
                          onChange={(e) =>
                            handleDocumentInfoChange("name", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder={t("guide.form.documentNamePlaceholder")}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("guide.form.fileType")}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t("common.optional")})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.type}
                          onChange={(e) =>
                            handleDocumentInfoChange("type", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder={t("guide.form.fileTypePlaceholder")}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("guide.form.documentOwner")}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t("common.optional")})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.owner}
                          onChange={(e) =>
                            handleDocumentInfoChange("owner", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder={t("guide.form.documentOwnerPlaceholder")}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("guide.form.department")}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t("common.optional")})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.department}
                          onChange={(e) =>
                            handleDocumentInfoChange(
                              "department",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder={t("guide.form.departmentPlaceholder")}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("guide.form.description")}
                          <span className="text-gray-400 text-xs ml-2">
                            ({t("common.optional")})
                          </span>
                        </label>
                        <textarea
                          value={documentInfo.description}
                          onChange={(e) =>
                            handleDocumentInfoChange(
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-md"
                          rows="3"
                          placeholder={t("guide.form.descriptionPlaceholder")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDocumentInfoSubmit}
                  className="w-full bg-dark-purple text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01]"
                >
                  {t("guide.startClassification")}
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
