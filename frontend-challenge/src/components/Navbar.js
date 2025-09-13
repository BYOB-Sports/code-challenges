import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownHover = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <nav className="bg-byob-yellow shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/byob_logo.avif" 
              alt="BYOB Sports Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Our Community */}
              <a
                href="#community"
                className="text-byob-green font-bold hover:text-byob-orange transition-colors duration-200 px-3 py-2 text-sm"
              >
                Our Community
              </a>

              {/* What We Do - Desktop Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleDropdownHover('whatWeDo')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="text-byob-green font-bold hover:text-byob-orange transition-colors duration-200 px-3 py-2 text-sm flex items-center">
                  What We Do
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'whatWeDo' && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 ease-in-out">
                    <a
                      href="#get-rated"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-byob-orange transition-colors duration-200"
                    >
                      Get Rated by a Pro
                    </a>
                    <a
                      href="#practice-partner"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-byob-orange transition-colors duration-200"
                    >
                      Have a Partner to Practice
                    </a>
                  </div>
                )}
              </div>

              {/* Contact Us - Desktop Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleDropdownHover('contactUs')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="text-byob-green font-bold hover:text-byob-orange transition-colors duration-200 px-3 py-2 text-sm flex items-center">
                  Contact Us
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'contactUs' && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-200 ease-in-out">
                    <a
                      href="#contact"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-byob-orange transition-colors duration-200"
                    >
                      Contact Us
                    </a>
                    <a
                      href="#coach-registration"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-byob-orange transition-colors duration-200"
                    >
                      Coach Registration
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-byob-green hover:text-byob-orange transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-md mt-2">
              {/* Our Community - Mobile */}
              <a
                href="#community"
                className="text-byob-green font-bold hover:text-byob-orange transition-colors duration-200 block px-3 py-2 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Community
              </a>

              {/* What We Do - Mobile Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('whatWeDo')}
                  className="text-byob-green font-bold hover:text-byob-orange transition-colors duration-200 w-full text-left px-3 py-2 text-base flex items-center justify-between"
                >
                  What We Do
                  <svg 
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      activeDropdown === 'whatWeDo' ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'whatWeDo' && (
                  <div className="pl-6 space-y-1">
                    <a
                      href="#get-rated"
                      className="text-gray-700 hover:text-byob-orange transition-colors duration-200 block px-3 py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Rated by a Pro
                    </a>
                    <a
                      href="#practice-partner"
                      className="text-gray-700 hover:text-byob-orange transition-colors duration-200 block px-3 py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Have a Partner to Practice
                    </a>
                  </div>
                )}
              </div>

              {/* Contact Us - Mobile Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('contactUs')}
                  className="text-byob-green font-bold hover:text-byob-orange transition-colors duration-200 w-full text-left px-3 py-2 text-base flex items-center justify-between"
                >
                  Contact Us
                  <svg 
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      activeDropdown === 'contactUs' ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'contactUs' && (
                  <div className="pl-6 space-y-1">
                    <a
                      href="#contact"
                      className="text-gray-700 hover:text-byob-orange transition-colors duration-200 block px-3 py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </a>
                    <a
                      href="#coach-registration"
                      className="text-gray-700 hover:text-byob-orange transition-colors duration-200 block px-3 py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Coach Registration
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;