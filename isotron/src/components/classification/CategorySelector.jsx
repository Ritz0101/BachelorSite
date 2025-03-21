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
          <div key={index} className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              id={`option-${index}`}
              checked={selectedCategories.includes(option.value)}
              onChange={() => toggleCategory(option.value)}
              className="mr-3 mt-1 h-5 w-5"
            />
            <label 
              htmlFor={`option-${index}`}
              className="w-full cursor-pointer text-left p-4 rounded-md border border-gray-200 hover:bg-purple/20 hover:border-purple transition-all duration-200"
            >
              <div className="font-medium">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              )}
            </label>
          </div>
        ))}
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="mt-4 p-4 bg-purple/10 rounded-md">
          <h3 className="font-medium mb-2">Selected Categories:</h3>
          <ul className="list-disc list-inside">
            {selectedCategories.map((category, index) => {
              const categoryOption = currentQuestion.options.find(opt => opt.value === category);
              return (
                <li key={index}>{categoryOption?.label || category}</li>
              );
            })}
          </ul>
        </div>
      )}
      
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