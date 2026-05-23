import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <div className="mb-6 text-xl font-bold">Admin</div>
        <nav className="space-y-2">
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'block font-medium text-amber-500' : 'block text-gray-700'}>Dashboard</NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'block font-medium text-amber-500' : 'block text-gray-700'}>Users</NavLink>
          <NavLink to="/admin/tasks" className={({ isActive }) => isActive ? 'block font-medium text-amber-500' : 'block text-gray-700'}>Tasks</NavLink>
          <NavLink to="/admin/audit" className={({ isActive }) => isActive ? 'block font-medium text-amber-500' : 'block text-gray-700'}>Audit</NavLink>
        </nav>
      </aside>
      <div className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
