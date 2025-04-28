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
      messages.ismsDefinition.push(t('training.modules.iso27001.submodules.ismsBasics.quiz.feedback.ismsDefinition'));
      allCorrect = false;
    }
    
    if (answers.pdcaCycle !== correctAnswers.pdcaCycle) {
      messages.pdcaCycle.push(t('training.modules.iso27001.submodules.ismsBasics.quiz.feedback.pdcaCycle'));
      allCorrect = false;
    }
    
    if (answers.isoPrinciples !== correctAnswers.isoPrinciples) {
      messages.isoPrinciples.push(t('training.modules.iso27001.submodules.ismsBasics.quiz.feedback.isoPrinciples'));
      allCorrect = false;
    }
    
    if (answers.riskAssessment !== correctAnswers.riskAssessment) {
      messages.riskAssessment.push(t('training.modules.iso27001.submodules.ismsBasics.quiz.feedback.riskAssessment'));
      allCorrect = false;
    }
    
    if (answers.certification !== correctAnswers.certification) {
      messages.certification.push(t('training.modules.iso27001.submodules.ismsBasics.quiz.feedback.certification'));
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? [t('training.modules.iso27001.submodules.ismsBasics.quiz.excellent')]
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
          <Link to="/training/iso27001-fundamentals" className="text-gray-400 hover:underline mb-4 inline-block">
            ← {t('training.modules.iso27001.submodules.ismsBasics.backToModule')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('training.modules.iso27001.submodules.ismsBasics.title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.ismsBasics.whatIsISMS.title')}</h2>
              <p className="text-black mb-4">
                {t('training.modules.iso27001.submodules.ismsBasics.whatIsISMS.description')}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <p className="text-black">
                  <strong>{t('training.modules.iso27001.submodules.ismsBasics.whatIsISMS.definition')}</strong>
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black mb-2">{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.businessBenefits.title')}</h3>
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.businessBenefits.item1')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.businessBenefits.item2')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.businessBenefits.item3')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.businessBenefits.item4')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.businessBenefits.item5')}</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black mb-2">{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.riskManagement.title')}</h3>
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.riskManagement.item1')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.riskManagement.item2')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.riskManagement.item3')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.riskManagement.item4')}</li>
                    <li>{t('training.modules.iso27001.submodules.ismsBasics.whyImplement.riskManagement.item5')}</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.title')}</h2>
              <p className="text-black mb-4">
                {t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.description')}
              </p>
              
              <h3 className="text-xl font-medium text-black mb-2">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <h4 className="font-semibold text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.plan.title')}</h4>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.plan.description')}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                  <h4 className="font-semibold text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.do.title')}</h4>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.do.description')}</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                  <h4 className="font-semibold text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.check.title')}</h4>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.check.description')}</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                  <h4 className="font-semibold text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.act.title')}</h4>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.isoAndISMS.pdcaCycle.act.description')}</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.title')}</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-md border-l-4 border-purple shadow-md">
                  <h3 className="text-lg font-medium text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.policy.title')}</h3>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.policy.description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple shadow-md">
                  <h3 className="text-lg font-medium text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.riskAssessment.title')}</h3>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.riskAssessment.description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple shadow-md">
                  <h3 className="text-lg font-medium text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.controls.title')}</h3>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.controls.description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple shadow-md">
                  <h3 className="text-lg font-medium text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.soa.title')}</h3>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.soa.description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple shadow-md">
                  <h3 className="text-lg font-medium text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.audits.title')}</h3>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.audits.description')}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple shadow-md">
                  <h3 className="text-lg font-medium text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.review.title')}</h3>
                  <p className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.keyComponents.review.description')}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.ismsBasics.quiz.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.ismsDefinition.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.ismsDefinition.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.ismsDefinition.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.ismsDefinition.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.ismsDefinition.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.pdcaCycle.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.pdcaCycle.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.pdcaCycle.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.pdcaCycle.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.pdcaCycle.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.isoPrinciples.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.isoPrinciples.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.isoPrinciples.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.isoPrinciples.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.isoPrinciples.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.riskAssessment.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.riskAssessment.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.riskAssessment.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.riskAssessment.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.riskAssessment.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.certification.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.certification.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.certification.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.certification.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.certification.options.d')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button 
              className="bg-dark-purple text-white px-4 py-2 rounded-md hover:scale-[1.01] hover:bg-opacity-90 hover:shadow-lg transition-all mt-6"
              onClick={checkAnswers}
            >
              {t('common.checkAnswers')}
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
                          {question === 'ismsDefinition' && t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.ismsDefinition.title')}
                          {question === 'pdcaCycle' && t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.pdcaCycle.title')}
                          {question === 'isoPrinciples' && t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.isoPrinciples.title')}
                          {question === 'riskAssessment' && t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.riskAssessment.title')}
                          {question === 'certification' && t('training.modules.iso27001.submodules.ismsBasics.quiz.questions.certification.title')}
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
                className={`px-6 py-3 rounded-md transition-all ${
                  quizCompleted 
                    ? 'bg-dark-purple text-white font-bold hover:scale-[1.01] hover:bg-opacity-90 hover:shadow-lg' 
                    : 'bg-purple text-gray-500 bg-opacity-50 cursor-not-allowed'
                }`}
                onClick={handleCompletion}
                disabled={!quizCompleted}
              >
                {t('training.markAsCompleted')}
              </button>
              {!quizCompleted && (
                <p className="text-sm text-red-600 mt-2">
                  {t('training.modules.iso27001.submodules.ismsBasics.quizCompletionRequired', 'Complete the quiz successfully to mark this module as completed')}
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
