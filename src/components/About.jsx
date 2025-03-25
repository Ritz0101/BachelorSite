import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-custom-black mb-6">About This Project</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Bachelor Project Overview</h2>
              <p className="text-gray-600">
                This project is part of a bachelor thesis focused on improving information security awareness
                and classification practices. Isotron serves as an interactive platform to help users
                understand and implement proper information handling procedures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">ISO 27001 Integration</h2>
              <p className="text-gray-600 mb-4">
                Our project is built around the principles of ISO 27001, the international standard for information
                security management. This standard provides a framework for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Establishing and maintaining an information security management system (ISMS)</li>
                <li>Systematic approach to managing sensitive company information</li>
                <li>Risk assessment and treatment</li>
                <li>Security controls implementation</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Through Isotron, we aim to make ISO 27001 principles more accessible and easier to implement
                in day-to-day operations, focusing particularly on information classification and handling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Project Goals</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Develop an intuitive guide for information classification</li>
                <li>Create interactive training modules for security awareness</li>
                <li>Implement practical tools for day-to-day information handling</li>
                <li>Promote best practices in information security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Technologies Used</h2>
              <p className="text-gray-600">
                This application is built using modern web technologies including React, Tailwind CSS,
                and follows best practices for security and user experience design.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 