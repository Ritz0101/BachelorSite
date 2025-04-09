import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';

function HandlingClassifiedInformation() {
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
      messages.push("Question 1: Public information can be shared openly as it poses no security risk.");
      allCorrect = false;
    }
    
    if (answers.confidentialDocuments !== correctAnswers.confidentialDocuments) {
      messages.push("Question 2: Confidential documents should be shared only with authorized individuals using secure methods.");
      allCorrect = false;
    }
    
    if (answers.internalDocuments !== correctAnswers.internalDocuments) {
      messages.push("Question 3: Internal documents should be shared only within the organization.");
      allCorrect = false;
    }
    
    if (answers.highlyConfidentialFiles !== correctAnswers.highlyConfidentialFiles) {
      messages.push("Question 4: Highly confidential files require strict access controls, encryption, and activity logging.");
      allCorrect = false;
    }
    
    if (answers.incidentReporting !== correctAnswers.incidentReporting) {
      messages.push("Question 5: If you discover a data breach, it should be reported immediately to the security team.");
      allCorrect = false;
    }
    
    setFeedback({
      show: true,
      messages: allCorrect 
        ? ["Excellent! You understand how to properly handle information based on its classification level."]
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
            ← Back to Information Classification Basics
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">Handling Classified Information</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Handling Guidelines by Classification Level</h2>
              
              <div className="space-y-4 mt-6">
                <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Public Information</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>Can be freely shared internally and externally</li>
                    <li>No special handling required</li>
                    <li>Can be published on public websites</li>
                    <li>Examples: Marketing materials, press releases, public annual reports</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Internal Information</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>Share only within the organization</li>
                    <li>Avoid sharing with external parties without approval</li>
                    <li>Use company email for distribution</li>
                    <li>Examples: Internal procedures, employee directories, meeting minutes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Confidential Information</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>Share only with authorized individuals who need to know</li>
                    <li>Use secure methods for sharing (encrypted email, secure file sharing)</li>
                    <li>Password-protect documents when possible</li>
                    <li>Do not leave printed copies unattended</li>
                    <li>Examples: Customer data, financial reports, business strategies</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Highly Confidential Information</h3>
                  <ul className="list-disc list-inside text-black mt-2 space-y-1">
                    <li>Strictest access controls - only specific authorized individuals</li>
                    <li>Always use encryption when storing or transmitting</li>
                    <li>Track all access and actions taken on the information</li>
                    <li>Obtain explicit approval before sharing</li>
                    <li>Use secure rooms for discussions involving this information</li>
                    <li>Examples: Trade secrets, authentication credentials, strategic acquisitions</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Security Best Practices</h2>
              
              <div className="mt-4 space-y-4">
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">Physical Security</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>Use the clean desk policy - don't leave sensitive documents visible</li>
                    <li>Lock away sensitive information when not in use</li>
                    <li>Shred confidential documents when disposing</li>
                    <li>Be aware of your surroundings when discussing sensitive information</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">Digital Security</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>Use strong passwords and multi-factor authentication</li>
                    <li>Encrypt sensitive files and communications</li>
                    <li>Be cautious with email attachments and links</li>
                    <li>Lock your computer when away from your desk</li>
                    <li>Only use approved cloud services for sensitive data</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-4 rounded">
                  <h3 className="text-lg font-medium text-black">Incident Response</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>Report security incidents immediately</li>
                    <li>Know who to contact in case of a suspected breach</li>
                    <li>Document any potential exposure of sensitive information</li>
                    <li>Follow company procedures for incident response</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Knowledge Check</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div>
                    <p className="text-black font-medium mb-2">1. How should you handle public documents?</p>
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
                        <span className="text-black">Password-protect them and only share internally</span>
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
                        <span className="text-black">Encrypt them before sharing</span>
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
                        <span className="text-black">Share freely as they contain no sensitive information</span>
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
                        <span className="text-black">Never share them outside the department</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div>
                    <p className="text-black font-medium mb-2">2. When sharing confidential documents, you should:</p>
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
                        <span className="text-black">Share them with anyone who asks for them</span>
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
                        <span className="text-black">Share only with authorized individuals using secure methods</span>
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
                        <span className="text-black">Post them publicly but with a password</span>
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
                        <span className="text-black">Never share them under any circumstances</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div>
                    <p className="text-black font-medium mb-2">3. Internal documents should be shared:</p>
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
                        <span className="text-black">Only within the organization</span>
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
                        <span className="text-black">With anyone who needs them for their work</span>
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
                        <span className="text-black">With trusted partners and customers</span>
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
                        <span className="text-black">Only with executives</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 4 */}
                  <div>
                    <p className="text-black font-medium mb-2">4. Highly confidential files require:</p>
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
                        <span className="text-black">Basic security measures</span>
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
                        <span className="text-black">Password protection only</span>
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
                        <span className="text-black">Standard email for distribution</span>
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
                        <span className="text-black">Strict access controls, encryption, and activity logging</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Question 5 */}
                  <div>
                    <p className="text-black font-medium mb-2">5. If you discover a data breach involving classified information, you should:</p>
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
                        <span className="text-black">Try to fix it yourself without telling anyone</span>
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
                        <span className="text-black">Report it immediately to the security team</span>
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
                        <span className="text-black">Inform the affected customers directly</span>
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
                        <span className="text-black">Wait and see if anyone notices</span>
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

export default HandlingClassifiedInformation;
