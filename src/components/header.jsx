import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BugIcon from "./svg/bug.svg?react";
import IsotronLogo from "./svg/isotron.svg?react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <header className="bg-purple p-4 fixed top-0 w-full z-10 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo and Home link */}
        <div className="flex items-center">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center group">
            <IsotronLogo className="h-8 w-auto text-black transition-transform duration-300 group-hover:scale-110 overflow-visible" />
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex-grow flex items-center justify-center space-x-2">
          <Link
            to="/guide"
            className={`px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${
              isActive("/guide") ? "bg-purple-200 font-semibold" : ""
            }`}
          >
            {t("navigation.guide")}
          </Link>
          <Link
            to="/training"
            className={`px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${
              isActive("/training") ? "bg-purple-200 font-semibold" : ""
            }`}
          >
            {t("navigation.training")}
          </Link>
          <div className="relative" ref={menuRef}>
            <button
              className={`flex items-center px-3 py-2 rounded-md text-gray-800 font-medium transition-colors duration-200 hover:bg-purple-200 ${
                isMenuOpen ? "bg-purple-200" : ""
              }`}
              onClick={toggleMenu}
            >
              {t("navigation.about")}
              <svg
                className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown menu with proper animation */}
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 origin-top-right ${
                isMenuOpen
                  ? "opacity-100 scale-100 translate-y-0 visible"
                  : "opacity-0 scale-95 -translate-y-2 invisible"
              }`}
            >
              <div className="py-1">
                <Link
                  to="/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  {t("navigation.about")}
                </Link>
                <Link
                  to="/iso27001"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  {t("navigation.iso27001")}
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  {t("navigation.contact")}
                </Link>
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button className="w-full text-left flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 bg-gray-50">
                    <BugIcon className="h-4 w-4 flex-none text-gray-500" />
                    <span>{t("navigation.reportBug")}</span>
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
            {currentLanguage === "en" && (
              <span className="flex items-center">
                <img src="/flag-en.svg" alt="" className="w-5 h-5 mr-2" />
                {t("language.en")}
              </span>
            )}
            {currentLanguage === "no" && (
              <span className="flex items-center">
                <img src="/flag-no.svg" alt="" className="w-5 h-5 mr-2" />
                {t("language.no")}
              </span>
            )}
            {currentLanguage === "pl" && (
              <span className="flex items-center">
                <img src="/flag-pl.svg" alt="" className="w-5 h-5 mr-2" />
                {t("language.pl")}
              </span>
            )}
            <svg
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                isLanguageOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Language dropdown with improved animation */}
          <div
            className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 origin-top-right ${
              isLanguageOpen
                ? "opacity-100 scale-100 translate-y-0 visible"
                : "opacity-0 scale-95 -translate-y-2 invisible"
            }`}
          >
            <div className="py-1">
              <button
                onClick={() => handleLanguageChange("en")}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 language-button"
              >
                <img src="/flag-en.svg" alt="" className="w-5 h-5 mr-2" />
                <span className="language-span">{t("language.en")}</span>
              </button>
              <button
                onClick={() => handleLanguageChange("no")}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 language-button"
              >
                <img src="/flag-no.svg" alt="" className="w-5 h-5 mr-2" />
                <span className="language-span">{t("language.no")}</span>
              </button>
              <button
                onClick={() => handleLanguageChange("pl")}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 language-button"
              >
                <img src="/flag-pl.svg" alt="" className="w-5 h-5 mr-2" />
                <span className="language-span">{t("language.pl")}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
