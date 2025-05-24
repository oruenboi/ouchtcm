import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';

const TopNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workshopsSubmenuOpen, setWorkshopsSubmenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleWorkshopsSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setWorkshopsSubmenuOpen(!workshopsSubmenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 mr-10">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://ouch.com.sg/wp-content/uploads/2022/05/ouch-logo-120x87.png" 
                  alt="Ouch Pte Ltd" 
                  className="h-12 w-auto"
                  width="120"
                  height="87" 
                  decoding="async"
                />
              </Link>
            </div>
            
            {/* Main Navigation */}
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a 
                    href="https://ouch.com.sg/" 
                    className={`px-2 py-2 text-sm font-medium flex items-center ${
                      isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ouch.com.sg/about/" 
                    className={`px-2 py-2 text-sm font-medium flex items-center ${
                      isActive('/about') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    About
                  </a>
                </li>
                <li className="relative">
                  <a 
                    href="https://ouch.com.sg/workshops/" 
                    className={`px-2 py-2 text-sm font-medium flex items-center ${
                      isActive('/workshops') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                    onClick={toggleWorkshopsSubmenu}
                  >
                    Workshops
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </a>
                  {/* Workshops Submenu */}
                  <ul className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                    workshopsSubmenuOpen ? 'block' : 'hidden'
                  }`}>
                    <li>
                      <a 
                        href="https://ouch.com.sg/corporate/" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Corporate
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://ouch.com.sg/community/" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Community
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a 
                    href="https://ouch.com.sg/blog/" 
                    className={`px-2 py-2 text-sm font-medium flex items-center ${
                      isActive('/blog') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <Link 
                    to="/tcm-5-elements" 
                    className={`px-2 py-2 text-sm font-medium flex items-center ${
                      isActive('/tcm-5-elements') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    Checklist
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://ouch.com.sg/tcm-9-body-constitutions/" 
                    className={`px-2 py-2 text-sm font-medium flex items-center ${
                      isActive('/') ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    Quiz
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ouch.com.sg/partners/" 
                    className={`px-2 py-2 text-sm font-medium flex items-center ${
                      isActive('/partners') ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="px-4 py-3 flex justify-between items-center">
          {/* Mobile Logo */}
          <div>
            <Link to="/">
              <img 
                src="https://ouch.com.sg/wp-content/uploads/2022/05/ouch-logo-120x87.png" 
                alt="Ouch Pte Ltd" 
                className="h-10 w-auto"
                width="120" 
                height="87"
                decoding="async"
              />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            type="button" 
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-accent focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} px-2 pt-2 pb-3 space-y-1 sm:px-3`}>
          <a 
            href="https://ouch.com.sg/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Home
          </a>
          <a 
            href="https://ouch.com.sg/about/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            About
          </a>
          <div>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={(e) => {
                e.preventDefault();
                setWorkshopsSubmenuOpen(!workshopsSubmenuOpen);
              }}
            >
              Workshops <ChevronDown className="inline-block ml-1 h-4 w-4" />
            </a>
            <div className={`pl-4 ${workshopsSubmenuOpen ? 'block' : 'hidden'}`}>
              <a 
                href="https://ouch.com.sg/corporate/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Corporate
              </a>
              <a 
                href="https://ouch.com.sg/community/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Community
              </a>
            </div>
          </div>
          <a 
            href="https://ouch.com.sg/blog/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Blog
          </a>
          <Link 
            to="/tcm-5-elements"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Checklist
          </Link>
          <a 
            href="https://ouch.com.sg/tcm-9-body-constitutions/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Quiz
          </a>
          <a 
            href="https://ouch.com.sg/partners/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Partners
          </a>
        </div>
      </div>
    </header>
  );
};

export default TopNav;