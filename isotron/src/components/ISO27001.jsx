import React, { useState } from 'react';

function ISO27001() {
  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-custom-black mb-6">ISO 27001 Information</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Introduction to ISO 27001</h2>
              <p className="text-gray-600">
                ISO 27001 is an international standard for managing information security. It provides a framework for establishing, implementing, maintaining, and continually improving an information security management system (ISMS).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Key Components</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Information Security Policies</li>
                <li>Organization of Information Security</li>
                <li>Asset Management</li>
                <li>Access Control</li>
                <li>Cryptography</li>
                <li>Physical and Environmental Security</li>
                <li>Operations Security</li>
                <li>Communications Security</li>
                <li>System Acquisition, Development, and Maintenance</li>
                <li>Supplier Relationships</li>
                <li>Information Security Incident Management</li>
                <li>Information Security Aspects of Business Continuity Management</li>
                <li>Compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Benefits of ISO 27001</h2>
              <p className="text-gray-600">
                Implementing ISO 27001 helps organizations protect their information systematically and cost-effectively, through the adoption of an information security management system.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ISO27001;
