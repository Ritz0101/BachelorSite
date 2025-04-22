import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTraining } from '../../context/TrainingContext';

// Mock data structure for training modules - can be moved to a separate file later
export const trainingModules = [
  {
    id: 1,
    titleKey: "training.modules.informationClassification.title",
    descriptionKey: "training.modules.informationClassification.description",
    duration: "20",
    route: '/training/information-classification-basics',
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
    titleKey: "training.modules.iso27001.title",
    descriptionKey: "training.modules.iso27001.description",
    duration: "30",
    route: '/training/iso27001-fundamentals',
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
  const { t } = useTranslation();
  
  return (
    <div 
      onClick={() => onSelect(module)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-custom-black mb-2">{t(module.titleKey)}</h3>
      <p className="text-gray-600 mb-4">{t(module.descriptionKey)}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-black">{t('training.duration', { time: module.duration })}</span>
        <span className="text-sm text-black">
          {t('training.progressIndicator', { 
            completed: module.modules.filter(m => m.completed).length, 
            total: module.modules.length 
          })}
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
  const { t } = useTranslation();
  const { completedModules } = useTraining();
  
  const totalModules = trainingModules.reduce(
    (acc, module) => acc + module.modules.length, 
    0
  );
  
  const completedCount = Object.values(completedModules)
    .filter(Boolean).length;

  const handleModuleSelect = (module) => {
    navigate(module.route);
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-4">{t('training.title')}</h1>
            <p className="text-black mb-4">
              {t('training.description')}
            </p>
            <ProgressBar completed={completedCount} total={totalModules} />
            <p className="text-sm text-black mt-2">
              {t('training.overallProgress', { completed: completedCount, total: totalModules })}
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