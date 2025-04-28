import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function IdentifyingSensitiveInformation() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State for scenario answers - changed to strings for single selection
  const [scenario1Answer, setScenario1Answer] = useState('');
  const [scenario2Answer, setScenario2Answer] = useState('');
  const [scenario3Answer, setScenario3Answer] = useState('');
  const [scenario4Answer, setScenario4Answer] = useState('');
  const [scenario5Answer, setScenario5Answer] = useState('');

  const [feedback, setFeedback] = useState({
    isSubmitted: false,
    correctAnswers: 0,
    incorrectAnswers: [],
    totalQuestions: 5 // Changed to 5 since we have 5 scenarios with 1 answer each
  });

  // Handle changes for scenario 1
  const handleScenario1Change = (value) => {
    setScenario1Answer(value);
  };

  // Handle changes for scenario 2
  const handleScenario2Change = (value) => {
    setScenario2Answer(value);
  };

  // Handle changes for scenario 3
  const handleScenario3Change = (value) => {
    setScenario3Answer(value);
  };

  // Handle changes for scenario 4
  const handleScenario4Change = (value) => {
    setScenario4Answer(value);
  };

  // Handle changes for scenario 5
  const handleScenario5Change = (value) => {
    setScenario5Answer(value);
  };

  // Check answers
  const checkAnswers = () => {
    const correctAnswers = {
      scenario1: 'acquisition', // Most sensitive option
      scenario2: 'salary',      // Most sensitive option
      scenario3: 'functionality', // Most sensitive option
      scenario4: 'financial',    // Most sensitive option
      scenario5: 'firewall'      // Most sensitive option
    };

    let correct = 0;
    const incorrect = [];

    // Check scenario 1
    if (scenario1Answer === correctAnswers.scenario1) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario1',
        key: scenario1Answer || 'none',
        expected: correctAnswers.scenario1
      });
    }

    // Check scenario 2
    if (scenario2Answer === correctAnswers.scenario2) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario2',
        key: scenario2Answer || 'none',
        expected: correctAnswers.scenario2
      });
    }

    // Check scenario 3
    if (scenario3Answer === correctAnswers.scenario3) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario3',
        key: scenario3Answer || 'none',
        expected: correctAnswers.scenario3
      });
    }

    // Check scenario 4
    if (scenario4Answer === correctAnswers.scenario4) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario4',
        key: scenario4Answer || 'none',
        expected: correctAnswers.scenario4
      });
    }

    // Check scenario 5
    if (scenario5Answer === correctAnswers.scenario5) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario5',
        key: scenario5Answer || 'none',
        expected: correctAnswers.scenario5
      });
    }

    setFeedback({
      isSubmitted: true,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      totalQuestions: 5
    });

    // Automatically scroll to feedback
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const markModuleComplete = (moduleId) => {
    // Get completed modules from localStorage
    const completedModules = localStorage.getItem('completedModules') 
      ? JSON.parse(localStorage.getItem('completedModules')) 
      : [];
    
    // Add this module if it's not already marked complete
    if (!completedModules.includes(moduleId)) {
      completedModules.push(moduleId);
      localStorage.setItem('completedModules', JSON.stringify(completedModules));
    }
  };

  const handleCompletion = () => {
    markModuleComplete('1.2');
    navigate('/training/information-classification-basics/handling-classified-information');
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/information-classification-basics" className="text-black hover:underline mb-4 inline-block">
            ← {t('training.informationClassification.backToModule')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('training.informationClassification.identifyingSensitive.title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.informationClassification.identifyingSensitive.commonTypes')}</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('training.informationClassification.identifyingSensitive.publicInfo.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('training.informationClassification.identifyingSensitive.publicInfo.item1')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.publicInfo.item2')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.publicInfo.item3')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.publicInfo.item4')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.publicInfo.item5')}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('training.informationClassification.identifyingSensitive.internalInfo.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('training.informationClassification.identifyingSensitive.internalInfo.item1')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.internalInfo.item2')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.internalInfo.item3')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.internalInfo.item4')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.internalInfo.item5')}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('training.informationClassification.identifyingSensitive.confidentialInfo.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('training.informationClassification.identifyingSensitive.confidentialInfo.item1')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.confidentialInfo.item2')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.confidentialInfo.item3')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.confidentialInfo.item4')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.confidentialInfo.item5')}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('training.informationClassification.identifyingSensitive.highlyConfidential.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('training.informationClassification.identifyingSensitive.highlyConfidential.item1')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.highlyConfidential.item2')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.highlyConfidential.item3')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.highlyConfidential.item4')}</li>
                    <li>{t('training.informationClassification.identifyingSensitive.highlyConfidential.item5')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.informationClassification.identifyingSensitive.keyIndicators.title')}</h2>
              <p className="text-black mb-4">
                {t('training.informationClassification.identifyingSensitive.keyIndicators.description')}
              </p>
              <ul className="list-disc list-inside text-black space-y-2 ml-4">
                <li>{t('training.informationClassification.identifyingSensitive.keyIndicators.item1')}</li>
                <li>{t('training.informationClassification.identifyingSensitive.keyIndicators.item2')}</li>
                <li>{t('training.informationClassification.identifyingSensitive.keyIndicators.item3')}</li>
                <li>{t('training.informationClassification.identifyingSensitive.keyIndicators.item4')}</li>
                <li>{t('training.informationClassification.identifyingSensitive.keyIndicators.item5')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.informationClassification.identifyingSensitive.practiceExercise.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-black mb-4">
                  {t('training.informationClassification.identifyingSensitive.practiceExercise.description')}
                </p>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario1.title')}</p>
                    <p className="text-black mb-4">
                      {t('training.informationClassification.identifyingSensitive.practiceExercise.scenario1.description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario1"
                          value="revenue"
                          checked={scenario1Answer === 'revenue'}
                          onChange={() => handleScenario1Change('revenue')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario1.option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario1"
                          value="acquisition"
                          checked={scenario1Answer === 'acquisition'}
                          onChange={() => handleScenario1Change('acquisition')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario1.option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario1"
                          value="marketing"
                          checked={scenario1Answer === 'marketing'}
                          onChange={() => handleScenario1Change('marketing')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario1.option3')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario2.title')}</p>
                    <p className="text-black mb-4">
                      {t('training.informationClassification.identifyingSensitive.practiceExercise.scenario2.description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario2"
                          value="emergency"
                          checked={scenario2Answer === 'emergency'}
                          onChange={() => handleScenario2Change('emergency')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario2.option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario2"
                          value="salary"
                          checked={scenario2Answer === 'salary'}
                          onChange={() => handleScenario2Change('salary')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario2.option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario2"
                          value="performance"
                          checked={scenario2Answer === 'performance'}
                          onChange={() => handleScenario2Change('performance')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario2.option3')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario3.title')}</p>
                    <p className="text-black mb-4">
                      {t('training.informationClassification.identifyingSensitive.practiceExercise.scenario3.description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario3"
                          value="images"
                          checked={scenario3Answer === 'images'}
                          onChange={() => handleScenario3Change('images')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario3.option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario3"
                          value="functionality"
                          checked={scenario3Answer === 'functionality'}
                          onChange={() => handleScenario3Change('functionality')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario3.option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario3"
                          value="releaseDate"
                          checked={scenario3Answer === 'releaseDate'}
                          onChange={() => handleScenario3Change('releaseDate')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario3.option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario3"
                          value="targetMarket"
                          checked={scenario3Answer === 'targetMarket'}
                          onChange={() => handleScenario3Change('targetMarket')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario3.option4')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario3"
                          value="features"
                          checked={scenario3Answer === 'features'}
                          onChange={() => handleScenario3Change('features')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario3.option5')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario4.title')}</p>
                    <p className="text-black mb-4">
                      {t('training.informationClassification.identifyingSensitive.practiceExercise.scenario4.description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario4"
                          value="terms"
                          checked={scenario4Answer === 'terms'}
                          onChange={() => handleScenario4Change('terms')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario4.option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario4"
                          value="timeline"
                          checked={scenario4Answer === 'timeline'}
                          onChange={() => handleScenario4Change('timeline')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario4.option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario4"
                          value="financial"
                          checked={scenario4Answer === 'financial'}
                          onChange={() => handleScenario4Change('financial')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario4.option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario4"
                          value="companyName"
                          checked={scenario4Answer === 'companyName'}
                          onChange={() => handleScenario4Change('companyName')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario4.option4')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario4"
                          value="annualReport"
                          checked={scenario4Answer === 'annualReport'}
                          onChange={() => handleScenario4Change('annualReport')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario4.option5')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario5.title')}</p>
                    <p className="text-black mb-4">
                      {t('training.informationClassification.identifyingSensitive.practiceExercise.scenario5.description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario5"
                          value="ipAddresses"
                          checked={scenario5Answer === 'ipAddresses'}
                          onChange={() => handleScenario5Change('ipAddresses')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario5.option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario5"
                          value="firewall"
                          checked={scenario5Answer === 'firewall'}
                          onChange={() => handleScenario5Change('firewall')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario5.option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario5"
                          value="serverLocations"
                          checked={scenario5Answer === 'serverLocations'}
                          onChange={() => handleScenario5Change('serverLocations')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario5.option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario5"
                          value="publicUrl"
                          checked={scenario5Answer === 'publicUrl'}
                          onChange={() => handleScenario5Change('publicUrl')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario5.option4')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          className="form-radio text-purple h-5 w-5 rounded-full" 
                          name="scenario5"
                          value="softwareNames"
                          checked={scenario5Answer === 'softwareNames'}
                          onChange={() => handleScenario5Change('softwareNames')}
                        />
                        <span className="text-black">{t('training.informationClassification.identifyingSensitive.practiceExercise.scenario5.option5')}</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={checkAnswers}
                    className="mt-6 bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                    {t('common.checkAnswers')}
                  </button>
                </div>

                {feedback.isSubmitted && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {feedback.incorrectAnswers.length === 0 ? (
                      <div>
                        <p className="text-green-800 mb-2">
                          {t('training.informationClassification.identifyingSensitive.practiceExercise.feedback.correct')}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-red-800 mb-2">
                          {t('training.informationClassification.identifyingSensitive.practiceExercise.feedback.incorrect')}
                        </h4>
                        {feedback.incorrectAnswers.map((error, index) => (
                          <div key={index} className="text-red-800 ml-4 mb-3">
                            <p className="font-medium">
                              {t(`training.informationClassification.identifyingSensitive.practiceExercise.${error.scenario}.title`)}
                            </p>
                            <p className="ml-4">
                              {t('training.informationClassification.identifyingSensitive.practiceExercise.feedback.shouldSelect')} {t(`training.informationClassification.identifyingSensitive.practiceExercise.${error.scenario}.option${error.expected === 'none' ? '1' : error.expected}`)}
                            </p>
                          </div>
                        ))}
                        <p className="text-sm text-red-600 mt-2">
                          {feedback.correctAnswers} / {feedback.totalQuestions} {t('common.correct')}
                        </p>
                        <p className="text-sm text-red-600 mt-2">
                          Complete the quiz successfully to mark this module as completed
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Add Mark as Completed button at the bottom */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={handleCompletion}
              disabled={!feedback.isSubmitted || feedback.incorrectAnswers.length > 0}
              className={`bg-purple px-6 py-3 rounded-md transition-opacity ${
                feedback.isSubmitted && feedback.incorrectAnswers.length === 0 
                  ? 'text-black hover:bg-opacity-90 cursor-pointer' 
                  : 'text-gray-500 bg-opacity-50 cursor-not-allowed'
              }`}
            >
              {t('training.markAsCompleted')}
            </button>
            {(!feedback.isSubmitted || feedback.incorrectAnswers.length > 0) && (
              <p className="text-sm text-red-600 mt-2">
                {t('training.informationClassification.identifyingSensitive.practiceExercise.feedback.completionRequired', 'Complete the quiz successfully to mark this module as completed')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentifyingSensitiveInformation;
