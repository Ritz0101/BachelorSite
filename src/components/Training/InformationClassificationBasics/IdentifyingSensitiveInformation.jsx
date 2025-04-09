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

  const [scenario3Answers, setScenario3Answers] = useState({
    images: false,
    functionality: false,
    releaseDate: false,
    targetMarket: false,
    publicFeatures: false
  });

  const [scenario4Answers, setScenario4Answers] = useState({
    mergerTerms: false,
    timeline: false,
    financialDetails: false,
    companyName: false,
    annualReportInfo: false
  });

  const [scenario5Answers, setScenario5Answers] = useState({
    ipAddresses: false,
    firewallConfig: false,
    serverLocations: false,
    websiteUrl: false,
    softwareNames: false
  });

  const [feedback, setFeedback] = useState({
    show: false,
    messages: [],
    allCorrect: false
  });

  const [quizCompleted, setQuizCompleted] = useState(false);

  const navigate = useNavigate();

  const handleScenario1Change = (value) => {
    setScenario1Answers(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
    setFeedback({ show: false, messages: [], allCorrect: false });
  };

  const handleScenario2Change = (value) => {
    setScenario2Answers(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
    setFeedback({ show: false, messages: [], allCorrect: false });
  };

  const handleScenario3Change = (value) => {
    setScenario3Answers(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
    setFeedback({ show: false, messages: [], allCorrect: false });
  };

  const handleScenario4Change = (value) => {
    setScenario4Answers(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
    setFeedback({ show: false, messages: [], allCorrect: false });
  };

  const handleScenario5Change = (value) => {
    setScenario5Answers(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
    setFeedback({ show: false, messages: [], allCorrect: false });
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

    // Scenario 3 feedback
    if (!scenario3Answers.images) {
      messages.push("Produktbilder før lansering er sensitiv informasjon som kan skade konkurransefortrinn");
      allCorrect = false;
    }
    if (!scenario3Answers.functionality) {
      messages.push("Funksjonalitetsbeskrivelser av upubliserte produkter bør holdes konfidensielt");
      allCorrect = false;
    }
    if (!scenario3Answers.releaseDate) {
      messages.push("Release date is sensitive information as it reveals the timing of a product launch");
      allCorrect = false;
    }
    if (!scenario3Answers.targetMarket) {
      messages.push("Target market analysis is sensitive information as it reveals the intended market for a product");
      allCorrect = false;
    }
    if (!scenario3Answers.publicFeatures) {
      messages.push("Publicly announced features are sensitive information as they reveal the planned features of a product");
      allCorrect = false;
    }

    // Scenario 4 feedback
    if (!scenario4Answers.mergerTerms) {
      messages.push("Detailed merger terms are sensitive information as they reveal the specific terms of a merger");
      allCorrect = false;
    }
    if (!scenario4Answers.timeline) {
      messages.push("Timeline of the merger is sensitive information as it reveals the timing of a merger");
      allCorrect = false;
    }
    if (!scenario4Answers.financialDetails) {
      messages.push("Financial details are sensitive information as they reveal confidential financial information");
      allCorrect = false;
    }
    if (!scenario4Answers.companyName) {
      messages.push("The publicly known name of the company is sensitive information as it reveals the official name of a company");
      allCorrect = false;
    }
    if (!scenario4Answers.annualReportInfo) {
      messages.push("Information from the public annual report is sensitive information as it reveals publicly available information");
      allCorrect = false;
    }

    // Scenario 5 feedback
    if (!scenario5Answers.ipAddresses) {
      messages.push("IP-adresser kan brukes til å kartlegge nettverket og er sensitive");
      allCorrect = false;
    }
    if (!scenario5Answers.firewallConfig) {
      messages.push("Firewall configuration is sensitive information as it reveals the security setup of a company's network");
      allCorrect = false;
    }
    if (!scenario5Answers.serverLocations) {
      messages.push("Serverplasseringer er sikkerhetssensitiv informasjon");
      allCorrect = false;
    }
    if (!scenario5Answers.websiteUrl) {
      messages.push("The company's public website URL is sensitive information as it reveals the official website of a company");
      allCorrect = false;
    }
    if (!scenario5Answers.softwareNames) {
      messages.push("Names of common software programs used are sensitive information as they reveal the software used by a company");
      allCorrect = false;
    }

    setFeedback({
      show: true,
      messages: allCorrect 
        ? ["Excellent! You correctly identified all sensitive information while recognizing what information is not sensitive."]
        : messages,
      allCorrect: allCorrect
    });

    if (allCorrect) {
      setQuizCompleted(true);
    }
  };

  const handleCompletion = () => {
    markModuleComplete('1.2');
    navigate('/training/information-classification-basics/handling-classified-information');
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

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">Scenario 3:</p>
                    <p className="text-black mb-4">
                      A presentation containing information about an upcoming product launch, including product images, functionality descriptions, release date, target market, and publicly announced features.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario3"
                          value="images"
                          checked={scenario3Answers.images}
                          onChange={() => handleScenario3Change('images')}
                        />
                        <span className="text-black">Unreleased product images</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario3"
                          value="functionality"
                          checked={scenario3Answers.functionality}
                          onChange={() => handleScenario3Change('functionality')}
                        />
                        <span className="text-black">Detailed functionality descriptions</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario3"
                          value="releaseDate"
                          checked={scenario3Answers.releaseDate}
                          onChange={() => handleScenario3Change('releaseDate')}
                        />
                        <span className="text-black">Publicly announced release date</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario3"
                          value="targetMarket"
                          checked={scenario3Answers.targetMarket}
                          onChange={() => handleScenario3Change('targetMarket')}
                        />
                        <span className="text-black">Target market analysis</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario3"
                          value="publicFeatures"
                          checked={scenario3Answers.publicFeatures}
                          onChange={() => handleScenario3Change('publicFeatures')}
                        />
                        <span className="text-black">Publicly announced features</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">Scenario 4:</p>
                    <p className="text-black mb-4">
                      An email discussing a potential merger with another company, including terms, timeline, financial details, the name of the company, and information that has been mentioned in the annual report.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario4"
                          value="mergerTerms"
                          checked={scenario4Answers.mergerTerms}
                          onChange={() => handleScenario4Change('mergerTerms')}
                        />
                        <span className="text-black">Detailed merger terms</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario4"
                          value="timeline"
                          checked={scenario4Answers.timeline}
                          onChange={() => handleScenario4Change('timeline')}
                        />
                        <span className="text-black">Timeline of the merger</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario4"
                          value="financialDetails"
                          checked={scenario4Answers.financialDetails}
                          onChange={() => handleScenario4Change('financialDetails')}
                        />
                        <span className="text-black">Financial details</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario4"
                          value="companyName"
                          checked={scenario4Answers.companyName}
                          onChange={() => handleScenario4Change('companyName')}
                        />
                        <span className="text-black">The publicly known name of the company</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario4"
                          value="annualReportInfo"
                          checked={scenario4Answers.annualReportInfo}
                          onChange={() => handleScenario4Change('annualReportInfo')}
                        />
                        <span className="text-black">Information from the public annual report</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded mt-4">
                    <p className="text-black font-medium mb-3">Scenario 5:</p>
                    <p className="text-black mb-4">
                      A document describing the company's network architecture, including IP addresses, firewall configuration, server locations, the company's website URL, and the names of software programs used.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario5"
                          value="ipAddresses"
                          checked={scenario5Answers.ipAddresses}
                          onChange={() => handleScenario5Change('ipAddresses')}
                        />
                        <span className="text-black">Internal IP addresses</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario5"
                          value="firewallConfig"
                          checked={scenario5Answers.firewallConfig}
                          onChange={() => handleScenario5Change('firewallConfig')}
                        />
                        <span className="text-black">Firewall configuration</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario5"
                          value="serverLocations"
                          checked={scenario5Answers.serverLocations}
                          onChange={() => handleScenario5Change('serverLocations')}
                        />
                        <span className="text-black">Server locations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario5"
                          value="websiteUrl"
                          checked={scenario5Answers.websiteUrl}
                          onChange={() => handleScenario5Change('websiteUrl')}
                        />
                        <span className="text-black">The company's public website URL</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="form-checkbox text-purple h-5 w-5" 
                          name="scenario5"
                          value="softwareNames"
                          checked={scenario5Answers.softwareNames}
                          onChange={() => handleScenario5Change('softwareNames')}
                        />
                        <span className="text-black">Names of common software programs used</span>
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

export default IdentifyingSensitiveInformation;
