import { useState } from "react";
import Header from "./components/header";
import CategorySelector from "./components/classification/CategorySelector";
import QuestionRenderer from "./components/classification/QuestionRenderer";
import ReportGenerator from "./components/classification/reportGenerator";
import { questions } from "./components/Questions";

function Guide() {
  const [currentQuestions, setCurrentQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [questionSequence, setQuestionSequence] = useState([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [documentInfo, setDocumentInfo] = useState({
    name: "",
    type: "",
    owner: "",
    department: "",
    description: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWelcomeExpanded, setIsWelcomeExpanded] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [regulationFlags, setRegulationFlags] = useState({});

  const handleDocumentInfoSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      // Start with category selection instead of questions
      setCurrentQuestions(questions);
      setIsAnimating(false);
    }, 300);
  };

  const handleCategoriesSelected = (categories) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategories(categories);

      // Store regulation flags for later use
      const regulationFlags = {
        gdpr: categories.includes("pii") || categories.includes("customer"),
        hipaa: categories.includes("health"),
        sox: categories.includes("financial"),
        pciDss: categories.includes("financial") && categories.includes("credentials")
      };
      
      setRegulationFlags(regulationFlags);

      // Determine question sequences based on selected categories
      const newQuestionSequence = [];

      // Add legal regulations questions automatically for data types with regulatory implications
      if (
        categories.includes("pii") ||
        categories.includes("customer") ||
        categories.includes("financial") ||
        categories.includes("health") ||
        categories.includes("credentials")
      ) {
        newQuestionSequence.push("legalRegulationsQuestions");
      }

      // Always start with confidentiality questions for sensitive data
      if (
        categories.includes("pii") ||
        categories.includes("customer") ||
        categories.includes("financial") ||
        categories.includes("hr")
      ) {
        newQuestionSequence.push("confidentialityQuestions");
      }

      // Add integrity questions for financial data
      if (categories.includes("financial")) {
        newQuestionSequence.push("integrityQuestions");
      }

      // Add access control questions for sensitive credentials
      if (categories.includes("credentials")) {
        newQuestionSequence.push("accessControlQuestions");
      }

      // Add availability questions for all documents except public
      if (!categories.includes("public")) {
        newQuestionSequence.push("availabilityQuestions");
      }

      // Backup sequence in case it's empty
      if (newQuestionSequence.length === 0) {
        newQuestionSequence.push("confidentialityQuestions");
      }

      setQuestionSequence(newQuestionSequence);

      // Start first sequence
      import(`./components/question-sets/${newQuestionSequence[0]}.js`)
        .then((module) => {
          setCurrentQuestions(module.default);
          setCurrentQuestionIndex(0);
          setCurrentSequenceIndex(0);
          setIsAnimating(false);
        })
        .catch((error) => {
          console.error("Failed to load first question module:", error);
          setCurrentQuestions([]);
          setShowReport(true);
          setIsAnimating(false);
        });
    }, 300);
  };

  const handleAnswer = (option) => {
    console.log("Current Questions:", currentQuestions);
    console.log("Current Question Index:", currentQuestionIndex);
    console.log("Selected Option:", option);
    console.log("Question Sequence:", questionSequence);
    console.log("Current Sequence Index:", currentSequenceIndex);

    setIsAnimating(true);
    setTimeout(() => {
      try {
        const currentQuestion = currentQuestions[currentQuestionIndex];
        const newAnswers = { ...answers, [currentQuestion.id]: option.label };
        setAnswers(newAnswers);

        // Direct next step handling
        if (option.next === "skipToClassification") {
          setCurrentQuestions([]);
          setShowReport(true);
          setIsAnimating(false);
          return;
        }

        // If next is another question set
        if (option.next && option.next.includes("Questions")) {
          import(`./components/question-sets/${option.next}.js`)
            .then((module) => {
              console.log("Importing module:", option.next);
              setCurrentQuestions(module.default);
              setCurrentQuestionIndex(0);
              setIsAnimating(false);
            })
            .catch((error) => {
              console.error(`Failed to load ${option.next}:`, error);
              setCurrentQuestions([]);
              setShowReport(true);
              setIsAnimating(false);
            });
          return;
        }

        // If at the end of current questions
        if (currentQuestionIndex >= currentQuestions.length - 1) {
          // Try to move to next questionnaire in sequence
          if (currentSequenceIndex < questionSequence.length - 1) {
            const nextSequenceIndex = currentSequenceIndex + 1;
            import(
              `./components/question-sets/${questionSequence[nextSequenceIndex]}.js`
            )
              .then((module) => {
                setCurrentQuestions(module.default);
                setCurrentQuestionIndex(0);
                setCurrentSequenceIndex(nextSequenceIndex);
                setIsAnimating(false);
              })
              .catch((error) => {
                console.error("Failed to load next questionnaire:", error);
                setCurrentQuestions([]);
                setShowReport(true);
                setIsAnimating(false);
              });
            return;
          }

          // No more questionnaires
          setCurrentQuestions([]);
          setShowReport(true);
          setIsAnimating(false);
          return;
        }

        // Move to next question in current set
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsAnimating(false);
      } catch (error) {
        console.error("Error in handleAnswer:", error);
        setCurrentQuestions([]);
        setShowReport(true);
        setIsAnimating(false);
      }
    }, 300);
  };

  const resetClassification = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestions(null);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setSelectedCategories([]);
      setQuestionSequence([]);
      setCurrentSequenceIndex(0);
      setDocumentInfo({
        name: "",
        type: "",
        owner: "",
        department: "",
        description: "",
      });
      setShowReport(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <Header />
      <main className="container mx-auto mt-16 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 transition-opacity duration-300">
            Document Classification Guide
          </h1>
  
          <div
            className={`transition-all duration-300 transform ${
              isAnimating
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            }`}
          >
            {showReport ? (
              // Report view
              <ReportGenerator
                documentInfo={documentInfo}
                answers={answers}
                selectedCategories={selectedCategories}
                onReset={resetClassification}
              />
            ) : currentQuestions && currentQuestions.multiSelect ? (
              // Category selection view
              <CategorySelector
                questions={currentQuestions}
                onCategoriesSelected={handleCategoriesSelected}
              />
            ) : currentQuestions ? (
              // Question view
              <QuestionRenderer
                currentQuestion={currentQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            ) : (
              // Welcome and document info form
              <div className="space-y-6">
                {/* Quick intro section - always visible */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Welcome to the Classification Guide
                  </h2>
                  <p className="text-gray-700 mb-4">
                    This guide will help you determine the appropriate
                    classification level for your document based on ISO27001
                    standards. Through a series of questions, we'll assess
                    the sensitivity and security requirements of your information.
                  </p>
                  <div className="bg-purple/10 rounded-md p-4">
                    <h3 className="font-semibold mb-2">What to expect:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>
                        Select all types of sensitive information in your
                        document
                      </li>
                      <li>
                        Answer questions about your document's content and
                        use
                      </li>
                      <li>
                        Receive a classification level based on ISO27001
                      </li>
                      <li>
                        Get specific handling and security instructions
                      </li>
                      <li>Estimated time: 2-3 minutes</li>
                    </ul>
                  </div>
                </div>
  
                {/* Advanced Options - collapsible */}
                <div className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setIsWelcomeExpanded(!isWelcomeExpanded)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <h2 className="text-xl font-semibold">Advanced Options (Optional)</h2>
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
                        Providing document details will help generate a more personalized 
                        classification report with specific handling instructions.
                      </p>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Document Name
                          <span className="text-gray-400 text-xs ml-2">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.name}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              name: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., Q4 Financial Report"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          File Type
                          <span className="text-gray-400 text-xs ml-2">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.type}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              type: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., PDF, DOCX, XLSX"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Document Owner
                          <span className="text-gray-400 text-xs ml-2">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.owner}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              owner: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., Ola Nordmann"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                          <span className="text-gray-400 text-xs ml-2">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={documentInfo.department}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              department: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                          placeholder="e.g., Finance"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brief Description
                          <span className="text-gray-400 text-xs ml-2">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          value={documentInfo.description}
                          onChange={(e) =>
                            setDocumentInfo({
                              ...documentInfo,
                              description: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                          rows="3"
                          placeholder="Brief description of the document's content and purpose"
                        />
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Start Classification button - outside dropdown */}
                <button
                  onClick={handleDocumentInfoSubmit}
                  className="w-full bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01]"
                >
                  Start Classification
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
