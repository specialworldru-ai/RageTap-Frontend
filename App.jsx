import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import Shop from './pages/Shop';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile'; // Добавили импорт Profile
import Loader from './components/Loader';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState('game');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="h-screen w-full bg-[#050508] flex justify-center items-center">
      
      <div className="relative w-full h-full max-w-[480px] max-h-[900px] bg-[#050508] shadow-2xl overflow-hidden md:border-x border-white/10 md:rounded-[40px]">
        
        <AnimatePresence>
          {isLoading && <Loader />}
        </AnimatePresence>

        {!isLoading && (
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              {activeTab === 'game' && <Game />}
              {activeTab === 'shop' && <Shop />}
              {activeTab === 'rewards' && <Rewards />}
              {activeTab === 'profile' && <Profile />} {/* Добавили Profile */}
              
              {activeTab === 'leaders' && (
                <div className="flex items-center justify-center h-full text-gray-500 uppercase font-bold">
                  Leaders
                </div>
              )}
            </div>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
      </div>
    </div>
  );
}