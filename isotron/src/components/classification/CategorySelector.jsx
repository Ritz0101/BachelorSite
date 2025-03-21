import React from 'react';

/**
 * Component for selecting multiple data categories
 */
function CategorySelector({ questions, onCategoriesSelected }) {
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const toggleCategory = (value) => {
    setSelectedCategories(prev => 
      prev.includes(value) 
        ? prev.filter(cat => cat !== value) 
        : [...prev, value]
    );
  };

  const handleContinue = () => {
    onCategoriesSelected(selectedCategories);
  };

  // Ensure we have a valid questions object
  const currentQuestion = questions || {
    text: "Select document categories",
    options: []
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {currentQuestion.text}
      </h2>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => toggleCategory(option.value)}
            className={`
              w-full text-left p-4 rounded-md border transition-all duration-200 
              ${selectedCategories.includes(option.value) 
                ? 'bg-purple text-white border-purple' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-purple hover:bg-purple/10'}
            `}
          >
            <div className="flex items-center">
              <div 
                className={`
                  w-5 h-5 mr-3 border rounded 
                  ${selectedCategories.includes(option.value) 
                    ? 'bg-white border-white' 
                    : 'border-gray-300'}
                `}
              >
                {selectedCategories.includes(option.value) && (
                  <svg 
                    className="w-5 h-5 text-purple absolute -ml-1 -mt-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
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
            </div>
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
        Continue
      </button>
      
      <p className="text-sm text-gray-500 mt-2 text-center">
        Select all categories that apply to your document.
      </p>
    </div>
  );
}

export default CategorySelector;