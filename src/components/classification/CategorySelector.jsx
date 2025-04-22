import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function CategorySelector({ questions, onCategoriesSelected, selectedCategories, onCategoryToggle }) {
  const { t } = useTranslation();
  
  // Handle the category toggle
  const toggleCategory = (value) => {
    if (onCategoryToggle) {
      onCategoryToggle(value);
    }
  };

  // Handle continue button click
  const handleContinue = () => {
    if (selectedCategories.length > 0) {
      onCategoriesSelected(selectedCategories);
    }
  };

  // Ensure we have a valid questions object
  const currentQuestion = questions || {
    text: t('guide.categories.defaultQuestion'),
    options: []
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {currentQuestion.text}
      </h2>
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
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
              <div className="font-medium">{option.label}</div>
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
        ))}
      </div>
      
      <button
        onClick={handleContinue}
        disabled={selectedCategories.length === 0}
        className={`w-full mt-6 bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors ${
          selectedCategories.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {t('guide.categories.continue')}
      </button>
      
      <p className="text-sm text-gray-500 mt-2 text-center">
        {t('guide.categories.selectHelp')}
      </p>
    </div>
  );
}

export default CategorySelector;