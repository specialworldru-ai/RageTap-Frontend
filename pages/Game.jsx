import { motion } from 'framer-motion';
import { useGameStore } from '../hooks/useGameStore'; // Импортируем наш хук

export default function Game() {
  const { balance, increment } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="text-gray-400 text-sm mb-1 uppercase tracking-widest">Твой баланс</div>
      <div className="text-5xl font-black mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {balance.toLocaleString()}
      </div>
      
      <motion.button 
        whileTap={{ scale: 0.95 }} 
        onClick={increment} // Добавили клик
        className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-600 to-purple-800 shadow-[0_0_50px_rgba(37,99,235,0.4)] flex items-center justify-center border-4 border-white/5"
      >
        <span className="text-8xl">💎</span>
      </motion.button>
    </div>
  );
}