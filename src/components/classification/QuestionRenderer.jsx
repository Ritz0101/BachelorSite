import React from 'react';
import { useTranslation } from 'react-i18next';

function QuestionRenderer({ currentQuestion, onAnswer }) {
    const { t } = useTranslation();
    
    // Process question text to look for translation keys
    const questionText = currentQuestion.translationKey 
      ? t(currentQuestion.translationKey) 
      : currentQuestion.text;
      
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
          {currentQuestion.options.map((option, index) => {
            const optionLabel = option.translationKey 
              ? t(option.translationKey) 
              : option.label;
              
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
          })}
        </div>
      </div>
    );
  }
  
  export default QuestionRenderer;