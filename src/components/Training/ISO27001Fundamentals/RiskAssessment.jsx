import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';
import { useTranslation } from 'react-i18next';

function RiskAssessment() {
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { t } = useTranslation();
  
  const [answers, setAnswers] = useState({
    riskAssessmentDefinition: '',
    riskManagementProcess: '',
    assetIdentification: '',
    threatTypes: '',
    riskTreatment: ''
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
      riskAssessmentDefinition: [],
      riskManagementProcess: [],
      assetIdentification: [],
      threatTypes: [],
      riskTreatment: []
    };
    let allCorrect = true;
    
    // Define correct answers
    const correctAnswers = {
      riskAssessmentDefinition: 'c',
      riskManagementProcess: 'b',
      assetIdentification: 'd',
      threatTypes: 'a',
      riskTreatment: 'b'
    };
    
    // Check each answer and use the full feedback keys
    if (answers.riskAssessmentDefinition !== correctAnswers.riskAssessmentDefinition) {
      messages.riskAssessmentDefinition.push(t('risk_assessment_quiz_feedback_q1_full'));
      allCorrect = false;
    }
    
    if (answers.riskManagementProcess !== correctAnswers.riskManagementProcess) {
      messages.riskManagementProcess.push(t('risk_assessment_quiz_feedback_q2_full'));
      allCorrect = false;
    }
    
    if (answers.assetIdentification !== correctAnswers.assetIdentification) {
      messages.assetIdentification.push(t('risk_assessment_quiz_feedback_q3_full'));
      allCorrect = false;
    }
    
    if (answers.threatTypes !== correctAnswers.threatTypes) {
      messages.threatTypes.push(t('risk_assessment_quiz_feedback_q4_full'));
      allCorrect = false;
    }
    
    if (answers.riskTreatment !== correctAnswers.riskTreatment) {
      messages.riskTreatment.push(t('risk_assessment_quiz_feedback_q5_full'));
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? [t('risk_assessment_quiz_feedback_excellent')]
        : messages,
      allCorrect: allCorrect
    });
    
    if (allCorrect) {
      setQuizCompleted(true);
    }
  };

  const handleCompletion = () => {
    markModuleComplete('2.2');
    // Navigate back to the ISO 27001 Fundamentals page
    navigate('/training/iso27001-fundamentals');
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/iso27001-fundamentals" className="text-black hover:underline mb-4 inline-block">
            ← {t('isms_back_to_button')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('risk_assessment_title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('risk_assessment_what_is_title')}</h2>
              <p className="text-black mb-4">
                {t('risk_assessment_what_is_description')}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <p className="text-black">
                  <strong>{t('risk_assessment_what_is_definition')}</strong>
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('risk_managment_process_title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('risk_identification_title')}</h3>
                    <p className="text-black">{t('risk_identification_description')}</p>
                  </div>
                  
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('risk_analysis_title')}</h3>
                    <p className="text-black">{t('risk_analysis_description')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('risk_evaluation_title')}</h3>
                    <p className="text-black">{t('risk_evaluation_description')}</p>
                  </div>
                  
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('risk_treatment_title')}</h3>
                    <p className="text-black">{t('risk_treatment_description')}</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('risk_key_components_title')}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('asset_identification_title')}</h3>
                  <p className="text-black mb-3">
                    {t('asset_identification_description')}
                  </p>
                  <div className="bg-white border border-gray-200 p-4 rounded">
                    <ul className="list-disc list-inside text-black space-y-1">
                      <li>{t('asset_identification_item1')}</li>
                      <li>{t('asset_identification_item2')}</li>
                      <li>{t('asset_identification_item3')}</li>
                      <li>{t('asset_identification_item4')}</li>
                      <li>{t('asset_identification_item5')}</li>
                      <li>{t('asset_identification_item6')}</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('threat_identification_title')}</h3>
                  <p className="text-black mb-3">
                    {t('threat_identification_description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('internal_threats_title')}</h4>
                      <ul className="list-disc list-inside text-black space-y-1">
                        <li>{t('internal_threats_item1')}</li>
                        <li>{t('internal_threats_item2')}</li>
                        <li>{t('internal_threats_item3')}</li>
                        <li>{t('internal_threats_item4')}</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('external_threats_title')}</h4>
                      <ul className="list-disc list-inside text-black space-y-1">
                        <li>{t('external_threats_item1')}</li>
                        <li>{t('external_threats_item2')}</li>
                        <li>{t('external_threats_item3')}</li>
                        <li>{t('external_threats_item4')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('vulnerability_assessment_title')}</h3>
                  <p className="text-black mb-3">
                    {t('vulnerability_assessment_description')}
                  </p>
                  <div className="bg-white border border-gray-200 p-4 rounded">
                    <ul className="list-disc list-inside text-black space-y-1">
                      <li>{t('vulnerability_assessment_item1')}</li>
                      <li>{t('vulnerability_assessment_item2')}</li>
                      <li>{t('vulnerability_assessment_item3')}</li>
                      <li>{t('vulnerability_assessment_item4')}</li>
                      <li>{t('vulnerability_assessment_item5')}</li>
                      <li>{t('vulnerability_assessment_item6')}</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('risk_analysis_methods_title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('qualitative_analysis_title')}</h4>
                      <p className="text-black">{t('qualitative_analysis_description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('quantitative_analysis_title')}</h4>
                      <p className="text-black">{t('quantitative_analysis_description')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('risk_treatment_options_title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('risk_treatment_options_modify')}</h4>
                      <p className="text-black">{t('risk_treatment_options_modify_description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('risk_treatment_options_accept')}</h4>
                      <p className="text-black">{t('risk_treatment_options_accept_description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('risk_treatment_options_avoid')}</h4>
                      <p className="text-black">{t('risk_treatment_options_avoid_description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('risk_treatment_options_transfer')}</h4>
                      <p className="text-black">{t('risk_treatment_options_transfer_description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('knowledge_check_title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('risk_assessment_quiz_q1')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessmentDefinition"
                          value="a"
                          checked={answers.riskAssessmentDefinition === 'a'}
                          onChange={() => handleAnswerChange('riskAssessmentDefinition', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q1_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessmentDefinition"
                          value="b"
                          checked={answers.riskAssessmentDefinition === 'b'}
                          onChange={() => handleAnswerChange('riskAssessmentDefinition', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q1_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessmentDefinition"
                          value="c"
                          checked={answers.riskAssessmentDefinition === 'c'}
                          onChange={() => handleAnswerChange('riskAssessmentDefinition', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q1_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessmentDefinition"
                          value="d"
                          checked={answers.riskAssessmentDefinition === 'd'}
                          onChange={() => handleAnswerChange('riskAssessmentDefinition', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q1_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('risk_assessment_quiz_q2')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskManagementProcess"
                          value="a"
                          checked={answers.riskManagementProcess === 'a'}
                          onChange={() => handleAnswerChange('riskManagementProcess', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q2_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskManagementProcess"
                          value="b"
                          checked={answers.riskManagementProcess === 'b'}
                          onChange={() => handleAnswerChange('riskManagementProcess', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q2_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskManagementProcess"
                          value="c"
                          checked={answers.riskManagementProcess === 'c'}
                          onChange={() => handleAnswerChange('riskManagementProcess', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q2_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskManagementProcess"
                          value="d"
                          checked={answers.riskManagementProcess === 'd'}
                          onChange={() => handleAnswerChange('riskManagementProcess', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q2_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('risk_assessment_quiz_q3')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="assetIdentification"
                          value="a"
                          checked={answers.assetIdentification === 'a'}
                          onChange={() => handleAnswerChange('assetIdentification', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q3_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="assetIdentification"
                          value="b"
                          checked={answers.assetIdentification === 'b'}
                          onChange={() => handleAnswerChange('assetIdentification', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q3_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="assetIdentification"
                          value="c"
                          checked={answers.assetIdentification === 'c'}
                          onChange={() => handleAnswerChange('assetIdentification', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q3_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="assetIdentification"
                          value="d"
                          checked={answers.assetIdentification === 'd'}
                          onChange={() => handleAnswerChange('assetIdentification', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q3_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('risk_assessment_quiz_q4')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="threatTypes"
                          value="a"
                          checked={answers.threatTypes === 'a'}
                          onChange={() => handleAnswerChange('threatTypes', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q4_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="threatTypes"
                          value="b"
                          checked={answers.threatTypes === 'b'}
                          onChange={() => handleAnswerChange('threatTypes', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q4_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="threatTypes"
                          value="c"
                          checked={answers.threatTypes === 'c'}
                          onChange={() => handleAnswerChange('threatTypes', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q4_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="threatTypes"
                          value="d"
                          checked={answers.threatTypes === 'd'}
                          onChange={() => handleAnswerChange('threatTypes', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q3_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('risk_assessment_quiz_q5')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskTreatment"
                          value="a"
                          checked={answers.riskTreatment === 'a'}
                          onChange={() => handleAnswerChange('riskTreatment', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q5_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskTreatment"
                          value="b"
                          checked={answers.riskTreatment === 'b'}

                          onChange={() => handleAnswerChange('riskTreatment', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q5_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskTreatment"
                          value="c"
                          checked={answers.riskTreatment === 'c'}
                          onChange={() => handleAnswerChange('riskTreatment', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q5_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskTreatment"
                          value="d"
                          checked={answers.riskTreatment === 'd'}
                          onChange={() => handleAnswerChange('riskTreatment', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('risk_assessment_quiz_q5_option4')}</span>
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
                              {messages.map((message, index) => {
                                // Split the message into title and content parts
                                // Assuming format like "Question 1: Risk Assessment Definition\n• The actual feedback..."
                                const parts = message.split('\n');
                                const title = parts[0];
                                const content = parts.slice(1).join('\n');
                                
                                return (
                                  <div key={index} className="mb-3">
                                    <h4 className="font-semibold text-red-800 mb-2">{title}</h4>
                                    <p className="text-red-800 ml-4 whitespace-pre-line">{content}</p>
                                  </div>
                                );
                              })}
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

export default RiskAssessment;
