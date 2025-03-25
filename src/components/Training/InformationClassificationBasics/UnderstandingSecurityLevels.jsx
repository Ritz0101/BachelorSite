import React from 'react';
import { Link } from 'react-router-dom';

function UnderstandingSecurityLevels() {
  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/information-classification-basics" className="text-purple hover:underline mb-4 inline-block">
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

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                className="bg-purple text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-opacity"
                onClick={() => {
                  // This would typically update the completion status and navigate to the next course or back to the module
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

export default UnderstandingSecurityLevels;
