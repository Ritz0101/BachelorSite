import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  
  const teamMembers = [
    { name: "Jørgen Stranden" },
    { name: "Ask Eigil Borg" },
    { name: "Jakob Storaas" },
    { name: "Lauritz Pedersen" },
    { name: "Daniel Sandsdalen" }
  ];

  return (
    <div className="min-h-screen bg-light-purple pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section with Gradient Background */}
        <div className="bg-gradient-to-r from-purple to-light-purple rounded-lg shadow-lg p-8 mb-10 transform hover:scale-[1.01] transition-all duration-300">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('about.title')}</h1>
          <p className="text-lg text-gray-700">
            {t('about.subtitle')}
          </p>
        </div>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Project Overview */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {t('about.projectOverview')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('about.content')}
            </p>
          </div>

          {/* ISO 27001 Integration */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              {t('about.iso27001.title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('about.iso27001.description')}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>{t('about.iso27001.points.isms')}</li>
              <li>{t('about.iso27001.points.approach')}</li>
              <li>{t('about.iso27001.points.risk')}</li>
              <li>{t('about.iso27001.points.security')}</li>
            </ul>
          </div>
        </div>

        {/* Project Goals Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            {t('about.goals.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-light-purple rounded-lg p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="bg-purple rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{t('about.goals.classification.title')}</span>
              </div>
              <p className="text-gray-600 pl-10">{t('about.goals.classification.description')}</p>
            </div>
            
            <div className="bg-light-purple rounded-lg p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="bg-purple rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{t('about.goals.training.title')}</span>
              </div>
              <p className="text-gray-600 pl-10">{t('about.goals.training.description')}</p>
            </div>
            
            <div className="bg-light-purple rounded-lg p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="bg-purple rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{t('about.goals.tools.title')}</span>
              </div>
              <p className="text-gray-600 pl-10">{t('about.goals.tools.description')}</p>
            </div>
            
            <div className="bg-light-purple rounded-lg p-4 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="bg-purple rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{t('about.goals.practices.title')}</span>
              </div>
              <p className="text-gray-600 pl-10">{t('about.goals.practices.description')}</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            {t('about.team.title')}
          </h2>
          <p className="text-gray-600 mb-6 ml-8">{t('about.team.description')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-light-purple rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-md">
                <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-gray-800">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* Technologies Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            {t('about.technologies.title')}
          </h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              t('about.technologies.react'),
              t('about.technologies.tailwind'),
              t('about.technologies.javascript'),
              t('about.technologies.vite'),
              t('about.technologies.router')
            ].map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple rounded-full text-gray-800 font-medium transition-transform transition-shadow cursor-default hover:scale-[1.02] hover:shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-600">
            {t('about.technologies.description')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;