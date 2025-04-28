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
    const messages = [];
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
      messages.push(t('training.informationClassification.handlingClassifiedInformation.quiz.feedback.public'));
      allCorrect = false;
    }
    
    if (answers.confidentialDocuments !== correctAnswers.confidentialDocuments) {
      messages.push(t('training.informationClassification.handlingClassifiedInformation.quiz.feedback.confidential'));
      allCorrect = false;
    }
    
    if (answers.internalDocuments !== correctAnswers.internalDocuments) {
      messages.push(t('training.informationClassification.handlingClassifiedInformation.quiz.feedback.internal'));
      allCorrect = false;
    }
    
    if (answers.highlyConfidentialFiles !== correctAnswers.highlyConfidentialFiles) {
      messages.push(t('training.informationClassification.handlingClassifiedInformation.quiz.feedback.highlyConfidential'));
      allCorrect = false;
    }
    
    if (answers.incidentReporting !== correctAnswers.incidentReporting) {
      messages.push(t('training.informationClassification.handlingClassifiedInformation.quiz.feedback.incident'));
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? [t('training.informationClassification.handlingClassifiedInformation.quiz.feedback.excellent')]
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
          <Link to="/training/information-classification-basics" className="text-gray-400 hover:underline mb-4 inline-block">
            ← {t('training.informationClassification.handlingClassifiedInformation.backToModule')}
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">{t('training.informationClassification.handlingClassifiedInformation.title')}</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.informationClassification.handlingClassifiedInformation.guidelines.title')}</h2>
              
              <div className="space-y-4 mt-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-md">
                  <h3 className="text-xl font-medium text-green-700">{t('training.informationClassification.handlingClassifiedInformation.guidelines.public.title')}</h3>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.public.item1')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.public.item2')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.public.item3')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.public.item4')}</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-md">
                  <h3 className="text-xl font-medium text-black">{t('training.informationClassification.handlingClassifiedInformation.guidelines.internal.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.internal.item1')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.internal.item2')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.internal.item3')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.internal.item4')}</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md shadow-md">
                  <h3 className="text-xl font-medium text-black">{t('training.informationClassification.handlingClassifiedInformation.guidelines.confidential.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.confidential.item1')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.confidential.item2')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.confidential.item3')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.confidential.item4')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.confidential.item5')}</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-md">
                  <h3 className="text-xl font-medium text-black">{t('training.informationClassification.handlingClassifiedInformation.guidelines.highlyConfidential.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.highlyConfidential.item1')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.highlyConfidential.item2')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.highlyConfidential.item3')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.highlyConfidential.item4')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.highlyConfidential.item5')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.guidelines.highlyConfidential.item6')}</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.informationClassification.handlingClassifiedInformation.bestPractices.title')}</h2>
              
              <div className="mt-4 space-y-4">
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">{t('training.informationClassification.handlingClassifiedInformation.bestPractices.physical.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.physical.item1')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.physical.item2')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.physical.item3')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.physical.item4')}</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">{t('training.informationClassification.handlingClassifiedInformation.bestPractices.digital.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.digital.item1')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.digital.item2')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.digital.item3')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.digital.item4')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.digital.item5')}</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">{t('training.informationClassification.handlingClassifiedInformation.bestPractices.incident.title')}</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.incident.item1')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.incident.item2')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.incident.item3')}</li>
                    <li>{t('training.informationClassification.handlingClassifiedInformation.bestPractices.incident.item4')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('training.informationClassification.handlingClassifiedInformation.quiz.title')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.informationClassification.handlingClassifiedInformation.quiz.question1.title')}</p>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question1.option1')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question1.option2')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question1.option3')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question1.option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.informationClassification.handlingClassifiedInformation.quiz.question2.title')}</p>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question2.option1')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question2.option2')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question2.option3')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question2.option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.informationClassification.handlingClassifiedInformation.quiz.question3.title')}</p>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question3.option1')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question3.option2')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question3.option3')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question3.option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.informationClassification.handlingClassifiedInformation.quiz.question4.title')}</p>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question4.option1')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question4.option2')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question4.option3')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question4.option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">{t('training.informationClassification.handlingClassifiedInformation.quiz.question5.title')}</p>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question5.option1')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question5.option2')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question5.option3')}</span>
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
                        <span className="text-black">{t('training.informationClassification.handlingClassifiedInformation.quiz.question5.option4')}</span>
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    className="bg-dark-purple text-white px-4 py-2 rounded-md hover:scale-[1.01] hover:bg-opacity-90 hover:shadow-lg transition-all mt-6"
                    onClick={checkAnswers}
                  >
                    {t('training.informationClassification.handlingClassifiedInformation.quiz.checkAnswers')}
                  </button>
                  
                  {feedback.show && (
                    <div className={`mt-4 p-4 rounded-md ${
                      feedback.allCorrect
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      {feedback.messages.map((message, index) => (
                        <p key={index} className={`${
                          feedback.allCorrect
                            ? 'text-green-800' 
                            : 'text-red-800'
                        } mb-2`}>
                          • {message}
                        </p>
                      ))}
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
                  {t('training.informationClassification.handlingClassifiedInformation.quiz.completionRequired')}
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
