import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Şablonları aç"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>
            <div className="flex-shrink-0 flex items-center gap-3 ml-4">
              <Icon name="ai" className="h-10 w-10 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">Yapay Zeka Doküman Çıkarıcı</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;