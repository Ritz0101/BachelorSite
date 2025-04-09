import React from 'react';
import { Link } from 'react-router-dom';
import { trainingModules } from '../Training';

function InformationClassificationBasics() {
  const module = trainingModules.find(m => m.id === 1);

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
              to="/training/information-classification-basics/understanding-security-levels"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-black">Understanding Security Levels</h3>
              <p className="text-black mt-2">Learn about different security classification levels.</p>
            </Link>

            <Link 
              to="/training/information-classification-basics/identifying-sensitive-information"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-black">Identifying Sensitive Information</h3>
              <p className="text-black mt-2">Learn how to identify and classify sensitive information.</p>
            </Link>

            <Link 
              to="/training/information-classification-basics/handling-classified-information"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-black">Handling Classified Information</h3>
              <p className="text-black mt-2">Learn proper procedures for handling classified information.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationClassificationBasics;
