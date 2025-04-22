import React, { createContext, useState, useEffect, useContext } from 'react';
import i18n from '../i18n';

// Create the context
export const LanguageContext = createContext();

// Create a hook for easy access to the context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Initialize state from localStorage or default to 'en'
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  // Change language function
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  // Set initial language on component mount
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  // Context value
  const value = {
    currentLanguage,
    changeLanguage,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'no', name: 'Norsk' },
      { code: 'pl', name: 'Polski' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 