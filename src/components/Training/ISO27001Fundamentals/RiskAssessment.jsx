import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';

function RiskAssessment() {
  const navigate = useNavigate();
  const { markModuleComplete } = useTraining();
  const [quizCompleted, setQuizCompleted] = useState(false);
  
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
    const messages = [];
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
      messages.push("Question 1: Risk assessment is the overall process of identifying, analyzing, and evaluating risks to information security.");
      allCorrect = false;
    }
    
    if (answers.riskManagementProcess !== correctAnswers.riskManagementProcess) {
      messages.push("Question 2: The risk management process includes identification, analysis, evaluation, and treatment of risks.");
      allCorrect = false;
    }
    
    if (answers.assetIdentification !== correctAnswers.assetIdentification) {
      messages.push("Question 3: All information assets should be identified and valued as part of a risk assessment.");
      allCorrect = false;
    }
    
    if (answers.threatTypes !== correctAnswers.threatTypes) {
      messages.push("Question 4: Common threats include human errors, technical failures, physical events, and malicious attacks.");
      allCorrect = false;
    }
    
    if (answers.riskTreatment !== correctAnswers.riskTreatment) {
      messages.push("Question 5: The four primary risk treatment options are: modify (mitigate), accept, avoid, and transfer.");
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? ["Excellent! You understand the principles of risk assessment in the context of information security."]
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
            ← Back to ISO 27001 Fundamentals
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">Risk Assessment</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">What is Risk Assessment?</h2>
              <p className="text-black mb-4">
                Risk assessment is a critical component of ISO 27001 and the foundation of an effective information security management system (ISMS). It involves identifying, analyzing, and evaluating risks to information security.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                <p className="text-black">
                  <strong>Definition:</strong> Risk assessment is the overall process of risk identification, risk analysis, and risk evaluation as defined in ISO 27001.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">The Risk Management Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">1. Risk Identification</h3>
                    <p className="text-black">Finding, recognizing, and describing risks by identifying assets, threats, existing controls, vulnerabilities, and consequences.</p>
                  </div>
                  
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">2. Risk Analysis</h3>
                    <p className="text-black">Comprehending the nature of risk and determining the level of risk by assigning values to likelihood and impact.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">3. Risk Evaluation</h3>
                    <p className="text-black">Comparing risk analysis results with risk criteria to determine whether a risk is acceptable or requires treatment.</p>
                  </div>
                  
                  <div className="bg-white border border-blue-200 p-4 rounded">
                    <h3 className="text-lg font-medium text-black mb-2">4. Risk Treatment</h3>
                    <p className="text-black">Selecting and implementing options for addressing risk through risk modification (controls), risk acceptance, risk avoidance, or risk transfer.</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Key Components of Risk Assessment</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Asset Identification</h3>
                  <p className="text-black mb-3">
                    Identifying and categorizing information assets is the first step in risk assessment.
                  </p>
                  <div className="bg-white border border-gray-200 p-4 rounded">
                    <ul className="list-disc list-inside text-black space-y-1">
                      <li>Information assets (databases, files, documentation)</li>
                      <li>Software assets (applications, systems, development tools)</li>
                      <li>Physical assets (computers, networking equipment, media)</li>
                      <li>Services (computing services, communications)</li>
                      <li>People (staff, customers, users) and their qualifications, skills, and experience</li>
                      <li>Intangibles (reputation, image)</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Threat Identification</h3>
                  <p className="text-black mb-3">
                    Identifying potential threat sources and events that could harm assets.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">Internal Threats</h4>
                      <ul className="list-disc list-inside text-black space-y-1">
                        <li>Human errors</li>
                        <li>Rogue employees</li>
                        <li>System malfunctions</li>
                        <li>Process failures</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">External Threats</h4>
                      <ul className="list-disc list-inside text-black space-y-1">
                        <li>Cyber attacks</li>
                        <li>Natural disasters</li>
                        <li>Supply chain disruptions</li>
                        <li>Legal/regulatory changes</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Vulnerability Assessment</h3>
                  <p className="text-black mb-3">
                    Identifying weaknesses in assets that could be exploited by threats.
                  </p>
                  <div className="bg-white border border-gray-200 p-4 rounded">
                    <ul className="list-disc list-inside text-black space-y-1">
                      <li>Weak passwords or authentication methods</li>
                      <li>Unpatched software</li>
                      <li>Inadequate physical security</li>
                      <li>Insufficient staff training</li>
                      <li>Poorly configured systems</li>
                      <li>Inadequate backup procedures</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Risk Analysis Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">Qualitative Analysis</h4>
                      <p className="text-black">Uses descriptive scales (High, Medium, Low) to describe likelihood and impact of risks.</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">Quantitative Analysis</h4>
                      <p className="text-black">Assigns numerical values to risks, often in monetary terms or specific scoring systems.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Risk Treatment Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">Modify (Mitigate)</h4>
                      <p className="text-black">Implement controls to reduce risk likelihood or impact.</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">Accept</h4>
                      <p className="text-black">Make an informed decision to accept the risk without further action.</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">Avoid</h4>
                      <p className="text-black">Decide not to proceed with the activity that introduces the risk.</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded">
                      <h4 className="font-semibold text-black mb-1">Transfer</h4>
                      <p className="text-black">Share the risk with another party (e.g., insurance, outsourcing).</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Knowledge Check</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">1. What is risk assessment in the context of ISO 27001?</p>
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
                        <span className="text-black">A one-time evaluation of security threats</span>
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
                        <span className="text-black">A technical audit of IT systems</span>
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
                        <span className="text-black">The overall process of identifying, analyzing, and evaluating risks to information security</span>
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
                        <span className="text-black">An inventory of security software and hardware</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">2. What are the main steps in the risk management process?</p>
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
                        <span className="text-black">Detect, Respond, Recover, Report</span>
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
                        <span className="text-black">Identification, Analysis, Evaluation, Treatment</span>
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
                        <span className="text-black">Plan, Test, Implement, Review</span>
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
                        <span className="text-black">Purchase, Install, Configure, Maintain</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">3. Which of the following is NOT typically considered during asset identification?</p>
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
                        <span className="text-black">Information assets such as databases and files</span>
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
                        <span className="text-black">Physical assets such as servers and network equipment</span>
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
                        <span className="text-black">Intangible assets such as reputation and company image</span>
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
                        <span className="text-black">Competitor's security strategies</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">4. Which of the following is a complete list of common threat types?</p>
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
                        <span className="text-black">Human errors, technical failures, physical events, and malicious attacks</span>
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
                        <span className="text-black">Only cyber attacks and malware</span>
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
                        <span className="text-black">Only physical threats to hardware</span>
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
                        <span className="text-black">Only threats from rogue employees</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">5. What are the four main risk treatment options in ISO 27001?</p>
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
                        <span className="text-black">Ignore, document, escalate, outsource</span>
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
                        <span className="text-black">Modify (mitigate), accept, avoid, transfer</span>
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
                        <span className="text-black">Report, record, resolve, review</span>
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
                        <span className="text-black">Detect, protect, respond, recover</span>
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

export default RiskAssessment;
