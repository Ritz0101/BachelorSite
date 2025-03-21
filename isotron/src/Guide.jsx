import { useState } from 'react';
import Header from './components/header';
import { 
  questions, 
  confidentialityQuestions,
  integrityQuestions,
  availabilityQuestions,
  accessControlQuestions,
  legalRegulationsQuestions,
  backupQuestions,
  classificationRules 
} from './components/Questions';

function Guide() {
  const [currentQuestions, setCurrentQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
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
      setCurrentQuestions(questions);
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
        // If we're skipping directly to classification
        setCurrentQuestions([]);
        setShowReport(true); // Set this to true to show the report
      } else if (option.next === 'confidentialityQuestions' || 
                 option.next === 'integrityQuestions' || 
                 option.next === 'availabilityQuestions' || 
                 option.next === 'accessControlQuestions' || 
                 option.next === 'legalRegulationsQuestions' || 
                 option.next === 'backupQuestions') {
        // If we're changing to a different set of questions
        setCurrentQuestions(eval(option.next)); // Using the next value to determine which questions to show
        setCurrentQuestionIndex(0);
      } else if (currentQuestionIndex < currentQuestions.length - 1) {
        // If we're just moving to the next question in the current set
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // If we've reached the end of the questions
        setCurrentQuestions([]);
        setShowReport(true); // Set this to true to show the report
      }
      
      setIsAnimating(false);
    }, 300);
  };

  const generateDetailedReport = () => {
    const classification = classificationRules(answers);
    const handlingInstructions = {
      'Classification: Public': 'can be freely shared and distributed',
      'Classification: Internal Use Only': 'should only be shared within the organization',
      'Classification: Confidential': 'must be encrypted and access-controlled',
      'Classification: Highly Confidential': 'requires strict access control, encryption, and audit logging'
    };
  
    // First check if we have any document details at all
    const hasDocumentDetails = documentInfo.name || documentInfo.type || 
                              documentInfo.owner || documentInfo.department;
  
    // Check if we have a description
    const hasDescription = documentInfo.description && documentInfo.description.trim() !== '';
  
    return (
      <>
        {/* Only show Document Details section if at least one field is filled */}
        {hasDocumentDetails && (
          <>
            <h3 className="text-lg font-semibold mb-2">Document Details</h3>
            <p className="mb-4 text-gray-700">
              {/* Build the document details string conditionally */}
              {documentInfo.name && `Document "${documentInfo.name}"`}
              {documentInfo.type && documentInfo.name && ` (${documentInfo.type})`}
              {documentInfo.type && !documentInfo.name && `${documentInfo.type} document`}
              {documentInfo.owner && (documentInfo.name || documentInfo.type) && ` owned by ${documentInfo.owner}`}
              {documentInfo.owner && !documentInfo.name && !documentInfo.type && `Owned by ${documentInfo.owner}`}
              {documentInfo.department && documentInfo.owner && ` from ${documentInfo.department} department`}
              {documentInfo.department && !documentInfo.owner && `From ${documentInfo.department} department`}
              {/* Ensure we end with a period */}
              {hasDocumentDetails && '.'}
            </p>
          </>
        )}
        
        {/* Only show Description section if description exists */}
        {hasDescription && (
          <>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="mb-4 text-gray-700">{documentInfo.description}</p>
          </>
        )}
  
        <h3 className="text-lg font-semibold mb-2">Classification</h3>
        <p className="mb-4 text-gray-700">
          Based on Isotron's assessment, this document is classified as <strong>{classification}</strong>.
        </p>
  
        <h3 className="text-lg font-semibold mb-2">Handling Instructions</h3>
        <p className="mb-4 text-gray-700">
          This document {handlingInstructions[classification]}.
        </p>
  
        <div className="mt-6 p-4 bg-purple/10 rounded-md">
          <h4 className="font-semibold mb-2">Additional Security Measures:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {answers.q7 === "Yes" && <li>Requires 24/7 availability</li>}
            {answers.q9 === "Yes" && <li>Restricted access to specific personnel</li>}
            {answers.q5 === "Yes" && <li>Requires version control and audit trail</li>}
          </ul>
        </div>
      </>
    );
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
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Classification Report</h2>
                {generateDetailedReport()}
                <button
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentQuestions(null);
                      setCurrentQuestionIndex(0);
                      setAnswers({});
                      setDocumentInfo({
                        name: '',
                        type: '',
                        owner: '',
                        department: '',
                        description: ''
                      });
                      setShowReport(false); // Reset the report state
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className="mt-6 bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 w-full transition-all duration-200 transform hover:scale-[1.01]"
                >
                  Start New Classification
                </button>
              </div>
            ) : !currentQuestions || currentQuestions.length === 0 ? (
              // Welcome and form view
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
                      className="w-full bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90"
                    >
                      Start Classification
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              // Questions view
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {currentQuestions[currentQuestionIndex].text}
                </h2>
                <div className="space-y-4">
                  {currentQuestions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-4 rounded-md border border-gray-200 hover:bg-purple hover:border-purple transition-all duration-200 transform hover:scale-[1.01]"
                    >
                      {option.label}
                    </button>
                  ))}
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