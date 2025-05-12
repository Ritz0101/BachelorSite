import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BugIcon from './svg/bug.svg?react';
import IsotronLogo from './svg/isotron.svg?react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  
  const menuRef = useRef(null);
  const langMenuRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isLanguageOpen) setIsLanguageOpen(false);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsLanguageOpen(false);
  };
  
  // Determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-purple p-4 w-full z-50 shadow-md fixed top-0 left-0">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo and Home link */}
        <div className="flex items-center pl-1 w-1/4">
          <Link to="/" className="p-2 flex items-center group overflow-visible">
            <IsotronLogo className="h-10 min-w-[140px] text-custom-black transition-transform duration-300 group-hover:scale-110" />
          </Link>
        </div>
        
        {/* Main Navigation */}
        <div className="flex-grow flex items-center justify-center w-1/2">
          <div className="flex space-x-2">
            <Link 
              to="/guide" 
              className={`px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${isActive('/guide') ? 'bg-purple-200 font-semibold' : ''}`}
            >
              {t('nav_guide')}
            </Link>
            <Link 
              to="/training" 
              className={`px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${isActive('/training') ? 'bg-purple-200 font-semibold' : ''}`}
            >
              {t('nav_training')}
            </Link>
            <div className="relative" ref={menuRef}>
              <button 
                className={`flex items-center px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${isMenuOpen ? 'bg-purple-200' : ''}`} 
                onClick={toggleMenu}
              >
                {t('nav_more')}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu with proper animation */}
              <div 
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 origin-top-right ${
                  isMenuOpen 
                    ? 'opacity-100 scale-100 translate-y-0 visible' 
                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                }`}
              >
                <div className="py-1">
                  <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">{t('nav_about')}</Link>
                  <Link to="/iso27001" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">{t('nav_iso27001')}</Link>
                  <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">{t('nav_contact')}</Link>
                  <div className="border-t border-gray-200 mt-1 pt-1">
                    <a 
                      href="mailto:isotron@brannmurbrigaden.no?subject=Bug%20Report%20-%20Isotron&body=Please%20describe%20the%20bug%20you%20encountered%3A%0A%0ASteps%20to%20reproduce%3A%0A1.%20%0A2.%20%0A3.%20%0A%0ABrowser%20and%20system%20information%3A"
                      className="w-full text-left flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 bg-gray-50"
                    >
                      <BugIcon className="h-4 w-4 flex-none text-gray-500" />
                      <span>{t('nav_report_bug')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="relative w-1/4 flex justify-end" ref={langMenuRef}>
          <button 
            className="flex items-center bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 shadow-sm"
            onClick={toggleLanguageMenu}
            aria-expanded={isLanguageOpen}
            aria-haspopup="true"
          >
            {currentLanguage === 'en' && (
              <span className="flex items-center">
                <img src="/flag-en.svg" alt="" className="w-5 h-5 mr-2" />
                {t('lang_english')}
              </span>
            )}
            {currentLanguage === 'no' && (
              <span className="flex items-center">
                <img src="/flag-no.svg" alt="" className="w-5 h-5 mr-2" />
                {t('lang_norwegian')}
              </span>
            )}
            {currentLanguage === 'pl' && (
              <span className="flex items-center">
                <img src="/flag-pl.svg" alt="" className="w-5 h-5 mr-2" />
                {t('lang_polish')}
              </span>
            )}
            <svg 
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Language dropdown with improved animation */}
          <div 
            className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 origin-top-right ${
              isLanguageOpen 
                ? 'opacity-100 scale-100 translate-y-0 visible' 
                : 'opacity-0 scale-95 -translate-y-2 invisible'
            }`}
          >
            <div className="py-1">
              <button 
                onClick={() => handleLanguageChange('en')} 
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <img src="/flag-en.svg" alt="" className="w-5 h-5 mr-2" />
                {t('lang_english')}
              </button>
              <button 
                onClick={() => handleLanguageChange('no')} 
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <img src="/flag-no.svg" alt="" className="w-5 h-5 mr-2" />
                {t('lang_norwegian')}
              </button>
              <button 
                onClick={() => handleLanguageChange('pl')} 
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <img src="/flag-pl.svg" alt="" className="w-5 h-5 mr-2" />
                {t('lang_polish')}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;