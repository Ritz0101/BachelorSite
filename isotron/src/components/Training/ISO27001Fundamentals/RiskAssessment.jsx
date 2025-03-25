import React from 'react';
import { Link } from 'react-router-dom';

function RiskAssessment() {
  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link to="/training/iso27001-fundamentals" className="text-purple hover:underline mb-4 inline-block">
            ← Back to ISO 27001 Fundamentals
          </Link>
          <h1 className="text-3xl font-bold text-custom-black mb-4">Risk Assessment</h1>
          
          <div className="space-y-8 mt-6">
            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Course Overview</h2>
              <p className="text-gray-600 mb-4">
                This course covers the process of identifying, analyzing, and evaluating risks related
                to information security as required by ISO 27001.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Coming Soon</h2>
              <p className="text-gray-600">
                This course is under development and will be available soon. Check back later!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskAssessment;
