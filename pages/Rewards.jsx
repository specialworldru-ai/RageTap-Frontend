import { useState, useEffect } from 'react';
import { useGameStore } from '../hooks/useGameStore';

export default function Rewards() {
  const { balance, lastBonusTime, claimDailyBonus, claimAchievement, claimedAchievements } = useGameStore();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const nextBonus = lastBonusTime + 24 * 60 * 60 * 1000;
      const diff = nextBonus - now;
      if (diff <= 0) {
        setTimeLeft('Готов к получению!');
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${h}ч ${m}м ${s}с`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastBonusTime]);

  const tasks = [
    { id: 1, title: 'Первые шаги', desc: 'Набери 5,000 монет', goal: 5000, reward: 10000, titleUnlock: 'Новичок' },
    { id: 2, title: 'Активный тапер', desc: 'Набери 15,000 монет', goal: 15000, reward: 25000, titleUnlock: 'Тапер' },
    { id: 3, title: 'Серьезный капитал', desc: 'Набери 50,000 монет', goal: 50000, reward: 50000, titleUnlock: 'Инвестор' },
    { id: 4, title: 'Теневой магнат', desc: 'Набери 150,000 монет', goal: 150000, reward: 100000, titleUnlock: 'Магнат' },
    { id: 5, title: 'Миллионер', desc: 'Набери 1,000,000 монет', goal: 1000000, reward: 500000, titleUnlock: 'Миллионер' },
  ];

  return (
    <div className="flex flex-col p-6 h-full text-white overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Награды</h2>
      
      <div className="mb-8 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/30 text-center">
        <p className="text-sm text-purple-200 mb-2">Ежедневный бонус</p>
        <button 
          onClick={claimDailyBonus}
          disabled={timeLeft !== 'Готов к получению!'}
          className="w-full py-3 bg-purple-600 rounded-xl font-bold disabled:opacity-50 active:scale-95 transition-transform"
        >
          {timeLeft === 'Готов к получению!' ? 'Забрать 1,000 монет' : `Можно через: ${timeLeft}`}
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map(task => {
          const isDone = balance >= task.goal;
          const isClaimed = claimedAchievements.includes(task.id);
          // Расчет прогресса (от 0 до 100%)
          const progress = Math.min((balance / task.goal) * 100, 100);

          return (
            <div key={task.id} className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold">{task.title}</p>
                  <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider italic">
                    Титул: {task.titleUnlock}
                  </p>
                </div>
                <span className="text-yellow-400 font-bold">+{task.reward.toLocaleString()}</span>
              </div>

              {/* Полоска прогресса */}
              {!isClaimed && (
                <div className="w-full h-2 bg-black/40 rounded-full mb-3 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              
              <button 
                disabled={!isDone || isClaimed}
                onClick={() => claimAchievement(task.id, task.reward)}
                className={`w-full py-2 rounded-xl font-bold transition-all ${
                  isClaimed ? 'bg-green-600/20 text-green-400 border border-green-600' : 
                  isDone ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-700 opacity-50'
                }`}
              >
                {isClaimed ? 'Забрано' : isDone ? 'Забрать награду' : `${Math.floor(progress)}% завершено`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}