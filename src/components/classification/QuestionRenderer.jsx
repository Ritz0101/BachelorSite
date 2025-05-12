import React from 'react';
import { useTranslation } from 'react-i18next';

function QuestionRenderer({ currentQuestion, onAnswer, inAnimation, totalQuestions, currentQuestionIndex }) {
    const { t } = useTranslation();
    
    // Guard against undefined question
    if (!currentQuestion) {
      console.error("Question is undefined in QuestionRenderer");
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-red-100 p-4 rounded-md text-red-800">
            Error: Question data is missing. Please try reloading the page.
          </div>
        </div>
      );
    }
    
    // Process question text to look for translation keys
    const questionText = currentQuestion.translationKey 
      ? t(currentQuestion.translationKey) 
      : (currentQuestion.text || "Missing question text");
      
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {questionText}
        </h2>
        {currentQuestion.infoText && (
          <div className="bg-blue-50 p-4 rounded-md mb-4 text-gray-700">
            {currentQuestion.translationKeyInfo 
              ? t(currentQuestion.translationKeyInfo) 
              : currentQuestion.infoText}
          </div>
        )}
        
        <div className="space-y-4">
          {Array.isArray(currentQuestion.options) ? currentQuestion.options.map((option, index) => {
            if (!option) return null; // Skip invalid options
            
            const optionLabel = option.translationKey 
              ? t(option.translationKey) 
              : (option.label || `Option ${index + 1}`);
              
            return (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className="
                  w-full text-left p-4 rounded-md border 
                  border-gray-200 hover:border-purple 
                  hover:bg-purple/10 transition-all 
                  duration-200 transform hover:scale-[1.01]
                  flex items-center justify-between
                "
              >
                <span>{optionLabel}</span>
                <svg 
                  className="w-5 h-5 text-gray-400 hover:text-purple" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </button>
            );
          }) : (
            <div className="bg-red-100 p-4 rounded-md text-red-800">
              Error: No options available for this question.
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default QuestionRenderer;