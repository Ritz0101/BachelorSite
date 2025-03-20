import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-light-purple text-custom-black">
      <main className="mt-16">
        {/* Hero section */}
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Welcome to Isotron!</h1>
          <p className="text-xl text-gray-600 mb-8">Your guide to secure information handling!</p>
          <div className="flex justify-center gap-4">
            <Link to="/guide" className="bg-purple text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90">
              Start Guide
            </Link>
            <button className="bg-white text-custom-black px-6 py-3 rounded-md hover:bg-opacity-90 shadow-sm">
              Training
            </button>
          </div>
        </div>
        {/* Rest of the content remains the same */}
        {/* Info section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Classification Guide</h3>
                <p className="text-gray-600 mb-4">
                  Unsure how to handle sensitive information? Our classification guide 
                  helps you make the right decisions through a simple and effective checklist.
                </p>
                <button className="text-custom-black font-semibold hover:underline">
                  Start classification →
                </button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Training and Quiz</h3>
                <p className="text-gray-600 mb-4">
                  Start your learning journey with our interactive training modules and test 
                  your knowledge through our tailored quizzes.
                </p>
                <button className="text-custom-black font-semibold hover:underline">
                  Start training →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;