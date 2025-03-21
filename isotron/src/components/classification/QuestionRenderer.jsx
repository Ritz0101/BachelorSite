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
              className="w-full text-left p-4 rounded-md border border-gray-200 hover:bg-purple hover:border-purple transition-all duration-200 transform hover:scale-[1.01]"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default QuestionRenderer;