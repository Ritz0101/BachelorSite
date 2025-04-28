import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';
import { useTranslation } from 'react-i18next';

function RiskAssessment() {
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();
  const [quizCompleted, setQuizCompleted] = useState(true);
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
    
    // Check each answer
    if (answers.riskAssessmentDefinition !== correctAnswers.riskAssessmentDefinition) {
      messages.riskAssessmentDefinition.push(t('training.modules.iso27001.submodules.riskAssessment.quiz.feedback.riskAssessmentDefinition'));
      allCorrect = false;
    }
    
    if (answers.riskManagementProcess !== correctAnswers.riskManagementProcess) {
      messages.riskManagementProcess.push(t('training.modules.iso27001.submodules.riskAssessment.quiz.feedback.riskManagementProcess'));
      allCorrect = false;
    }
    
    if (answers.assetIdentification !== correctAnswers.assetIdentification) {
      messages.assetIdentification.push(t('training.modules.iso27001.submodules.riskAssessment.quiz.feedback.assetIdentification'));
      allCorrect = false;
    }
    
    if (answers.threatTypes !== correctAnswers.threatTypes) {
      messages.threatTypes.push(t('training.modules.iso27001.submodules.riskAssessment.quiz.feedback.threatTypes'));
      allCorrect = false;
    }
    
    if (answers.riskTreatment !== correctAnswers.riskTreatment) {
      messages.riskTreatment.push(t('training.modules.iso27001.submodules.riskAssessment.quiz.feedback.riskTreatment'));
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? [t('training.modules.iso27001.submodules.riskAssessment.quiz.excellent')]
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
          <Link to="/training/iso27001-fundamentals" className="text-gray-400 hover:underline mb-4 inline-block">
            ← {t('training.modules.iso27001.submodules.riskAssessment.backToModule')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('training.modules.iso27001.submodules.riskAssessment.title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.riskAssessment.whatIs.title')}</h2>
              <p className="text-black mb-4">
                {t('training.modules.iso27001.submodules.riskAssessment.whatIs.description')}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <p className="text-black">
                  <strong>{t('training.modules.iso27001.submodules.riskAssessment.whatIs.definition')}</strong>
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.riskAssessment.process.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.process.identification.title')}</h3>
                    <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.process.identification.description')}</p>
                  </div>
                  
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.process.analysis.title')}</h3>
                    <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.process.analysis.description')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.process.evaluation.title')}</h3>
                    <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.process.evaluation.description')}</p>
                  </div>
                  
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.process.treatment.title')}</h3>
                    <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.process.treatment.description')}</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.title')}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.title')}</h3>
                  <p className="text-black mb-3">
                    {t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.description')}
                  </p>
                  <div className="bg-white border border-gray-200 p-4 rounded">
                    <ul className="list-disc list-inside text-black space-y-1">
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.item1')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.item2')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.item3')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.item4')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.item5')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.assets.item6')}</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.title')}</h3>
                  <p className="text-black mb-3">
                    {t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.internal.title')}</h4>
                      <ul className="list-disc list-inside text-black space-y-1">
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.internal.item1')}</li>
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.internal.item2')}</li>
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.internal.item3')}</li>
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.internal.item4')}</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.external.title')}</h4>
                      <ul className="list-disc list-inside text-black space-y-1">
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.external.item1')}</li>
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.external.item2')}</li>
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.external.item3')}</li>
                        <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.threats.external.item4')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.title')}</h3>
                  <p className="text-black mb-3">
                    {t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.description')}
                  </p>
                  <div className="bg-white border border-gray-200 p-4 rounded">
                    <ul className="list-disc list-inside text-black space-y-1">
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.item1')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.item2')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.item3')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.item4')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.item5')}</li>
                      <li>{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.vulnerabilities.item6')}</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.analysis.title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.analysis.qualitative.title')}</h4>
                      <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.analysis.qualitative.description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.analysis.quantitative.title')}</h4>
                      <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.analysis.quantitative.description')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.modify.title')}</h4>
                      <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.modify.description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.accept.title')}</h4>
                      <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.accept.description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.avoid.title')}</h4>
                      <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.avoid.description')}</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.transfer.title')}</h4>
                      <p className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.keyComponents.treatment.transfer.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.modules.iso27001.submodules.riskAssessment.quiz.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskAssessmentDefinition.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskAssessmentDefinition.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskAssessmentDefinition.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskAssessmentDefinition.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskAssessmentDefinition.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskManagementProcess.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskManagementProcess.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskManagementProcess.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskManagementProcess.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskManagementProcess.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.assetIdentification.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.assetIdentification.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.assetIdentification.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.assetIdentification.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.assetIdentification.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.threatTypes.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.threatTypes.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.threatTypes.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.threatTypes.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.threatTypes.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskTreatment.question')}</p>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskTreatment.options.a')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskTreatment.options.b')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskTreatment.options.c')}</span>
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
                        <span className="text-black">{t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskTreatment.options.d')}</span>
                      </label>
                    </div>
                  </div>
                  
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
                                {question === 'riskAssessmentDefinition' && t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskAssessmentDefinition.title')}
                                {question === 'riskManagementProcess' && t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskManagementProcess.title')}
                                {question === 'assetIdentification' && t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.assetIdentification.title')}
                                {question === 'threatTypes' && t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.threatTypes.title')}
                                {question === 'riskTreatment' && t('training.modules.iso27001.submodules.riskAssessment.quiz.questions.riskTreatment.title')}
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
                  {t('training.modules.iso27001.submodules.riskAssessment.quizCompletionRequired', 'Complete the quiz successfully to mark this module as completed')}
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
