import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';

function ISMSBasics() {
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();
  const [quizCompleted, setQuizCompleted] = useState(false);
  
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
  };

  const checkAnswers = () => {
    const messages = [];
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
      messages.push("Question 1: An ISMS is a systematic approach to managing sensitive information and ensuring business continuity.");
      allCorrect = false;
    }
    
    if (answers.pdcaCycle !== correctAnswers.pdcaCycle) {
      messages.push("Question 2: The PDCA cycle consists of Plan, Do, Check, Act phases for continuous improvement.");
      allCorrect = false;
    }
    
    if (answers.isoPrinciples !== correctAnswers.isoPrinciples) {
      messages.push("Question 3: ISO 27001 is based on a risk management approach to information security.");
      allCorrect = false;
    }
    
    if (answers.riskAssessment !== correctAnswers.riskAssessment) {
      messages.push("Question 4: Risk assessment is an essential component of establishing an ISMS.");
      allCorrect = false;
    }
    
    if (answers.certification !== correctAnswers.certification) {
      messages.push("Question 5: To achieve ISO 27001 certification, an organization needs to implement an ISMS, conduct internal audits, address nonconformities, and pass an external audit.");
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? ["Excellent! You understand the basics of Information Security Management Systems (ISMS) and ISO 27001."]
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
            ← Back to ISO 27001 Fundamentals
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">ISMS Basics</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">What is an ISMS?</h2>
              <p className="text-black mb-4">
                An Information Security Management System (ISMS) is a systematic approach to managing sensitive company information 
                so that it remains secure. It encompasses people, processes, and technology.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <p className="text-black">
                  <strong>Definition:</strong> An ISMS is a framework of policies and procedures that includes all legal, physical, and 
                  technical controls involved in an organization's information risk management processes.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Why Implement an ISMS?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black mb-2">Business Benefits</h3>
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>Improved information security posture</li>
                    <li>Competitive advantage</li>
                    <li>Client and stakeholder confidence</li>
                    <li>Business continuity</li>
                    <li>Reduced cyber insurance premiums</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black mb-2">Risk Management</h3>
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>Structured identification of risks</li>
                    <li>Implementation of appropriate controls</li>
                    <li>Systematic management of threats</li>
                    <li>Reduced likelihood of breaches</li>
                    <li>Legal and regulatory compliance</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">ISO 27001 and ISMS</h2>
              <p className="text-black mb-4">
                ISO 27001 is the international standard that describes best practices for an ISMS. 
                It provides a framework for establishing, implementing, operating, monitoring, reviewing, 
                maintaining, and improving an ISMS.
              </p>
              
              <h3 className="text-xl font-medium text-black mb-2">The PDCA Cycle in ISMS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <h4 className="font-semibold text-black">Plan</h4>
                  <p className="text-black">Establish ISMS policy, objectives, processes, and procedures</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                  <h4 className="font-semibold text-black">Do</h4>
                  <p className="text-black">Implement and operate the ISMS policy, controls, processes, and procedures</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                  <h4 className="font-semibold text-black">Check</h4>
                  <p className="text-black">Monitor and review the ISMS, measuring process performance against policy and objectives</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                  <h4 className="font-semibold text-black">Act</h4>
                  <p className="text-black">Take corrective and preventive actions, based on internal audit results, to achieve continual improvement</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Key Components of an ISMS</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">Information Security Policy</h3>
                  <p className="text-black">Sets the direction and expresses management support for information security</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">Risk Assessment</h3>
                  <p className="text-black">Systematic process to identify, analyze, and evaluate information security risks</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">Security Controls</h3>
                  <p className="text-black">Safeguards or countermeasures to avoid, detect, counteract, or minimize security risks</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">Statement of Applicability (SoA)</h3>
                  <p className="text-black">Document describing which controls are relevant and applicable to the organization's ISMS</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">Internal Audits</h3>
                  <p className="text-black">Regular checks to ensure the ISMS is operating as expected and identify improvements</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border-l-4 border-purple">
                  <h3 className="text-lg font-medium text-black">Management Review</h3>
                  <p className="text-black">Regular review of the ISMS by senior management to ensure its continuing suitability and effectiveness</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Knowledge Check</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">1. What is an Information Security Management System (ISMS)?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="a"
                          checked={answers.ismsDefinition === 'a'}
                          onChange={() => handleAnswerChange('ismsDefinition', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">A software product that protects computer systems from attacks</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="b"
                          checked={answers.ismsDefinition === 'b'}
                          onChange={() => handleAnswerChange('ismsDefinition', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">A systematic approach to managing sensitive company information to ensure it remains secure</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="c"
                          checked={answers.ismsDefinition === 'c'}
                          onChange={() => handleAnswerChange('ismsDefinition', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">A physical security system for protecting servers and network infrastructure</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="ismsDefinition"
                          value="d"
                          checked={answers.ismsDefinition === 'd'}
                          onChange={() => handleAnswerChange('ismsDefinition', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">A set of technical controls applied to IT systems</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">2. What does the PDCA cycle in ISMS stand for?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="a"
                          checked={answers.pdcaCycle === 'a'}
                          onChange={() => handleAnswerChange('pdcaCycle', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Plan, Do, Check, Act</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="b"
                          checked={answers.pdcaCycle === 'b'}
                          onChange={() => handleAnswerChange('pdcaCycle', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Process, Design, Configure, Audit</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="c"
                          checked={answers.pdcaCycle === 'c'}
                          onChange={() => handleAnswerChange('pdcaCycle', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Protect, Detect, Contain, Analyze</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="pdcaCycle"
                          value="d"
                          checked={answers.pdcaCycle === 'd'}
                          onChange={() => handleAnswerChange('pdcaCycle', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Prepare, Develop, Control, Assess</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">3. What is the basis of ISO 27001?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="a"
                          checked={answers.isoPrinciples === 'a'}
                          onChange={() => handleAnswerChange('isoPrinciples', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Technical security controls only</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="b"
                          checked={answers.isoPrinciples === 'b'}
                          onChange={() => handleAnswerChange('isoPrinciples', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Compliance with legal requirements</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="c"
                          checked={answers.isoPrinciples === 'c'}
                          onChange={() => handleAnswerChange('isoPrinciples', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Risk management approach to information security</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="isoPrinciples"
                          value="d"
                          checked={answers.isoPrinciples === 'd'}
                          onChange={() => handleAnswerChange('isoPrinciples', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Hardware and software configuration</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">4. Which of the following is NOT a component of establishing an ISMS?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="a"
                          checked={answers.riskAssessment === 'a'}
                          onChange={() => handleAnswerChange('riskAssessment', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Information security policy</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="b"
                          checked={answers.riskAssessment === 'b'}
                          onChange={() => handleAnswerChange('riskAssessment', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Purchasing the most expensive security software</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="c"
                          checked={answers.riskAssessment === 'c'}
                          onChange={() => handleAnswerChange('riskAssessment', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Risk assessment</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="riskAssessment"
                          value="d"
                          checked={answers.riskAssessment === 'd'}
                          onChange={() => handleAnswerChange('riskAssessment', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Management review</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">5. What is required to achieve ISO 27001 certification?</p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="a"
                          checked={answers.certification === 'a'}
                          onChange={() => handleAnswerChange('certification', 'a')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Implementing all possible security technologies</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="b"
                          checked={answers.certification === 'b'}
                          onChange={() => handleAnswerChange('certification', 'b')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Having a perfect security record with no incidents</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="c"
                          checked={answers.certification === 'c'}
                          onChange={() => handleAnswerChange('certification', 'c')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Paying a certification fee to ISO directly</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="certification"
                          value="d"
                          checked={answers.certification === 'd'}
                          onChange={() => handleAnswerChange('certification', 'd')}
                          className="form-radio h-5 w-5 text-purple"
                        />
                        <span className="text-black">Implementing an ISMS, conducting internal audits, addressing nonconformities, and passing an external audit</span>
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    className="bg-purple text-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-opacity mt-6"
                    onClick={checkAnswers}
                  >
                    Check Answers
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
                className={`bg-purple px-6 py-3 rounded-md transition-opacity ${
                  quizCompleted 
                    ? 'text-black hover:bg-opacity-90 cursor-pointer' 
                    : 'text-gray-500 bg-opacity-50 cursor-not-allowed'
                }`}
                onClick={handleCompletion}
                disabled={!quizCompleted}
              >
                Mark as Completed
              </button>
              {!quizCompleted && (
                <p className="text-sm text-red-600 mt-2">
                  Complete the quiz successfully to mark this module as completed
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
