import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center"><h1 className="text-2xl font-bold">Congenial Memory</h1></div>
        <div className="bg-white p-6 rounded-xl shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
