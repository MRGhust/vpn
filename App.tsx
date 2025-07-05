import React, { useState } from 'react';
import HomePage from './components/HomePage';
import PurchasePage from './components/PurchasePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AiChatModal from './components/AiChatModal';

type Page = 'home' | 'purchase';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [isAiChatOpen, setAiChatOpen] = useState(false);

  const navigateToPurchase = () => setPage('purchase');
  const navigateToHome = () => setPage('home');

  const openAiChat = () => setAiChatOpen(true);
  const closeAiChat = () => setAiChatOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {page === 'home' && <HomePage onJoin={navigateToPurchase} onOpenAiChat={openAiChat} />}
        {page === 'purchase' && <PurchasePage onBack={navigateToHome} />}
      </main>
      <Footer />
      <AiChatModal isOpen={isAiChatOpen} onClose={closeAiChat} />
    </div>
  );
};

export default App;
