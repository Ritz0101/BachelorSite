import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function CategorySelector({ categories, selectedCategories, onToggleCategory, onProceed }) {
  const { t } = useTranslation();
  
  // Add logging when component renders
  useEffect(() => {
    console.log("CategorySelector rendered with categories:", categories);
    console.log("Initial selectedCategories:", selectedCategories);
    
    // Verify the options exist and have expected structure
    if (categories && categories.length > 0) {
      console.log("Categories count:", categories.length);
      categories.forEach((option, index) => {
        console.log(`Category ${index}:`, option);
        if (!option.value) {
          console.warn(`Category ${index} is missing 'value' property:`, option);
        }
      });
    } else {
      console.error("Categories is missing or empty:", categories);
    }
  }, [categories, selectedCategories]);
  
  // Handle the category toggle
  const toggleCategory = (value) => {
    console.log(`Toggle category called with value: ${value}`);
    
    if (onToggleCategory) {
      onToggleCategory(value);
    } else {
      console.error("onToggleCategory function is not provided to CategorySelector");
    }
  };

  // Handle continue button click
  const handleContinue = () => {
    // Check if categories have been selected
    if (selectedCategories.length > 0) {
      console.log("Selected categories before processing:", selectedCategories);
      
      // Special case handling:
      // 1. If only "public" is selected, add a marker to ensure questions are shown
      // 2. If no categories would lead to questions, ensure we show some questions
      if (selectedCategories.length === 1 && selectedCategories[0] === "public") {
        console.log("Only 'public' selected, adding _forceQuestions marker");
        const augmentedCategories = [...selectedCategories, "_forceQuestions"];
        console.log("Augmented categories:", augmentedCategories);
        
        if (onProceed) {
          onProceed(augmentedCategories);
        } else {
          console.error("onProceed function is not provided");
        }
      } else {
        // Proceed with the selected categories as is
        console.log("Multiple categories selected, proceeding normally");
        
        if (onProceed) {
          onProceed(selectedCategories);
        } else {
          console.error("onProceed function is not provided");
        }
      }
    } else {
      console.warn("Continue clicked with no categories selected");
    }
  };

  // Construct a question object structure from categories
  const currentQuestion = {
    text: t('default_questions_categories'),
    options: categories || []
  };
  
  // Log the final question object before rendering
  console.log("Current question used for rendering:", currentQuestion);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {currentQuestion.text || "Select categories that apply"}
      </h2>
      <div className="space-y-3">
        {currentQuestion.options && currentQuestion.options.length > 0 ? (
          currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => toggleCategory(option.value)}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200 
                flex items-center relative
                ${selectedCategories.includes(option.value) 
                  ? 'bg-purple/30 text-purple-900 border-purple shadow-md' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-purple/50'}
              `}
            >
              <div 
                className={`
                  w-6 h-6 mr-4 border-2 rounded-md flex items-center justify-center 
                  ${selectedCategories.includes(option.value) 
                    ? 'bg-purple border-purple' 
                    : 'border-gray-300'}
                `}
              >
                {selectedCategories.includes(option.value) && (
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                )}
              </div>
              <div>
                <div className="font-medium">{option.label || `Option ${index+1}`}</div>
                {option.description && (
                  <div className="text-sm text-opacity-70 mt-1">
                    {option.description}
                  </div>
                )}
              </div>
              {selectedCategories.includes(option.value) && (
                <div className="absolute top-2 right-4 text-purple">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </button>
          ))
        ) : (
          <div className="bg-red-100 p-4 rounded-md text-red-800">
            Error: No options available. Please refresh the page or contact support.
          </div>
        )}
      </div>
      
      <button
        onClick={handleContinue}
        disabled={selectedCategories.length === 0}
        className={`w-full mt-6 bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors ${
          selectedCategories.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {t('common_button_continue') || "Continue"}
      </button>
      
      <p className="text-sm text-gray-500 mt-2 text-center">
        {t('guide_select_help') || "Select all categories that apply to your document"}
      </p>
    </div>
  );
}

export default CategorySelector;