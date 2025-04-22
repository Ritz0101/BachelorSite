import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <main className="mt-16">
        {/* Hero section */}
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">
            <span className="inline-block px-1 transition-all duration-300 ease-in-out hover:scale-105 cursor-default">Welcome </span>
            <span className="inline-block px-2 transition-all duration-300 ease-in-out hover:scale-110 cursor-default">to </span>
            <span className="inline-block px-1 transition-all duration-300 ease-in-out hover:scale-105 cursor-default">Isotron!</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">Your guide to secure information handling!</p>
        </div>
        {/* Info section */}
        <div className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-between p-6 rounded-lg border-l-4 border-purple shadow-md bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Classification Guide</h3>
                <p className="text-gray-600 mb-4">
                  Unsure how to handle sensitive information? Our classification guide helps you make the right decisions through a simple and effective checklist.
                </p>
                <p className="text-gray-600 mb-4">
                  Isotron is designed to assist employees in classifying sensitive data according to ISO 27001 standards. By following a decision tree, users can answer a series of questions that lead to a classification report, ensuring compliance and proper handling of information.
                </p>
                <Link to="/guide" className="bg-dark-purple text-white rounded-lg p-4 hover:shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01] cursor-pointer self-start">
                  Start Guide
                </Link>
              </div>
              <div className="flex flex-col justify-between p-6 rounded-lg border-l-4 border-purple shadow-md bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Training and Quiz</h3>
                <p className="text-gray-600 mb-4">
                  Start your learning journey with our interactive training modules and test your knowledge through our tailored quizzes.
                </p>
                <p className="text-gray-600 mb-4">
                  The training modules are designed to provide comprehensive knowledge about ISO 27001 compliance, helping employees understand the importance of data security and the steps necessary to maintain it. Each module includes quizzes to reinforce learning and ensure retention of key concepts.
                </p>
                <Link to="/training" className="bg-dark-purple text-white rounded-lg p-4 hover:shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.01] cursor-pointer self-start">
                  Start Training
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;