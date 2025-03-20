import React, { useState } from 'react';

function ISO27001() {
  const [openIndices, setOpenIndices] = useState([]);

  const toggle = (index) => {
    setOpenIndices((prevOpenIndices) =>
      prevOpenIndices.includes(index)
        ? prevOpenIndices.filter((i) => i !== index)
        : [...prevOpenIndices, index]
    );
  };

  const components = [
    {
      title: 'Information Security Policies',
      description: 'Policies that define the approach to managing information security within the organization.'
    },
    {
      title: 'Organization of Information Security',
      description: 'The framework for managing information security responsibilities and processes.'
    },
    {
      title: 'Asset Management',
      description: 'Processes for managing and protecting information assets.'
    },
    {
      title: 'Access Control',
      description: 'Mechanisms to ensure that access to information is restricted to authorized users.'
    },
    {
      title: 'Cryptography',
      description: 'Use of cryptographic techniques to protect the confidentiality, integrity, and authenticity of information.'
    },
    {
      title: 'Physical and Environmental Security',
      description: 'Measures to protect physical facilities and equipment from unauthorized access and environmental hazards.'
    },
    {
      title: 'Operations Security',
      description: 'Controls to ensure the secure operation of information processing facilities.'
    },
    {
      title: 'Communications Security',
      description: 'Measures to protect the security of information in networks and communications.'
    },
    {
      title: 'System Acquisition, Development, and Maintenance',
      description: 'Processes to ensure that security is integrated into the lifecycle of information systems.'
    },
    {
      title: 'Supplier Relationships',
      description: 'Management of security risks related to suppliers and third-party service providers.'
    },
    {
      title: 'Information Security Incident Management',
      description: 'Processes for detecting, reporting, and responding to information security incidents.'
    },
    {
      title: 'Information Security Aspects of Business Continuity Management',
      description: 'Ensuring that information security is maintained during business disruptions.'
    },
    {
      title: 'Compliance',
      description: 'Ensuring adherence to legal, regulatory, and contractual obligations related to information security.'
    }
  ];

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
              <ul className="space-y-2 ml-4">
                {components.map((component, index) => (
                  <li key={index} className="cursor-pointer" onClick={() => toggle(index)}>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {openIndices.includes(index) ? '-' : '+'}
                      </span>
                      <span className="text-gray-600">
                        {component.title}
                      </span>
                    </div>
                    {openIndices.includes(index) && (
                      <p className="text-gray-600 mt-2 ml-6">
                        {component.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Understanding ISO 27001 Compliance for Data Storage</h2>
              <p className="text-gray-600 mb-4">
                ISO 27001 is an international security standard that helps organizations protect their data from risks. Key areas related to data storage compliance include:
              </p>
              <ul className="space-y-2 ml-4">
                {['Annex A.8 – Asset Management',
                  'Annex A.10 – Cryptography',
                  'Annex A.11 – Physical Security',
                  'Annex A.12 – Operations Security',
                  'Annex A.18 – Compliance']
                  .map((title, index) => (
                    <li key={index} className="cursor-pointer" onClick={() => toggle(index + components.length)}>
                      <div className="flex items-center">
                        <span className="mr-2">
                          {openIndices.includes(index + components.length) ? '-' : '+'}
                        </span>
                        <span className="text-gray-600">
                          {title}
                        </span>
                      </div>
                      {openIndices.includes(index + components.length) && (
                        <p className="text-gray-600 mt-2 ml-6">
                          {[
                            'Ensures that information assets are identified and managed appropriately throughout their lifecycle. This includes conducting a thorough assessment to identify all data assets within the organization and categorizing data based on sensitivity levels to apply appropriate protection measures.',
                            'Requires the use of cryptographic controls to protect data confidentiality, integrity, and authenticity. This involves encrypting data at rest and in transit, and developing robust key management policies to safeguard encryption keys.',
                            'Focuses on securing physical storage environments against unauthorized access and environmental threats. This includes ensuring secure storage locations for servers and hard drives, and implementing measures to protect physical facilities and equipment.',
                            'Addresses the secure management of information processing facilities, including change management and capacity planning. This involves setting up security controls for IT systems and ensuring the secure operation of information processing facilities.',
                            'Ensures adherence to legal, regulatory, and contractual obligations related to information security. This includes maintaining records of data deletion processes to demonstrate compliance during audits and ensuring that organizations follow legal regulations on data protection.'
                          ][index]}
                        </p>
                      )}
                    </li>
                  ))}
              </ul>
              <p className="text-gray-600 mt-4">
                As an employee, your role in compliance is to follow the organization's data security policies and report any unusual activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-custom-black mb-3">Benefits of ISO 27001</h2>
              <p className="text-gray-600">
                Implementing ISO 27001 helps organizations protect their information systematically and cost-effectively, through the adoption of an information security management system.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Prevents data breaches that expose personal or business-sensitive information.</li>
                <li>Avoids legal consequences due to non-compliance with regulations like ISO 27001 and GDPR.</li>
                <li>Reduces financial losses due to fines, lawsuits, or reputational damage.</li>
                <li>Maintains operational continuity by protecting against system failures or cyberattacks.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ISO27001;
