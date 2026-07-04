export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
  { id: 'game', icon: '🎮', name: 'Game' },
  { id: 'shop', icon: '⚡', name: 'Shop' },
  { id: 'rewards', icon: '🎁', name: 'Rewards' },
  { id: 'profile', icon: '👤', name: 'Profile' }, // Добавили
];

  return (
    <nav className="flex justify-around items-center p-4 bg-[#0a0a12]/80 backdrop-blur-xl border-t border-white/10">
      {tabs.map((tab) => (
        <button 
          key={tab.id} 
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 p-2 transition ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-600'}`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-[10px] uppercase font-bold">{tab.name}</span>
        </button>
      ))}
    </nav>
  );
}