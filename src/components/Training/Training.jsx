import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTraining } from '../../context/TrainingContext';

// Mock data structure for training modules - can be moved to a separate file later
export const trainingModules = [
  {
    id: 1,
    title: "Information Classification Basics",
    description: "Learn the fundamentals of classifying sensitive information",
    duration: "20 min",
    modules: [
      {
        id: "1.1",
        title: "Understanding Security Levels",
        completed: false,
      },
      {
        id: "1.2",
        title: "Identifying Sensitive Information",
        completed: false,
      },
      {
        id: "1.3",
        title: "Handling Classified Information",
        completed: false,
      }
    ]
  },
  {
    id: 2,
    title: "ISO 27001 Fundamentals",
    description: "Introduction to ISO 27001 principles and practices",
    duration: "30 min",
    modules: [
      {
        id: "2.1",
        title: "ISMS Basics",
        completed: false,
      },
      {
        id: "2.2",
        title: "Risk Assessment",
        completed: false,
      }
    ]
  }
];

// Reusable module card component
function ModuleCard({ module, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(module)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-custom-black mb-2">{module.title}</h3>
      <p className="text-gray-600 mb-4">{module.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-black">Duration: {module.duration}</span>
        <span className="text-sm text-black">
          {module.modules.filter(m => m.completed).length} / {module.modules.length} completed
        </span>
      </div>
    </div>
  );
}

// Progress indicator component
function ProgressBar({ completed, total }) {
  const percentage = (completed / total) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-purple h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

function Training() {
  const navigate = useNavigate();
  const { completedModules } = useTraining();
  
  const totalModules = trainingModules.reduce(
    (acc, module) => acc + module.modules.length, 
    0
  );
  
  const completedCount = Object.values(completedModules)
    .filter(Boolean).length;

  const handleModuleSelect = (module) => {
    if (module.id === 1) {
      navigate('/training/information-classification-basics');
    } else if (module.id === 2) {
      navigate('/training/iso27001-fundamentals');
    }
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-4">Training Modules</h1>
            <p className="text-black mb-4">
              Enhance your understanding of information security through our interactive training modules.
            </p>
            <ProgressBar completed={completedCount} total={totalModules} />
            <p className="text-sm text-black mt-2">
              Overall progress: {completedCount} of {totalModules} modules completed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingModules.map(module => (
              <ModuleCard 
                key={module.id} 
                module={{
                  ...module,
                  modules: module.modules.map(m => ({
                    ...m,
                    completed: completedModules[m.id]
                  }))
                }}
                onSelect={handleModuleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training; 