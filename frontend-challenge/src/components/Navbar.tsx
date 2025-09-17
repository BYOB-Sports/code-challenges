import React from 'react';

interface NavbarProps {
  showBackButton: boolean;
  onBack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ showBackButton, onBack }) => {
  return (
    <nav className="navbar bg-navy text-white py-3 md:py-4 sticky top-0 z-50 shadow-lg">
      <div className="container-wide flex justify-between items-center">
        <h1 className="nav-title text-xl md:text-2xl font-bold flex items-center gap-2">
          <i className="fas fa-tennis-ball"></i>
          Tennis Courts
        </h1>
        {showBackButton && (
          <button
            onClick={onBack}
            className="back-btn bg-white bg-opacity-20 hover:bg-opacity-30 border-none text-white p-2 rounded-lg cursor-pointer transition-all duration-200 tap-target"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        )}
      </div>
    </nav>
  );
};
