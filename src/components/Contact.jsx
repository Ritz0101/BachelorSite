import React from 'react';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-light-purple pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section with Gradient Background */}
        <div className="bg-gradient-to-r from-purple to-light-purple rounded-lg shadow-lg p-8 mb-10 transform hover:scale-[1.01] transition-all duration-300">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('contact_us_title')}</h1>
          <p className="text-lg text-gray-700">
            {t('contact_us_description')}
          </p>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('get_in_touch_title')}</h2>
              <p className="text-gray-600 mb-6">{t('get_in_touch_description')}</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{t('email_title')}</p>
                    <p className="text-sm text-gray-500">info@isotron.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{t('phone_title')}</p>
                    <p className="text-sm text-gray-500">+47 123 45 678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{t('address_title')}</p>
                    <p className="text-sm text-gray-500">
                      Høyskolen Kristiania<br />
                      Prinsens gate 7-9<br />
                      0252 Oslo
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('name_title')}</label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring-purple"
                    placeholder={t('name_placeholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email_title')}</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring-purple"
                    placeholder={t('email_placeholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">{t('subject_title')}</label>
                  <input
                    type="text"
                    id="subject"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring-purple"
                    placeholder={t('subject_placeholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('message_title')}</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring-purple"
                    placeholder={t('message_placeholder')}
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple"
                  >
                    {t('submit_button ')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 