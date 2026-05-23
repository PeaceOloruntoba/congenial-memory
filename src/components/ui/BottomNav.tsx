import React from 'react';
import { Home, Grid, Gift, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/tasks', label: 'Tasks', icon: Grid },
    { to: '/reward', label: 'Reward', icon: Gift },
    { to: '/wallet', label: 'Wallet', icon: Wallet }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 sm:hidden">
      <div className="flex justify-between">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} className={({ isActive }) => `flex-1 text-center py-2 ${isActive ? 'text-amber-500' : 'text-gray-600'}`}>
            <it.icon className="mx-auto" />
            <div className="text-xs">{it.label}</div>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
