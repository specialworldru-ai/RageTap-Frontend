import { useState, useEffect } from 'react';

export const useGameStore = () => {
  const loadData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [balance, setBalance] = useState(() => loadData('balance', 12500));
  const [clickPower, setClickPower] = useState(() => loadData('clickPower', 1));
  const [upgradeCost, setUpgradeCost] = useState(() => loadData('upgradeCost', 100));
  const [lastBonusTime, setLastBonusTime] = useState(() => loadData('lastBonusTime', 0));
  const [claimedAchievements, setClaimedAchievements] = useState(() => loadData('claimed', []));
  // Добавляем активный титул
  const [activeTitle, setActiveTitle] = useState(() => loadData('activeTitle', 'Новичок'));

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
    localStorage.setItem('clickPower', JSON.stringify(clickPower));
    localStorage.setItem('upgradeCost', JSON.stringify(upgradeCost));
    localStorage.setItem('lastBonusTime', JSON.stringify(lastBonusTime));
    localStorage.setItem('claimed', JSON.stringify(claimedAchievements));
    localStorage.setItem('activeTitle', JSON.stringify(activeTitle));
  }, [balance, clickPower, upgradeCost, lastBonusTime, claimedAchievements, activeTitle]);

  const increment = () => {
    setBalance(prev => prev + clickPower);
  };

  const buyUpgrade = () => {
    if (balance >= upgradeCost) {
      setBalance(prev => prev - upgradeCost);
      setClickPower(prev => prev + 1);
      setUpgradeCost(prev => Math.floor(prev * 1.5));
    }
  };

  const claimDailyBonus = () => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (now - lastBonusTime >= twentyFourHours) {
      setBalance(prev => prev + 1000);
      setLastBonusTime(now);
      return true;
    }
    return false;
  };

  const claimAchievement = (id, rewardAmount) => {
    if (!claimedAchievements.includes(id)) {
      setBalance(prev => prev + rewardAmount);
      setClaimedAchievements(prev => [...prev, id]);
      return true;
    }
    return false;
  };

  // Функция для смены титула
  const equipTitle = (title) => {
    setActiveTitle(title);
  };

  return { 
    balance, 
    clickPower, 
    upgradeCost, 
    lastBonusTime, 
    claimedAchievements,
    activeTitle,       // Возвращаем активный титул
    increment, 
    buyUpgrade, 
    claimDailyBonus,
    claimAchievement,
    equipTitle         // Возвращаем функцию смены
  };
};