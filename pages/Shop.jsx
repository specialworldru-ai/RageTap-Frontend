import { useGameStore } from '../hooks/useGameStore';

export default function Shop() {
  const { balance, clickPower, upgradeCost, buyUpgrade } = useGameStore();

  return (
    <div className="flex flex-col p-6 h-full text-white">
      <h2 className="text-2xl font-bold mb-6">Магазин силы</h2>
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Мощность клика: +{clickPower}</p>
          <p className="text-2xl font-bold text-blue-400">{upgradeCost.toLocaleString()} монет</p>
        </div>
        <button 
          onClick={buyUpgrade}
          disabled={balance < upgradeCost}
          className="bg-blue-600 px-6 py-3 rounded-xl font-bold disabled:opacity-30"
        >
          Купить
        </button>
      </div>
    </div>
  );
}