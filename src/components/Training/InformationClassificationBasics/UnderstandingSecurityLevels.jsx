import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';
import { useTranslation } from 'react-i18next';

function UnderstandingSecurityLevels() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();
  const [quizAnswers, setQuizAnswers] = useState({
    scenario1: '',
    scenario2: '',
    scenario3: ''
  });

  const [feedback, setFeedback] = useState({
    show: false,
    messages: [],
    allCorrect: false
  });

  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerChange = (scenario, level) => {
    setQuizAnswers(prev => ({
      ...prev,
      [scenario]: level
    }));
    setFeedback({ show: false, messages: [], allCorrect: false });
  };

  const checkAnswers = () => {
    const messages = {
      scenario1: [],
      scenario2: [],
      scenario3: []
    };
    let allCorrect = true;

    // Correct answers
    const correctAnswers = {
      scenario1: 'internal',
      scenario2: 'confidential',
      scenario3: 'highly-confidential'
    };

    // Check each scenario
    if (quizAnswers.scenario1 !== correctAnswers.scenario1) {
      messages.scenario1.push(t('classification_practice_scenario1_feedback'));
      allCorrect = false;
    }
    if (quizAnswers.scenario2 !== correctAnswers.scenario2) {
      messages.scenario2.push(t('classification_practice_scenario2_feedback'));
      allCorrect = false;
    }
    if (quizAnswers.scenario3 !== correctAnswers.scenario3) {
      messages.scenario3.push(t('classification_practice_scenario3_feedback'));
      allCorrect = false;
    }

    setFeedback({
      show: true,
      messages: allCorrect 
        ? [t('classification_practice_excellent')]
        : messages,
      allCorrect: allCorrect
    });

    if (allCorrect) {
      setQuizCompleted(true);
    }
  };

  const handleCompletion = () => {
    markModuleComplete('1.1');
    // Navigate to the next module (Identifying Sensitive Information)
    navigate('/training/information-classification-basics/identifying-sensitive-information');
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/information-classification-basics" className="text-black hover:underline mb-4 inline-block">
            ← {t('back_to_information_classification_button')}
          </Link>
          <h1 className="text-3xl font-bold text-custom-black mb-4">{t('understanding_security_levels_title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">{t('course_overview_title')}</h2>
              <p className="text-gray-600 mb-4">
                {t('course_overview_description')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">{t('learning_objectives_title')}</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>{t('learning_objectives_item1')}</li>
                <li>{t('learning_objectives_item2')}</li>
                <li>{t('learning_objectives_item3')}</li>
                <li>{t('learning_objectives_item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">{t('classification_levels_title')}</h2>
              
              <div className="space-y-4 mt-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-green-700">{t('classification_levels_public_title')}</h3>
                  <p className="text-gray-600 mt-1">
                    {t('classification_levels_public_description')}
                  </p>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-blue-700">{t('classification_levels_internal_title')}</h3>
                  <p className="text-gray-600 mt-1">
                    {t('classification_levels_internal_description')}
                  </p>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-yellow-700">{t('classification_levels_confidential_title')}</h3>
                  <p className="text-gray-600 mt-1">
                    {t('classification_levels_confidential_description')}
                  </p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-red-700">{t('classification_levels_highly_confidential_title')}</h3>
                  <p className="text-gray-600 mt-1">
                    {t('classification_levels_highly_confidential_description')}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">{t('best_practices_title')}</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>{t('best_practices_item1')}</li>
                <li>{t('best_practices_item2')}</li>
                <li>{t('best_practices_item3')}</li>
                <li>{t('best_practices_item4')}</li>
                <li>{t('best_practices_item5')}</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-black mb-3">{t('classification_practice_title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-black mb-4">
                  {t('classification_practice_description')}
                </p>
                
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">{t('scenario1_title')}</p>
                    <p className="text-black mb-4">
                      {t('classification_practice_scenario1_description')}
                    </p>
                    <div className="space-y-2">
                      {['public', 'internal', 'confidential', 'highly-confidential'].map((level) => (
                        <label key={level} className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="scenario1"
                            value={level}
                            checked={quizAnswers.scenario1 === level}
                            onChange={() => handleAnswerChange('scenario1', level)}
                            className="form-radio text-purple h-5 w-5 rounded-full"
                          />
                          <span className="text-black capitalize">
                            {t(`security_level_${level.replace('-', '')}_title`)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">{t('scenario2_title')}</p>
                    <p className="text-black mb-4">
                      {t('classification_practice_scenario2_description')}
                    </p>
                    <div className="space-y-2">
                      {['public', 'internal', 'confidential', 'highly-confidential'].map((level) => (
                        <label key={level} className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="scenario2"
                            value={level}
                            checked={quizAnswers.scenario2 === level}
                            onChange={() => handleAnswerChange('scenario2', level)}
                            className="form-radio text-purple h-5 w-5 rounded-full"
                          />
                          <span className="text-black capitalize">
                            {t(`security_level_${level.replace('-', '')}_title`)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">{t('scenario3_title')}</p>
                    <p className="text-black mb-4">
                      {t('classification_practice_scenario3_description')}
                    </p>
                    <div className="space-y-2">
                      {['public', 'internal', 'confidential', 'highly-confidential'].map((level) => (
                        <label key={level} className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="scenario3"
                            value={level}
                            checked={quizAnswers.scenario3 === level}
                            onChange={() => handleAnswerChange('scenario3', level)}
                            className="form-radio text-purple h-5 w-5 rounded-full"
                          />
                          <span className="text-black capitalize">
                            {t(`security_level_${level.replace('-', '')}_title`)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="bg-purple text-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-opacity"
                    onClick={checkAnswers}
                  >
                    {t('common_button_check_answers')}
                  </button>

                  {feedback.show && (
                    <div className={`mt-4 p-4 rounded-md ${
                      feedback.allCorrect
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      {feedback.allCorrect ? (
                        <p className="text-green-800 mb-2">
                          • {feedback.messages[0]}
                        </p>
                      ) : (
                        Object.entries(feedback.messages).map(([scenario, messages]) => 
                          messages.length > 0 && (
                            <div key={scenario} className="mb-4">
                              <h4 className="font-semibold text-red-800 mb-2">
                                {t(`${scenario}_title`)}
                              </h4>
                              {messages.map((message, index) => (
                                <p key={index} className="text-red-800 ml-4 mb-1">
                                  • {message}
                                </p>
                              ))}
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                className={`bg-purple px-6 py-3 rounded-md transition-opacity ${
                  quizCompleted 
                    ? 'text-black hover:bg-opacity-90 cursor-pointer' 
                    : 'text-gray-500 bg-opacity-50 cursor-not-allowed'
                }`}
                onClick={handleCompletion}
                disabled={!quizCompleted}
              >
                {t('common_button_mark_as_completed')}
              </button>
              {!quizCompleted && (
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

export default UnderstandingSecurityLevels;
