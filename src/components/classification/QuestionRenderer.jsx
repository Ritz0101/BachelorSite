import React from 'react';

function QuestionRenderer({ currentQuestion, onAnswer }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {currentQuestion.text}
        </h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
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
              <span>{option.label}</span>
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
          ))}
        </div>
      </div>
    );
  }
  
  export default QuestionRenderer;