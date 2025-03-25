import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trainingModules } from '../Training';

function ISO27001Fundamentals() {
  const navigate = useNavigate();
  const module = trainingModules.find(m => m.id === 2);

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link to="/training" className="text-purple hover:underline mb-4 inline-block">
              ← Back to Training Modules
            </Link>
            <h1 className="text-3xl font-bold text-custom-black mt-4">{module.title}</h1>
            <p className="text-gray-600 mt-2">{module.description}</p>
            <div className="text-sm text-gray-500 mt-2">Duration: {module.duration}</div>
          </div>

          <div className="space-y-6">
            {module.modules.map((subModule) => (
              <div 
                key={subModule.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple transition-colors"
              >
                <h2 className="text-xl font-semibold text-custom-black mb-2">
                  {subModule.title}
                </h2>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${subModule.completed ? 'text-green-600' : 'text-gray-500'}`}>
                    {subModule.completed ? 'Completed' : 'Not started'}
                  </span>
                  <button 
                    className="bg-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-opacity"
                    onClick={() => {
                      // Navigate to the specific course
                      if (subModule.id === "2.1") {
                        navigate("/training/iso27001-fundamentals/isms-basics");
                      } else if (subModule.id === "2.2") {
                        navigate("/training/iso27001-fundamentals/risk-assessment");
                      }
                    }}
                  >
                    {subModule.completed ? 'Review' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ISO27001Fundamentals;
