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