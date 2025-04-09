import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTraining } from '../../../context/TrainingContext';

function IdentifyingSensitiveInformation() {
  const [scenario1Answers, setScenario1Answers] = useState({
    revenue: false,
    acquisition: false,
    marketing: false
  });

  const [scenario2Answers, setScenario2Answers] = useState({
    emergency: false,
    salary: false,
    performance: false
  });

  const [feedback, setFeedback] = useState({
    show: false,
    messages: []
  });

  const handleScenario1Change = (value) => {
    setScenario1Answers(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
    setFeedback({ show: false, messages: [] });
  };

  const handleScenario2Change = (value) => {
    setScenario2Answers(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
    setFeedback({ show: false, messages: [] });
  };

  const checkAnswers = () => {
    const messages = [];
    let allCorrect = true;

    // Scenario 1 feedback
    if (!scenario1Answers.revenue) {
      messages.push("Revenue projections are sensitive as they contain confidential financial data");
      allCorrect = false;
    }
    if (!scenario1Answers.acquisition) {
      messages.push("Customer acquisition costs reveal business strategy and financial information");
      allCorrect = false;
    }
    if (!scenario1Answers.marketing) {
      messages.push("Marketing strategy contains competitive business information");
      allCorrect = false;
    }

    // Scenario 2 feedback
    if (!scenario2Answers.emergency) {
      messages.push("Emergency contact information contains personal data protected by privacy laws");
      allCorrect = false;
    }
    if (!scenario2Answers.salary) {
      messages.push("Salary details are highly confidential personal information");
      allCorrect = false;
    }
    if (!scenario2Answers.performance) {
      messages.push("Performance reviews contain private employee evaluations");
      allCorrect = false;
    }

    setFeedback({
      show: true,
      messages: allCorrect 
        ? ["Excellent! You correctly identified all sensitive information. Each piece of information needs proper protection due to its confidential nature."]
        : messages
    });
  };

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/information-classification-basics" className="text-black hover:underline mb-4 inline-block">
            ← Back to Information Classification Basics
          </Link>
          <h1 className="text-3xl font-bold text-black mb-4">Identifying Sensitive Information</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Common Types of Sensitive Information</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Public Information</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>Published annual reports</li>
                    <li>Press releases</li>
                    <li>Public marketing materials</li>
                    <li>Contact information (general)</li>
                    <li>Product catalogs</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Internal Information</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>Internal procedures</li>
                    <li>Employee directories</li>
                    <li>Internal memos</li>
                    <li>Meeting minutes</li>
                    <li>Training materials</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Confidential Information</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>Employee records</li>
                    <li>Customer data</li>
                    <li>Financial reports</li>
                    <li>Business strategies</li>
                    <li>Contract details</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h3 className="text-xl font-medium text-black">Highly Confidential</h3>
                  <ul className="list-disc list-inside text-black mt-2">
                    <li>Trade secrets</li>
                    <li>Authentication credentials</li>
                    <li>Personal health information</li>
                    <li>Strategic acquisitions</li>
                    <li>Security infrastructure</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Key Indicators</h2>
              <p className="text-black mb-4">
                When evaluating information, consider these key questions:
              </p>
              <ul className="list-disc list-inside text-black space-y-2 ml-4">
                <li>Would this information benefit competitors?</li>
                <li>Could this information harm individuals if exposed?</li>
                <li>Is this information protected by law or regulations?</li>
                <li>Would disclosure damage the company's reputation?</li>
                <li>Is this information meant for internal use only?</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Practice Exercise</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-black mb-4">
                  Review the following scenarios and identify which information should be classified as sensitive. Select all that apply:
                </p>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">Scenario 1:</p>
                    <p className="text-black mb-4">
                      An email containing the company's quarterly revenue projections, customer acquisition costs, and marketing strategy.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          checked={scenario1Answers.revenue}
                          onChange={() => handleScenario1Change('revenue')}
                        />
                        <span className="text-black">Revenue projections</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          checked={scenario1Answers.acquisition}
                          onChange={() => handleScenario1Change('acquisition')}
                        />
                        <span className="text-black">Customer acquisition costs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          checked={scenario1Answers.marketing}
                          onChange={() => handleScenario1Change('marketing')}
                        />
                        <span className="text-black">Marketing strategy</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded">
                    <p className="text-black font-medium mb-3">Scenario 2:</p>
                    <p className="text-black mb-4">
                      A document with employee emergency contact information, salary details, and performance reviews.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          checked={scenario2Answers.emergency}
                          onChange={() => handleScenario2Change('emergency')}
                        />
                        <span className="text-black">Emergency contact information</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          checked={scenario2Answers.salary}
                          onChange={() => handleScenario2Change('salary')}
                        />
                        <span className="text-black">Salary details</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          checked={scenario2Answers.performance}
                          onChange={() => handleScenario2Change('performance')}
                        />
                        <span className="text-black">Performance reviews</span>
                      </label>
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
                      feedback.messages.length === 1 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      {feedback.messages.map((message, index) => (
                        <p key={index} className={`${
                          feedback.messages.length === 1 
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
                className="bg-purple text-black px-6 py-3 rounded-md hover:bg-opacity-90 transition-opacity"
                onClick={() => {
                  alert('Course completed! This would be recorded in your progress.');
                }}
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentifyingSensitiveInformation;
