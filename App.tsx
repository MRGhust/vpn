import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import PurchasePage from './components/PurchasePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AiChatModal from './components/AiChatModal';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage';
import TutorialPage from './components/TutorialPage';
import type { User } from './types';
import * as api from './lib/data';

export type Page = 'home' | 'purchase' | 'login' | 'signup' | 'admin' | 'tutorial';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [isAiChatOpen, setAiChatOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // On app load, check for a logged-in session in sessionStorage
    const sessionUserJson = sessionStorage.getItem('currentUser');
    if (sessionUserJson) {
      setCurrentUser(JSON.parse(sessionUserJson));
    }
    // Initialize plans and admin user in localStorage if they don't exist
    api.initializeData();
  }, []);

  const navigate = (targetPage: Page) => setPage(targetPage);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    navigate('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    navigate('home');
  };

  const openAiChat = () => setAiChatOpen(true);
  const closeAiChat = () => setAiChatOpen(false);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onJoin={() => navigate('purchase')} onOpenAiChat={openAiChat} />;
      case 'purchase':
        return <PurchasePage onBack={() => navigate('home')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'signup':
        return <SignupPage onSignup={handleLogin} onNavigate={navigate} />;
      case 'tutorial':
        return <TutorialPage onBack={() => navigate('home')} />;
      case 'admin':
        // Secure route: only show if user is admin
        if (currentUser?.isAdmin) {
          return <AdminPage onBack={() => navigate('home')} />;
        }
        // Redirect to home if not admin
        navigate('home');
        return <HomePage onJoin={() => navigate('purchase')} onOpenAiChat={openAiChat} />;
      default:
        return <HomePage onJoin={() => navigate('purchase')} onOpenAiChat={openAiChat} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-gray-200">
      <Header currentUser={currentUser} onLogout={handleLogout} onNavigate={navigate} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
      <AiChatModal isOpen={isAiChatOpen} onClose={closeAiChat} />
    </div>
  );
};

export default App;
