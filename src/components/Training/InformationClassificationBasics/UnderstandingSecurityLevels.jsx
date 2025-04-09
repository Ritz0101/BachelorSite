import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';

function UnderstandingSecurityLevels() {
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
    const messages = [];
    let allCorrect = true;

    // Correct answers
    const correctAnswers = {
      scenario1: 'internal',
      scenario2: 'confidential',
      scenario3: 'highly-confidential'
    };

    // Check each scenario
    if (quizAnswers.scenario1 !== correctAnswers.scenario1) {
      messages.push("Scenario 1: Internal procedures should be classified as Internal. While not sensitive, they're not meant for public consumption.");
      allCorrect = false;
    }
    if (quizAnswers.scenario2 !== correctAnswers.scenario2) {
      messages.push("Scenario 2: Customer data contains private information and should be classified as Confidential.");
      allCorrect = false;
    }
    if (quizAnswers.scenario3 !== correctAnswers.scenario3) {
      messages.push("Scenario 3: Authentication credentials require the highest level of protection - Highly Confidential.");
      allCorrect = false;
    }

    setFeedback({
      show: true,
      messages: allCorrect 
        ? ["Excellent! You've correctly classified all scenarios. You understand how to apply different security levels."]
        : messages,
      allCorrect: allCorrect
    });

    // Set quiz as completed if all answers are correct
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
            ← Back to Information Classification Basics
          </Link>
          <h1 className="text-3xl font-bold text-custom-black mb-4">Understanding Security Levels</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Course Overview</h2>
              <p className="text-gray-600 mb-4">
                In this course, you will learn about the different security levels used to classify sensitive information.
                Understanding these levels is crucial for ensuring that information is properly protected according to its 
                sensitivity and importance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Learning Objectives</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Understand the purpose of security classification levels</li>
                <li>Identify the common classification levels and their meanings</li>
                <li>Apply appropriate security levels to different types of information</li>
                <li>Recognize the responsibilities associated with handling information at each level</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Classification Levels</h2>
              
              <div className="space-y-4 mt-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-green-700">Public</h3>
                  <p className="text-gray-600 mt-1">
                    Information that can be freely shared with the public and poses no risk if disclosed.
                    Examples include marketing materials, public reports, and general information on company websites.
                  </p>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-blue-700">Internal Use Only</h3>
                  <p className="text-gray-600 mt-1">
                    Information meant for employees and contractors only, but would pose minimal risk if disclosed.
                    Examples include internal newsletters, non-sensitive emails, and general operational documents.
                  </p>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-yellow-700">Confidential</h3>
                  <p className="text-gray-600 mt-1">
                    Sensitive information that must be protected and would cause harm to the organization if disclosed.
                    Examples include financial records, business strategies, and intellectual property.
                  </p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-red-700">Highly Confidential</h3>
                  <p className="text-gray-600 mt-1">
                    Extremely sensitive information that would cause severe damage if disclosed.
                    Examples include customer PII, authentication credentials, and trade secrets.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Best Practices</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Always mark documents with their classification level</li>
                <li>When in doubt, assign a higher level of classification</li>
                <li>Regularly review and reclassify information as needed</li>
                <li>Follow appropriate handling procedures for each level</li>
                <li>Report any potential security breaches immediately</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-black mb-3">Classification Practice</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-black mb-4">
                  For each scenario, select the appropriate security classification level:
                </p>
                
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">Scenario 1:</p>
                    <p className="text-black mb-4">
                      A document describing the company's standard operating procedures for handling customer support tickets.
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
                            className="form-radio text-purple h-5 w-5"
                          />
                          <span className="text-black capitalize">{level.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">Scenario 2:</p>
                    <p className="text-black mb-4">
                      A spreadsheet containing customer names, addresses, and purchase history.
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
                            className="form-radio text-purple h-5 w-5"
                          />
                          <span className="text-black capitalize">{level.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">Scenario 3:</p>
                    <p className="text-black mb-4">
                      A file containing database passwords and API keys for the company's main services.
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
                            className="form-radio text-purple h-5 w-5"
                          />
                          <span className="text-black capitalize">{level.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="bg-purple text-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-opacity"
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

export default UnderstandingSecurityLevels;
