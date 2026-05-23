import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Sliders,
  ShieldAlert,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

export const AdminLayout: React.FC = () => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[#F4F7FC] font-sans">
      {/* Desktop Dashboard Sidebar Drawer */}
      <aside className="w-64 bg-[#0B2253] text-white flex flex-col p-5 border-r border-[#0D49C0]/20 hidden md:flex">
        <div className="mb-8 px-2">
          <h2 className="text-xl font-black tracking-wide">
            ORBIT<span className="text-[#1A6CFA]">HQ</span>
          </h2>
          <p className="text-[10px] text-white/40 tracking-widest font-bold uppercase mt-0.5">
            Control Engine
          </p>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            {
              to: "/admin",
              label: "Dashboard",
              icon: LayoutDashboard,
              end: true,
            },
            {
              to: "/admin/users",
              label: "User Directory",
              icon: Users,
              end: false,
            },
            {
              to: "/admin/tasks",
              label: "Task Multipliers",
              icon: Sliders,
              end: false,
            },
            {
              to: "/admin/audit",
              label: "Financial Audit",
              icon: ShieldAlert,
              end: false,
            },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1A6CFA] text-white shadow-md shadow-[#1A6CFA]/20 font-bold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => {
            logout();
            navigate("/auth/login");
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full text-left mt-auto cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Exit Backoffice
        </button>
      </aside>

      {/* Internal Management Shell Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="text-sm font-semibold text-[#0B2253]">
            Systems Administrator Station
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1A6CFA]/10 flex items-center justify-center text-xs font-bold text-[#1A6CFA]">
            AD
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
