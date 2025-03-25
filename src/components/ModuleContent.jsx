import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainingModules } from './Training';

function ModuleContent() {
  const { moduleId } = useParams();
  const module = trainingModules.find(m => m.id.toString() === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-light-purple pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Module Not Found</h1>
            <p className="text-gray-600 mb-4">The requested training module could not be found.</p>
            <Link to="/training" className="text-purple hover:underline">
              ← Back to Training Modules
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                      // TODO: Implement module completion logic
                      alert('Module content will be implemented here!');
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

export default ModuleContent; 