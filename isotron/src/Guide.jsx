import { useState } from 'react';
import Header from './components/header';
import CategorySelector from './components/classification/CategorySelector';
import QuestionRenderer from './components/classification/QuestionRenderer';
import ReportGenerator from './components/classification/reportGenerator';
import { questions } from './components/Questions';


function Guide() {
  const [currentQuestions, setCurrentQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [questionSequence, setQuestionSequence] = useState([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [documentInfo, setDocumentInfo] = useState({
    name: '',
    type: '',
    owner: '',
    department: '',
    description: ''
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWelcomeExpanded, setIsWelcomeExpanded] = useState(false);
  const [showReport, setShowReport] = useState(false);

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
      
      // Determine question sequences based on selected categories
      const newQuestionSequence = [];
      
      if (categories.includes('pii') || categories.includes('customer')) {
        newQuestionSequence.push('confidentialityQuestions');
      }
      
      if (categories.includes('financial')) {
        newQuestionSequence.push('integrityQuestions');
      }
      
      if (categories.includes('credentials')) {
        newQuestionSequence.push('accessControlQuestions');
      }
      
      if (categories.includes('compliance')) {
        newQuestionSequence.push('legalRegulationsQuestions');
      }
      
      // Add availability questions for all documents except public
      if (!categories.includes('public')) {
        newQuestionSequence.push('availabilityQuestions');
      }
      
      setQuestionSequence(newQuestionSequence);
      
      // Start first sequence if we have any
      if (newQuestionSequence.length > 0) {
        // This is the correct way to do dynamic imports
        import(`./components/question-sets/${newQuestionSequence[0]}.js`)
          .then(module => {
            setCurrentQuestions(module.default);
            setCurrentQuestionIndex(0);
            setCurrentSequenceIndex(0);
          })
          .catch(error => {
            console.error("Failed to load question module:", error);
          });
      } else {
        // If no specific questionnaires needed, go straight to report
        setShowReport(true);
      }
      
      setIsAnimating(false);
    }, 300);
  };

  const handleAnswer = (option) => {
    setIsAnimating(true);
    setTimeout(() => {
      const currentQuestion = currentQuestions[currentQuestionIndex];
      const newAnswers = { ...answers, [currentQuestion.id]: option.label };
      setAnswers(newAnswers);
  
      if (option.next === 'skipToClassification') {
        // Skip to classification report
        setCurrentQuestions([]);
        setShowReport(true);
      } else if (option.next && option.next.includes('Questions')) {
        // Change to a different set of questions based on the next value
        import(`./components/question-sets/${option.next}.js`).then(module => {
          setCurrentQuestions(module.default);
          setCurrentQuestionIndex(0);
        });
      } else if (currentQuestionIndex < currentQuestions.length - 1) {
        // Move to next question in current set
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentSequenceIndex < questionSequence.length - 1) {
        // Move to next questionnaire in sequence
        const nextSequenceIndex = currentSequenceIndex + 1;
        import(`./components/question-sets/${questionSequence[nextSequenceIndex]}.js`).then(module => {
          setCurrentQuestions(module.default);
          setCurrentQuestionIndex(0);
          setCurrentSequenceIndex(nextSequenceIndex);
        });
      } else {
        // Finished all questions, show report
        setCurrentQuestions([]);
        setShowReport(true);
      }
      
      setIsAnimating(false);
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
        name: '',
        type: '',
        owner: '',
        department: '',
        description: ''
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
          
          <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
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
                question={currentQuestions}
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
                <div className="bg-white rounded-lg shadow-md">
                  <button 
                    onClick={() => setIsWelcomeExpanded(!isWelcomeExpanded)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <h2 className="text-xl font-semibold">Welcome to the Classification Guide</h2>
                    <svg 
                      className={`w-6 h-6 transform transition-transform ${isWelcomeExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${isWelcomeExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0">
                      <p className="text-gray-700 mb-4">
                        This guide will help you determine the appropriate classification level for your document 
                        based on ISO27001 standards. Through a series of questions, we'll assess the sensitivity 
                        and security requirements of your information.
                      </p>
                      <p className="text-gray-700 mb-4">
                        You can optionally provide details about your document below for a more personalized 
                        classification report. These details will help generate specific handling instructions 
                        for your document.
                      </p>
                      <div className="bg-purple/10 rounded-md p-4">
                        <h3 className="font-semibold mb-2">What to expect:</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Select all types of sensitive information in your document</li>
                          <li>Answer questions about your document's content and use</li>
                          <li>Receive a classification level based on ISO27001</li>
                          <li>Get specific handling and security instructions</li>
                          <li>Estimated time: 2-3 minutes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Document Information (Optional)</h2>
                  <form onSubmit={handleDocumentInfoSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Document Name
                        <span className="text-gray-400 text-xs ml-2">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={documentInfo.name}
                        onChange={(e) => setDocumentInfo({...documentInfo, name: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., Q4 Financial Report"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        File Type
                        <span className="text-gray-400 text-xs ml-2">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={documentInfo.type}
                        onChange={(e) => setDocumentInfo({...documentInfo, type: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., PDF, DOCX, XLSX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Document Owner
                        <span className="text-gray-400 text-xs ml-2">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={documentInfo.owner}
                        onChange={(e) => setDocumentInfo({...documentInfo, owner: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                        <span className="text-gray-400 text-xs ml-2">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={documentInfo.department}
                        onChange={(e) => setDocumentInfo({...documentInfo, department: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g., Finance"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brief Description
                        <span className="text-gray-400 text-xs ml-2">(optional)</span>
                      </label>
                      <textarea
                        value={documentInfo.description}
                        onChange={(e) => setDocumentInfo({...documentInfo, description: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        placeholder="Brief description of the document's content and purpose"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01]"
                    >
                      Start Classification
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Guide;