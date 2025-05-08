import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ISO27001() {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const components = [
    {
      id: 'policies',
      title: t('key_components_item1'),
      description: t('key_components_item1_description')
    },
    {
      id: 'organization',
      title: t('key_components_item2'),
      description: t('key_components_item2_description')
    },
    {
      id: 'assets',
      title: t('key_components_item3'),
      description: t('key_components_item3_description')
    },
    {
      id: 'access',
      title: t('key_components_item4'),
      description: t('key_components_item4_description')
    },
    {
      id: 'crypto',
      title: t('key_components_item5'),
      description: t('key_components_item5_description')
    },
    {
      id: 'physical',
      title: t('key_components_item6'),
      description: t('key_components_item6_description')
    }
  ];

  const annexes = [
    {
      id: 'annex8',
      title: t('annex8_title'),
      description: t('annex8_description')
    },
    {
      id: 'annex10',
      title: t('annex10_title'),
      description: t('annex10_description')
    },
    {
      id: 'annex11',
      title: t('annex11_title'),
      description: t('annex11_description')
    }
  ];

  const benefits = [
    t('iso_benefits_description_item1'),
    t('iso_benefits_description_item2'),
    t('iso_benefits_description_item3'),
    t('iso_benefits_description_item4')
  ];

  return (
    <div className="min-h-screen bg-light-purple pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Gradient Background */}
        <div className="bg-gradient-to-r from-purple to-light-purple rounded-lg shadow-lg p-8 mb-10 transform hover:scale-[1.01] transition-all duration-300">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('iso27001_framework_title')}</h1>
          <p className="text-lg text-gray-700">
            {t('iso27001_framework_description')}
          </p>
        </div>
        
        {/* Introduction Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {t('introduction_iso_title')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('introduction_iso_description')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {t('iso_benefits_title')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="ml-4">{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Key Components Grid */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            {t('key_components_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((component) => (
              <div 
                key={component.id}
                className="bg-light-purple rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => toggleItem(component.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{component.title}</h3>
                  <span className="text-purple">
                    {expandedItems[component.id] ? '−' : '+'}
                  </span>
                </div>
                {expandedItems[component.id] && (
                  <p className="text-gray-600 mt-2">{component.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Data Storage Compliance Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
            {t('iso_data_storage_title')}
          </h2>
          <div className="space-y-4">
            {annexes.map((annex) => (
              <div 
                key={annex.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple hover:shadow-md transition-all"
                onClick={() => toggleItem(annex.id)}
              >
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="font-semibold text-gray-800">{annex.title}</h3>
                  <span className="text-purple">
                    {expandedItems[annex.id] ? '−' : '+'}
                  </span>
                </div>
                {expandedItems[annex.id] && (
                  <p className="mt-2 text-gray-600">{annex.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Certification Steps Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
            {t('iso_data_storage_title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { step: 1, title: t('define_scope_title'), description: t('define_scope_description') },
              { step: 2, title: t('risk_assessment_title'), description: t('risk_assessment_description2') },
              { step: 3, title: t('implement_control_title'), description: t('implement_control_description') },
              { step: 4, title: t('train_employees_title'), description: t('train_employees_description') },
              { step: 5, title: t('internal_audit_title'), description: t('internal_audit_description') },
              { step: 6, title: t('certification_title'), description: t('certification_description') }
            ].map((item) => (
              <div key={item.step} className="bg-light-purple rounded-lg p-4 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-purple rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <span className="font-bold text-gray-800">{item.step}</span>
                  </div>
                  <span className="font-medium text-gray-800">{item.title}</span>
                </div>
                <p className="text-gray-600 ml-11">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ISO27001;