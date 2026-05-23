import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/ui/BottomNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-slate-50 to-white">
      <header className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Workspace</h2>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
