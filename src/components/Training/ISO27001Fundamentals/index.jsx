import React from 'react';
import { Link } from 'react-router-dom';
import { trainingModules } from '../Training';
import { useTraining } from '../../../context/TrainingContext';
import { useTranslation } from 'react-i18next';

function CompletionIndicator({ isCompleted }) {
  if (!isCompleted) return null;
  
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center">
      <span className="text-green-700 mr-2 font-medium">{t('training.completed')}</span>
      <div className="flex items-center justify-center bg-green-100 text-green-700 rounded-full w-8 h-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function ISO27001Fundamentals() {
  const module = trainingModules.find(m => m.id === 2);
  const { completedModules } = useTraining();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link to="/training" className="text-black hover:underline mb-4 inline-block">
              ← {t('training.modules.iso27001.backToModules')}
            </Link>
            <h1 className="text-3xl font-bold text-black mt-4">{t(module.titleKey)}</h1>
            <p className="text-black mt-2">{t(module.descriptionKey)}</p>
            <div className="text-sm text-black mt-2">{t('training.duration', { time: module.duration })}</div>
          </div>

          <div className="space-y-6 mt-8">
            <Link 
              to="/training/iso27001-fundamentals/isms-basics"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-black">{t('training.modules.iso27001.submodules.ismsBasics.title')}</h3>
                  <p className="text-black mt-2">{t('training.modules.iso27001.submodules.ismsBasics.description')}</p>
                </div>
                <CompletionIndicator isCompleted={completedModules['2.1']} />
              </div>
            </Link>

            <Link 
              to="/training/iso27001-fundamentals/risk-assessment"
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-black">{t('training.modules.iso27001.submodules.riskAssessment.title')}</h3>
                  <p className="text-black mt-2">{t('training.modules.iso27001.submodules.riskAssessment.description')}</p>
                </div>
                <CompletionIndicator isCompleted={completedModules['2.2']} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ISO27001Fundamentals;
