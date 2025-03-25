import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <main className="mt-16">
        {/* Hero section */}
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to Isotron!</h1>
          <p className="text-xl text-gray-600 mb-6">Your guide to secure information handling!</p>
        </div>
        {/* Info section */}
        <div className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-between p-6 rounded-lg border border-gray-300 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Classification Guide</h3>
                <p className="text-gray-600 mb-4">
                  Unsure how to handle sensitive information? Our classification guide helps you make the right decisions through a simple and effective checklist.
                </p>
                <p className="text-gray-600 mb-4">
                  Isotron is designed to assist employees in classifying sensitive data according to ISO 27001 standards. By following a decision tree, users can answer a series of questions that lead to a classification report, ensuring compliance and proper handling of information.
                </p>
                <Link to="/guide" className="bg-purple text-black px-2 py-1 rounded-md hover:bg-opacity-90 self-start">
                  Start Guide
                </Link>
              </div>
              <div className="flex flex-col justify-between p-6 rounded-lg border border-gray-300 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Training and Quiz</h3>
                <p className="text-gray-600 mb-4">
                  Start your learning journey with our interactive training modules and test your knowledge through our tailored quizzes.
                </p>
                <p className="text-gray-600 mb-4">
                  The training modules are designed to provide comprehensive knowledge about ISO 27001 compliance, helping employees understand the importance of data security and the steps necessary to maintain it. Each module includes quizzes to reinforce learning and ensure retention of key concepts.
                </p>
                <Link to="/training" className="bg-purple text-black px-2 py-1 rounded-md hover:bg-opacity-90 self-start">
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