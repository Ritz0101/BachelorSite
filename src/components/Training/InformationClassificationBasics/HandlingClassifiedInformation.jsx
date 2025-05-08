import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';
import { useTranslation } from 'react-i18next';

function HandlingClassifiedInformation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const [answers, setAnswers] = useState({
    publicDocuments: '',
    confidentialDocuments: '',
    internalDocuments: '',
    highlyConfidentialFiles: '',
    incidentReporting: ''
  });
  
  const [feedback, setFeedback] = useState({
    show: false,
    messages: [],
    allCorrect: false
  });

  const handleAnswerChange = (question, answer) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
    setFeedback({ show: false, messages: [], allCorrect: false });
  };

  const checkAnswers = () => {
    const messages = {
      publicDocuments: [],
      confidentialDocuments: [],
      internalDocuments: [],
      highlyConfidentialFiles: [],
      incidentReporting: []
    };
    let allCorrect = true;
    
    // Define correct answers
    const correctAnswers = {
      publicDocuments: 'c',
      confidentialDocuments: 'b',
      internalDocuments: 'a',
      highlyConfidentialFiles: 'd',
      incidentReporting: 'b'
    };
    
    // Check each answer
    if (answers.publicDocuments !== correctAnswers.publicDocuments) {
      messages.publicDocuments.push(t('handling_classified_information_quiz_feedback_q1'));
      allCorrect = false;
    }
    
    if (answers.confidentialDocuments !== correctAnswers.confidentialDocuments) {
      messages.confidentialDocuments.push(t('handling_classified_information_quiz_feedback_q2'));
      allCorrect = false;
    }
    
    if (answers.internalDocuments !== correctAnswers.internalDocuments) {
      messages.internalDocuments.push(t('handling_classified_information_quiz_feedback_q3'));
      allCorrect = false;
    }
    
    if (answers.highlyConfidentialFiles !== correctAnswers.highlyConfidentialFiles) {
      messages.highlyConfidentialFiles.push(t('handling_classified_information_quiz_feedback_q4'));
      allCorrect = false;
    }
    
    if (answers.incidentReporting !== correctAnswers.incidentReporting) {
      messages.incidentReporting.push(t('handling_classified_information_quiz_feedback_q5'));
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? [t('handling_classified_information_quiz_feedback_excellent')]
        : messages,
      allCorrect: allCorrect
    });
    
    if (allCorrect) {
      setQuizCompleted(true);
    }
  };

  const handleCompletion = () => {
    markModuleComplete('1.3');
    // Navigate back to the Information Classification Basics page
    navigate('/training/information-classification-basics');
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/information-classification-basics" className="text-black hover:underline mb-4 inline-block">
            ← {t('back_to_information_classification_button')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('handling_classified_information_title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('handling_classified_information_subtitle')}</h2>
              
              <div className="space-y-4 mt-6">
                <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('handling_classified_information_public_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>{t('handling_classified_information_public_item1')}</li>
                    <li>{t('handling_classified_information_public_item2')}</li>
                    <li>{t('handling_classified_information_public_item3')}</li>
                    <li>{t('handling_classified_information_public_item4')}</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('handling_classified_information_internal_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>{t('handling_classified_information_internal_item1')}</li>
                    <li>{t('handling_classified_information_internal_item2')}</li>
                    <li>{t('handling_classified_information_internal_item3')}</li>
                    <li>{t('handling_classified_information_internal_item4')}</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('handling_classified_information_confidential_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>{t('handling_classified_information_confidential_item1')}</li>
                    <li>{t('handling_classified_information_confidential_item2')}</li>
                    <li>{t('handling_classified_information_confidential_item3')}</li>
                    <li>{t('handling_classified_information_confidential_item4')}</li>
                    <li>{t('handling_classified_information_confidential_item5')}</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">{t('handling_classified_information_highly_confidential_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>{t('handling_classified_information_highly_confidential_item1')}</li>
                    <li>{t('handling_classified_information_highly_confidential_item2')}</li>
                    <li>{t('handling_classified_information_highly_confidential_item3')}</li>
                    <li>{t('handling_classified_information_highly_confidential_item4')}</li>
                    <li>{t('handling_classified_information_highly_confidential_item5')}</li>
                    <li>{t('handling_classified_information_highly_confidential_item6')}</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('handling_classified_information_best_practices_title')}</h2>
              
              <div className="mt-4 space-y-4">
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">{t('handling_classified_information_best_practices_physical_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('handling_classified_information_best_practices_physical_item1')}</li>
                    <li>{t('handling_classified_information_best_practices_physical_item2')}</li>
                    <li>{t('handling_classified_information_best_practices_physical_item3')}</li>
                    <li>{t('handling_classified_information_best_practices_physical_item4')}</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">{t('handling_classified_information_best_practices_digital_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('handling_classified_information_best_practices_digital_item1')}</li>
                    <li>{t('handling_classified_information_best_practices_digital_item2')}</li>
                    <li>{t('handling_classified_information_best_practices_digital_item3')}</li>
                    <li>{t('handling_classified_information_best_practices_digital_item4')}</li>
                    <li>{t('handling_classified_information_best_practices_digital_item5')}</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">{t('handling_classified_information_best_practices_incident_title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('handling_classified_information_best_practices_incident_item1')}</li>
                    <li>{t('handling_classified_information_best_practices_incident_item2')}</li>
                    <li>{t('handling_classified_information_best_practices_incident_item3')}</li>
                    <li>{t('handling_classified_information_best_practices_incident_item4')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('knowledge_check_title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('handling_classified_information_quiz_q1_title')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="publicDocuments"
                          value="a"
                          checked={answers.publicDocuments === 'a'}
                          onChange={() => handleAnswerChange('publicDocuments', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q1_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="publicDocuments"
                          value="b"
                          checked={answers.publicDocuments === 'b'}
                          onChange={() => handleAnswerChange('publicDocuments', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q1_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="publicDocuments"
                          value="c"
                          checked={answers.publicDocuments === 'c'}
                          onChange={() => handleAnswerChange('publicDocuments', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q1_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="publicDocuments"
                          value="d"
                          checked={answers.publicDocuments === 'd'}
                          onChange={() => handleAnswerChange('publicDocuments', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q1_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('handling_classified_information_quiz_q2_title')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="confidentialDocuments"
                          value="a"
                          checked={answers.confidentialDocuments === 'a'}
                          onChange={() => handleAnswerChange('confidentialDocuments', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q2_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="confidentialDocuments"
                          value="b"
                          checked={answers.confidentialDocuments === 'b'}
                          onChange={() => handleAnswerChange('confidentialDocuments', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q2_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="confidentialDocuments"
                          value="c"
                          checked={answers.confidentialDocuments === 'c'}
                          onChange={() => handleAnswerChange('confidentialDocuments', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q2_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="confidentialDocuments"
                          value="d"
                          checked={answers.confidentialDocuments === 'd'}
                          onChange={() => handleAnswerChange('confidentialDocuments', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q2_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('handling_classified_information_quiz_q3_title')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="internalDocuments"
                          value="a"
                          checked={answers.internalDocuments === 'a'}
                          onChange={() => handleAnswerChange('internalDocuments', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q3_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="internalDocuments"
                          value="b"
                          checked={answers.internalDocuments === 'b'}
                          onChange={() => handleAnswerChange('internalDocuments', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q3_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="internalDocuments"
                          value="c"
                          checked={answers.internalDocuments === 'c'}
                          onChange={() => handleAnswerChange('internalDocuments', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q3_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="internalDocuments"
                          value="d"
                          checked={answers.internalDocuments === 'd'}
                          onChange={() => handleAnswerChange('internalDocuments', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q3_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('handling_classified_information_quiz_q4_title')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="highlyConfidentialFiles"
                          value="a"
                          checked={answers.highlyConfidentialFiles === 'a'}
                          onChange={() => handleAnswerChange('highlyConfidentialFiles', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q4_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="highlyConfidentialFiles"
                          value="b"
                          checked={answers.highlyConfidentialFiles === 'b'}
                          onChange={() => handleAnswerChange('highlyConfidentialFiles', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q4_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="highlyConfidentialFiles"
                          value="c"
                          checked={answers.highlyConfidentialFiles === 'c'}
                          onChange={() => handleAnswerChange('highlyConfidentialFiles', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q4_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="highlyConfidentialFiles"
                          value="d"
                          checked={answers.highlyConfidentialFiles === 'd'}
                          onChange={() => handleAnswerChange('highlyConfidentialFiles', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q4_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('handling_classified_information_quiz_q5_title')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="incidentReporting"
                          value="a"
                          checked={answers.incidentReporting === 'a'}
                          onChange={() => handleAnswerChange('incidentReporting', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q5_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="incidentReporting"
                          value="b"
                          checked={answers.incidentReporting === 'b'}
                          onChange={() => handleAnswerChange('incidentReporting', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q5_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="incidentReporting"
                          value="c"
                          checked={answers.incidentReporting === 'c'}
                          onChange={() => handleAnswerChange('incidentReporting', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q5_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="incidentReporting"
                          value="d"
                          checked={answers.incidentReporting === 'd'}
                          onChange={() => handleAnswerChange('incidentReporting', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('handling_classified_information_quiz_q5_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    className="bg-purple text-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-opacity mt-6"
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
                        Object.entries(feedback.messages).map(([question, messages]) => 
                          messages.length > 0 && (
                            <div key={question} className="mb-4">
                              <h4 className="font-semibold text-red-800 mb-2">
                                {`handling_classified_information_quiz_feedback_${question === 'publicDocuments' ? 'q1' : 
                                   question === 'confidentialDocuments' ? 'q2' : 
                                   question === 'internalDocuments' ? 'q3' : 
                                   question === 'highlyConfidentialFiles' ? 'q4' : 
                                   'q5'}_title`}
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

export default HandlingClassifiedInformation;
