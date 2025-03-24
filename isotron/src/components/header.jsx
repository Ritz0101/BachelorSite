import { useState } from 'react';
import { Link } from 'react-router-dom';
import BugIcon from './svg/bug.svg?react';
import IsotronLogo from './svg/isotron.svg?react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-purple p-4 fixed top-0 w-full z-10 shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Isotron</span>
            <IsotronLogo className="h-8 w-auto text-custom-black" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button type="button" onClick={toggleMenu} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-custom-black">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className={`hidden lg:flex lg:gap-x-12 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="relative">
            <button className="text-sm font-semibold text-custom-black" onClick={toggleMenu}>
              Isotron
            </button>
            <div className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="py-1">
                <Link to="/guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Guide</Link>
                <Link to="/training" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Training</Link>
                <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</Link>
                <a href="#" className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                  <BugIcon className="h-5 w-5 flex-none text-gray-400" />
                  Meld feil på siden
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold text-custom-black">Search <span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
    </header>
  );
}

export default Header;