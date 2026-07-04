import { useGameStore } from '../hooks/useGameStore';

export default function Profile() {
  const { balance, claimedAchievements, activeTitle, equipTitle } = useGameStore();

  const titles = [
    { name: 'Новичок', reqId: null, style: 'text-white' },
    { name: 'Тапер', reqId: 1, style: 'text-blue-400' },
    { name: 'Активный тапер', reqId: 2, style: 'text-cyan-400' },
    { name: 'Инвестор', reqId: 3, style: 'text-green-500 font-bold' },
    { name: 'Магнат', reqId: 4, style: 'bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-700 font-bold tracking-widest' },
    { name: 'Миллионер', reqId: 5, isSpecial: true },
  ];

  // Считаем прогресс (кол-во разблокированных титулов)
  const unlockedCount = claimedAchievements.length;
  const totalCount = titles.length - 1; // -1, так как 'Новичок' доступен всегда
  const progressPercentage = Math.floor((unlockedCount / totalCount) * 100);

  const getTitleStyle = (t) => {
    if (t.isSpecial) return 'animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-500 to-purple-500 font-black';
    return t.style || 'text-white';
  };

  return (
    <div className="flex flex-col p-6 h-full text-white overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Профиль</h2>
      
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center mb-8">
        <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg shadow-blue-900/50">
          👤
        </div>
        <p className="text-gray-400 text-sm mb-1">Твой титул:</p>
        <h1 className={`text-3xl font-bold mb-4 ${getTitleStyle(titles.find(t => t.name === activeTitle) || {})}`}>
          {activeTitle}
        </h1>
        
        {/* Прогресс-бар коллекции титулов */}
        <div className="text-left mb-2">
           <div className="flex justify-between text-xs text-gray-400 mb-1">
             <span>Прогресс титулов</span>
             <span>{unlockedCount} / {totalCount}</span>
           </div>
           <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
               style={{ width: `${progressPercentage}%` }}
             />
           </div>
        </div>

        <p className="text-blue-400 mt-4 text-sm">Баланс: {balance.toLocaleString()} монет</p>
      </div>

      <h3 className="font-bold mb-4">Доступные титулы</h3>
      <div className="space-y-3">
        {titles.map(t => {
          const isUnlocked = t.reqId === null || claimedAchievements.includes(t.reqId);
          return (
            <button 
              key={t.name}
              disabled={!isUnlocked}
              onClick={() => equipTitle(t.name)}
              className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${
                !isUnlocked ? 'opacity-30 border-transparent bg-white/5' : 
                activeTitle === t.name ? 'border-blue-500 bg-blue-600/20' : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className={getTitleStyle(t)}>
                {t.name}
              </span>
              {activeTitle === t.name && <span className="text-blue-400 text-xs uppercase font-bold">Выбрано</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}