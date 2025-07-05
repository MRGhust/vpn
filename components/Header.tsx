import React from 'react';
import type { User } from '../types';
import type { Page } from '../App';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { ArrowLeftOnRectangleIcon } from './icons/ArrowLeftOnRectangleIcon';
import { ArrowRightOnRectangleIcon } from './icons/ArrowRightOnRectangleIcon';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onNavigate }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          آنتی سم پینگ
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('tutorial')} 
            className="hidden sm:inline-block text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
          >
            آموزش اتصال
          </button>
          {currentUser ? (
            <>
              {currentUser.isAdmin && (
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="hidden sm:inline-block text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  پنل ادمین
                </button>
              )}
              <div className="hidden sm:flex items-center gap-2 text-slate-400">
                <UserCircleIcon />
                <span>{currentUser.email}</span>
              </div>
              <button 
                onClick={onLogout} 
                className="flex items-center gap-2 bg-purple-600/50 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                aria-label="خروج"
              >
                <span className="hidden sm:inline">خروج</span>
                <ArrowLeftOnRectangleIcon />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('login')} 
                className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                 <ArrowRightOnRectangleIcon/>
                <span>ورود</span>
              </button>
              <button 
                onClick={() => onNavigate('signup')} 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                ثبت‌نام
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
