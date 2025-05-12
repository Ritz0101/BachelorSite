import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTraining } from '../../../context/TrainingContext';

function IdentifyingSensitiveInformation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();

  // Changed from strings to arrays for multiple selections
  const [scenario1Answers, setScenario1Answers] = useState([]);
  const [scenario2Answers, setScenario2Answers] = useState([]);
  const [scenario3Answers, setScenario3Answers] = useState([]);
  const [scenario4Answers, setScenario4Answers] = useState([]);
  const [scenario5Answers, setScenario5Answers] = useState([]);

  const [feedback, setFeedback] = useState({
    isSubmitted: false,
    correctAnswers: 0,
    incorrectAnswers: [],
    totalQuestions: 5
  });

  // Updated handlers to toggle values in arrays
  const handleScenario1Change = (value) => {
    setScenario1Answers(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  };

  const handleScenario2Change = (value) => {
    setScenario2Answers(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  };

  const handleScenario3Change = (value) => {
    setScenario3Answers(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  };

  const handleScenario4Change = (value) => {
    setScenario4Answers(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  };

  const handleScenario5Change = (value) => {
    setScenario5Answers(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  };

  // Check answers
  const checkAnswers = () => {
    // Updated to arrays of correct answers
    const correctAnswers = {
      scenario1: ['revenue', 'acquisition', 'marketing'], // All sensitive items in scenario 1
      scenario2: ['salary', 'performance'], // Most sensitive in scenario 2
      scenario3: ['images', 'functionality'], // Most sensitive in scenario 3
      scenario4: ['terms', 'timeline', 'financial'], // Most sensitive in scenario 4
      scenario5: ['ipAddresses', 'firewall', 'serverLocations'] // Most sensitive in scenario 5
    };

    let correct = 0;
    const incorrect = [];

    // Helper function to check if arrays have the same elements
    const arraysMatch = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      const sortedArr1 = [...arr1].sort();
      const sortedArr2 = [...arr2].sort();
      return sortedArr1.every((item, index) => item === sortedArr2[index]);
    };

    // Check scenario 1
    if (arraysMatch(scenario1Answers, correctAnswers.scenario1)) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario1',
        selected: scenario1Answers,
        expected: correctAnswers.scenario1
      });
    }

    // Check scenario 2
    if (arraysMatch(scenario2Answers, correctAnswers.scenario2)) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario2',
        selected: scenario2Answers,
        expected: correctAnswers.scenario2
      });
    }

    // Check scenario 3
    if (arraysMatch(scenario3Answers, correctAnswers.scenario3)) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario3',
        selected: scenario3Answers,
        expected: correctAnswers.scenario3
      });
    }

    // Check scenario 4
    if (arraysMatch(scenario4Answers, correctAnswers.scenario4)) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario4',
        selected: scenario4Answers,
        expected: correctAnswers.scenario4
      });
    }

    // Check scenario 5
    if (arraysMatch(scenario5Answers, correctAnswers.scenario5)) {
      correct++;
    } else {
      incorrect.push({
        scenario: 'scenario5',
        selected: scenario5Answers,
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

  const handleCompletion = () => {
    markModuleComplete('1.2');
    navigate('/training/information-classification-basics/handling-classified-information');
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/information-classification-basics" className="text-black hover:underline mb-4 inline-block">
            ← {t('back_to_information_classification_button')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('identifying_sensitive_information_title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('common_types_title')}</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('public_info_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('public_info_item1')}</li>
                    <li>{t('public_info_item2')}</li>
                    <li>{t('public_info_item3')}</li>
                    <li>{t('public_info_item4')}</li>
                    <li>{t('public_info_item5')}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('internal_info_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('internal_info_item1')}</li>
                    <li>{t('internal_info_item2')}</li>
                    <li>{t('internal_info_item3')}</li>
                    <li>{t('internal_info_item4')}</li>
                    <li>{t('internal_info_item5')}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('confidential_info_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('confidential_info_item1')}</li>
                    <li>{t('confidential_info_item2')}</li>
                    <li>{t('confidential_info_item3')}</li>
                    <li>{t('confidential_info_item4')}</li>
                    <li>{t('confidential_info_item5')}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('security_level_highlyconfidential_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('highly_confidential_info_item1')}</li>
                    <li>{t('highly_confidential_info_item2')}</li>
                    <li>{t('highly_confidential_info_item3')}</li>
                    <li>{t('highly_confidential_info_item4')}</li>
                    <li>{t('highly_confidential_info_item5')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('key_indicators_title')}</h2>
              <p className="text-black mb-4">
                {t('key_indicators_description')}
              </p>
              <ul className="list-disc list-inside text-black space-y-2 ml-4">
                <li>{t('key_indicators_item1')}</li>
                <li>{t('key_indicators_item2')}</li>
                <li>{t('key_indicators_item3')}</li>
                <li>{t('key_indicators_item4')}</li>
                <li>{t('key_indicators_item5')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('practice_exercise_title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-black mb-4">
                  {t('practice_exercise_description')}
                </p>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">{t('scenario1_title')}</p>
                    <p className="text-black mb-4">
                      {t('practice_exercise_scenario1_description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                            name="scenario1"
                            value="revenue"
                            checked={scenario1Answers.includes('revenue')}
                            onChange={() => handleScenario1Change('revenue')}
                          />
                          {scenario1Answers.includes('revenue') && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="text-black">{t('practice_exercise_scenario1_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                            name="scenario1"
                            value="acquisition"
                            checked={scenario1Answers.includes('acquisition')}
                            onChange={() => handleScenario1Change('acquisition')}
                          />
                          {scenario1Answers.includes('acquisition') && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="text-black">{t('practice_exercise_scenario1_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                            name="scenario1"
                            value="marketing"
                            checked={scenario1Answers.includes('marketing')}
                            onChange={() => handleScenario1Change('marketing')}
                          />
                          {scenario1Answers.includes('marketing') && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="text-black">{t('practice_exercise_scenario1_option3')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">{t('scenario2_title')}</p>
                    <p className="text-black mb-4">
                      {t('practice_exercise_scenario2_description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                            name="scenario2"
                            value="emergency"
                            checked={scenario2Answers.includes('emergency')}
                            onChange={() => handleScenario2Change('emergency')}
                          />
                          {scenario2Answers.includes('emergency') && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="text-black">{t('practice_exercise_scenario2_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                            name="scenario2"
                            value="salary"
                            checked={scenario2Answers.includes('salary')}
                            onChange={() => handleScenario2Change('salary')}
                          />
                          {scenario2Answers.includes('salary') && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="text-black">{t('practice_exercise_scenario2_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                            name="scenario2"
                            value="performance"
                            checked={scenario2Answers.includes('performance')}
                            onChange={() => handleScenario2Change('performance')}
                          />
                          {scenario2Answers.includes('performance') && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="text-black">{t('practice_exercise_scenario2_option3')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">{t('scenario3_title')}</p>
                    <p className="text-black mb-4">
                      {t('practice_exercise_scenario3_description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario3"
                          value="images"
                          checked={scenario3Answers.includes('images')}
                          onChange={() => handleScenario3Change('images')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario3_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario3"
                          value="functionality"
                          checked={scenario3Answers.includes('functionality')}
                          onChange={() => handleScenario3Change('functionality')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario3_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario3"
                          value="releaseDate"
                          checked={scenario3Answers.includes('releaseDate')}
                          onChange={() => handleScenario3Change('releaseDate')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario3_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario3"
                          value="targetMarket"
                          checked={scenario3Answers.includes('targetMarket')}
                          onChange={() => handleScenario3Change('targetMarket')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario3_option4')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario3"
                          value="features"
                          checked={scenario3Answers.includes('features')}
                          onChange={() => handleScenario3Change('features')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario3_option5')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">{t('scenario4_title')}</p>
                    <p className="text-black mb-4">
                      {t('practice_exercise_scenario4_description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario4"
                          value="terms"
                          checked={scenario4Answers.includes('terms')}
                          onChange={() => handleScenario4Change('terms')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario4_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario4"
                          value="timeline"
                          checked={scenario4Answers.includes('timeline')}
                          onChange={() => handleScenario4Change('timeline')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario4_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario4"
                          value="financial"
                          checked={scenario4Answers.includes('financial')}
                          onChange={() => handleScenario4Change('financial')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario4_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario4"
                          value="companyName"
                          checked={scenario4Answers.includes('companyName')}
                          onChange={() => handleScenario4Change('companyName')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario4_option4')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario4"
                          value="annualReport"
                          checked={scenario4Answers.includes('annualReport')}
                          onChange={() => handleScenario4Change('annualReport')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario4_option5')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">{t('scenario5_title')}</p>
                    <p className="text-black mb-4">
                      {t('practice_exercise_scenario5_description')}
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario5"
                          value="ipAddresses"
                          checked={scenario5Answers.includes('ipAddresses')}
                          onChange={() => handleScenario5Change('ipAddresses')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario5_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario5"
                          value="firewall"
                          checked={scenario5Answers.includes('firewall')}
                          onChange={() => handleScenario5Change('firewall')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario5_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario5"
                          value="serverLocations"
                          checked={scenario5Answers.includes('serverLocations')}
                          onChange={() => handleScenario5Change('serverLocations')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario5_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario5"
                          value="publicUrl"
                          checked={scenario5Answers.includes('publicUrl')}
                          onChange={() => handleScenario5Change('publicUrl')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario5_option4')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-purple checked:border-purple focus:outline-none focus:ring-2 focus:ring-purple" 
                          name="scenario5"
                          value="softwareNames"
                          checked={scenario5Answers.includes('softwareNames')}
                          onChange={() => handleScenario5Change('softwareNames')}
                        />
                        <span className="text-black">{t('practice_exercise_scenario5_option5')}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {feedback.isSubmitted && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {feedback.incorrectAnswers.length === 0 ? (
                      <div>
                        <p className="text-green-800 mb-2">
                          {t('practice_exercise_feedback_correct')}
                        </p>
                      </div>
                    ) : (
                      <div>
                        {feedback.incorrectAnswers.map((error, index) => (
                          <div key={index} className="mb-4">
                            <h4 className="font-semibold text-red-800 mb-2">
                              {t(`practice_exercise_feedback_${error.scenario}_title`)}
                            </h4>
                            <p className="text-red-800 ml-4 mb-1">
                              • {t(`practice_exercise_feedback_${error.scenario}`)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            <button 
              onClick={checkAnswers}
              className="bg-purple text-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-opacity mt-6"
            >
              {t('common_button_check_answers')}
            </button>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                className={`bg-purple px-6 py-3 rounded-md transition-opacity ${
                  feedback.incorrectAnswers && feedback.incorrectAnswers.length === 0 && feedback.isSubmitted
                    ? 'text-black hover:bg-opacity-90 cursor-pointer' 
                    : 'text-gray-500 bg-opacity-50 cursor-not-allowed'
                }`}
                onClick={handleCompletion}
                disabled={!(feedback.incorrectAnswers && feedback.incorrectAnswers.length === 0 && feedback.isSubmitted)}
              >
                {t('common_button_mark_as_completed')}
              </button>
              {!(feedback.incorrectAnswers && feedback.incorrectAnswers.length === 0 && feedback.isSubmitted) && (
                <p className="text-sm text-red-600 mt-2">
                  {t('common_message_completion_required')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentifyingSensitiveInformation;
