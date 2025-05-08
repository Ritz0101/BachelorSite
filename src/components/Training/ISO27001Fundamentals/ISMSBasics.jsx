import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';
import { useTranslation } from 'react-i18next';

function ISMSBasics() {
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { t } = useTranslation();
  
  const [answers, setAnswers] = useState({
    ismsDefinition: '',
    pdcaCycle: '',
    isoPrinciples: '',
    riskAssessment: '',
    certification: ''
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
    
    // Remove automatic checking of answers
  };

  const checkAnswers = () => {
    const messages = {
      ismsDefinition: [],
      pdcaCycle: [],
      isoPrinciples: [],
      riskAssessment: [],
      certification: []
    };
    let allCorrect = true;
    
    // Define correct answers
    const correctAnswers = {
      ismsDefinition: 'b',
      pdcaCycle: 'a',
      isoPrinciples: 'c',
      riskAssessment: 'b',
      certification: 'd'
    };
    
    // Check each answer
    if (answers.ismsDefinition !== correctAnswers.ismsDefinition) {
      messages.ismsDefinition.push(t('isms_quiz_feedback_q1_feedback'));
      allCorrect = false;
    }
    
    if (answers.pdcaCycle !== correctAnswers.pdcaCycle) {
      messages.pdcaCycle.push(t('isms_quiz_feedback_q2_feedback'));
      allCorrect = false;
    }
    
    if (answers.isoPrinciples !== correctAnswers.isoPrinciples) {
      messages.isoPrinciples.push(t('isms_quiz_feedback_q3_feedback'));
      allCorrect = false;
    }
    
    if (answers.riskAssessment !== correctAnswers.riskAssessment) {
      messages.riskAssessment.push(t('isms_quiz_feedback_q4_feedback'));
      allCorrect = false;
    }
    
    if (answers.certification !== correctAnswers.certification) {
      messages.certification.push(t('isms_quiz_feedback_q5_feedback'));
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? [t('isms_quiz_feedback_excellent')]
        : messages,
      allCorrect: allCorrect
    });
    
    if (allCorrect) {
      setQuizCompleted(true);
    }
  };

  const handleCompletion = () => {
    markModuleComplete('2.1');
    // Navigate to the next module (Risk Assessment)
    navigate('/training/iso27001-fundamentals/risk-assessment');
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/iso27001-fundamentals" className="text-black hover:underline mb-4 inline-block">
            ← {t('isms_back_to_button')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('isms_basics_title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('isms_what_is_title')}</h2>
              <p className="text-black mb-4">
                {t('isms_what_is_description')}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <p className="text-black">
                  <strong>{t('isms_what_is_definition')}</strong>
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('isms_why_implement_title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black mb-2">{t('isms_business_benefits_title')}</h3>
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>{t('isms_business_benefits_item1')}</li>
                    <li>{t('isms_business_benefits_item2')}</li>
                    <li>{t('isms_business_benefits_item3')}</li>
                    <li>{t('isms_business_benefits_item4')}</li>
                    <li>{t('isms_business_benefits_item5')}</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black mb-2">{t('isms_risk_management_title')}</h3>
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>{t('isms_risk_management_item1')}</li>
                    <li>{t('isms_risk_management_item2')}</li>
                    <li>{t('isms_risk_management_item3')}</li>
                    <li>{t('isms_risk_management_item4')}</li>
                    <li>{t('isms_risk_management_item5')}</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('iso_and_isms_title')}</h2>
              <p className="text-black mb-4">
                {t('iso_and_isms_description')}
              </p>
              
              <h3 className="text-xl font-medium text-black mb-2">{t('isms_pdca_title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <h4 className="font-semibold text-black">{t('isms_pdca_plan_title')}</h4>
                  <p className="text-black">{t('isms_pdca_plan_description')}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                  <h4 className="font-semibold text-black">{t('isms_pdca_do_title')}</h4>
                  <p className="text-black">{t('isms_pdca_do_description')}</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                  <h4 className="font-semibold text-black">{t('isms_pdca_check_title')}</h4>
                  <p className="text-black">{t('isms_pdca_check_description')}</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                  <h4 className="font-semibold text-black">{t('isms_pdca_act_title')}</h4>
                  <p className="text-black">{t('isms_pdca_act_description')}</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('key_components_of_isms_title')}</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">{t('information_security_policy_title')}</h3>
                  <p className="text-black">{t('information_security_policy_description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">{t('risk_assessment_title')}</h3>
                  <p className="text-black">{t('risk_assessment_policy_description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">{t('security_controls_title')}</h3>
                  <p className="text-black">{t('security_controls_description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">{t('statement_of_applicability_title')}</h3>
                  <p className="text-black">{t('statement_of_applicability_description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">{t('internal_audits_title')}</h3>
                  <p className="text-black">{t('internal_audits_description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">{t('managment_review_title')}</h3>
                  <p className="text-black">{t('management_review_description')}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('knowledge_check_title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('isms_quiz_q1')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="a"
                          checked={answers.ismsDefinition === 'a'}
                          onChange={(e) => handleAnswerChange('ismsDefinition', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q1_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="b"
                          checked={answers.ismsDefinition === 'b'}
                          onChange={(e) => handleAnswerChange('ismsDefinition', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q1_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="c"
                          checked={answers.ismsDefinition === 'c'}
                          onChange={(e) => handleAnswerChange('ismsDefinition', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q1_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="d"
                          checked={answers.ismsDefinition === 'd'}
                          onChange={(e) => handleAnswerChange('ismsDefinition', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q1_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('isms_quiz_q2')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="a"
                          checked={answers.pdcaCycle === 'a'}
                          onChange={(e) => handleAnswerChange('pdcaCycle', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q2_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="b"
                          checked={answers.pdcaCycle === 'b'}
                          onChange={(e) => handleAnswerChange('pdcaCycle', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q2_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="c"
                          checked={answers.pdcaCycle === 'c'}
                          onChange={(e) => handleAnswerChange('pdcaCycle', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q2_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="d"
                          checked={answers.pdcaCycle === 'd'}
                          onChange={(e) => handleAnswerChange('pdcaCycle', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q2_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('isms_quiz_q3')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="a"
                          checked={answers.isoPrinciples === 'a'}
                          onChange={(e) => handleAnswerChange('isoPrinciples', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q3_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="b"
                          checked={answers.isoPrinciples === 'b'}
                          onChange={(e) => handleAnswerChange('isoPrinciples', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q3_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="c"
                          checked={answers.isoPrinciples === 'c'}
                          onChange={(e) => handleAnswerChange('isoPrinciples', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q3_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="d"
                          checked={answers.isoPrinciples === 'd'}
                          onChange={(e) => handleAnswerChange('isoPrinciples', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q3_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('isms_quiz_q4')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="a"
                          checked={answers.riskAssessment === 'a'}
                          onChange={(e) => handleAnswerChange('riskAssessment', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q4_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="b"
                          checked={answers.riskAssessment === 'b'}
                          onChange={(e) => handleAnswerChange('riskAssessment', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q4_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="c"
                          checked={answers.riskAssessment === 'c'}
                          onChange={(e) => handleAnswerChange('riskAssessment', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q4_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="d"
                          checked={answers.riskAssessment === 'd'}
                          onChange={(e) => handleAnswerChange('riskAssessment', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q4_option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('isms_quiz_q5')}</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="a"
                          checked={answers.certification === 'a'}
                          onChange={(e) => handleAnswerChange('certification', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q5_option1')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="b"
                          checked={answers.certification === 'b'}
                          onChange={(e) => handleAnswerChange('certification', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q5_option2')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="c"
                          checked={answers.certification === 'c'}
                          onChange={(e) => handleAnswerChange('certification', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q5_option3')}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="d"
                          checked={answers.certification === 'd'}
                          onChange={(e) => handleAnswerChange('certification', e.target.value)}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">{t('isms_quiz_q5_option4')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
                          {question === 'ismsDefinition' && t('isms_quiz_feedback_q1_title')}
                          {question === 'pdcaCycle' && t('isms_quiz_feedback_q2_title')}
                          {question === 'isoPrinciples' && t('isms_quiz_feedback_q3_title')}
                          {question === 'riskAssessment' && t('isms_quiz_feedback_q4_title')}
                          {question === 'certification' && t('isms_quiz_feedback_q5_title')}
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

export default ISMSBasics;
