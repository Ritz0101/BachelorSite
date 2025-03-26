import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BugIcon from './svg/bug.svg?react';
import IsotronLogo from './svg/isotron.svg?react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // Default language
  const location = useLocation();
  
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
    setLanguage(lang);
    setIsLanguageOpen(false);
    
    // If Polish is selected, add a class to the body for styling
    if (lang === 'pl') {
      document.body.classList.add('polish-mode');
    } else {
      document.body.classList.remove('polish-mode');
    }
  };
  
  // Determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-purple p-4 fixed top-0 w-full z-10 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo and Home link */}
        <div className="flex items-center">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center group">
            <IsotronLogo className="h-8 w-auto text-custom-black transition-transform duration-300 group-hover:scale-110" />
          </Link>
          <Link to="/" className={`ml-4 px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${isActive('/') ? 'bg-purple-200 font-semibold' : ''}`}>
            Home
          </Link>
        </div>
        
        {/* Main Navigation */}
        <div className="flex-grow flex items-center justify-center space-x-2">
          <Link 
            to="/guide" 
            className={`px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${isActive('/guide') ? 'bg-purple-200 font-semibold' : ''}`}
          >
            Classification Guide
          </Link>
          <Link 
            to="/training" 
            className={`px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${isActive('/training') ? 'bg-purple-200 font-semibold' : ''}`}
          >
            Training
          </Link>
          <div className="relative" ref={menuRef}>
            <button 
              className={`flex items-center px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${isMenuOpen ? 'bg-purple-200' : ''}`} 
              onClick={toggleMenu}
            >
              About 
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
                <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">About</Link>
                <Link to="/iso27001" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">ISO 27001</Link>
                <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">Contact</Link>
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button className="w-full text-left flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 bg-gray-50">
                    <BugIcon className="h-4 w-4 flex-none text-gray-500" />
                    <span>Meld feil på siden</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="relative" ref={langMenuRef}>
          <button 
            className="flex items-center bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 shadow-sm"
            onClick={toggleLanguageMenu}
            aria-expanded={isLanguageOpen}
            aria-haspopup="true"
          >
            {language === 'en' && (
              <span className="flex items-center">
                <img src="/flag-en.svg" alt="" className="w-5 h-5 mr-2" />
                English
              </span>
            )}
            {language === 'no' && (
              <span className="flex items-center">
                <img src="/flag-no.svg" alt="" className="w-5 h-5 mr-2" />
                Norsk
              </span>
            )}
            {language === 'pl' && (
              <span className="flex items-center">
                <img src="/flag-pl.svg" alt="" className="w-5 h-5 mr-2" />
                Polski
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
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 language-button"
              >
                <img src="/flag-en.svg" alt="" className="w-5 h-5 mr-2" />
                <span className="language-span">English</span>
              </button>
              <button 
                onClick={() => handleLanguageChange('no')} 
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 language-button"
              >
                <img src="/flag-no.svg" alt="" className="w-5 h-5 mr-2" />
                <span className="language-span">Norsk</span>
              </button>
              <button 
                onClick={() => handleLanguageChange('pl')} 
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 language-button"
              >
                <img src="/flag-pl.svg" alt="" className="w-5 h-5 mr-2" />
                <span className="language-span">Polski</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;