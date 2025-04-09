import React from 'react';
import { Link } from 'react-router-dom';
import { trainingModules } from '../Training';

function ISO27001Fundamentals() {
  const module = trainingModules.find(m => m.id === 2);

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link to="/training" className="text-black hover:underline mb-4 inline-block">
              ← Back to Training Modules
            </Link>
            <h1 className="text-3xl font-bold text-black mt-4">{module.title}</h1>
            <p className="text-black mt-2">{module.description}</p>
            <div className="text-sm text-black mt-2">Duration: {module.duration}</div>
          </div>

          <div className="space-y-6 mt-8">
            <Link 
              to="/training/iso27001-fundamentals/isms-basics"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-black">ISMS Basics</h3>
              <p className="text-black mt-2">Learn about Information Security Management Systems.</p>
            </Link>

            <Link 
              to="/training/iso27001-fundamentals/risk-assessment"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-black">Risk Assessment</h3>
              <p className="text-black mt-2">Learn about risk assessment in ISO 27001.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ISO27001Fundamentals;
