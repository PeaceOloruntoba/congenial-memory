import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Layers, Trophy, Wallet } from "lucide-react";

export const BottomNav: React.FC = () => {
  const tabs = [
    { to: "/app/home", label: "Home", icon: Home },
    { to: "/app/tasks", label: "Tasks", icon: Layers },
    { to: "/app/reward", label: "Reward", icon: Trophy },
    { to: "/app/wallet", label: "Wallet", icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-50% -translate-x-50% w-full max-w-md bg-white border-t border-gray-100 py-2.5 px-6 flex justify-between items-center shadow-lg rounded-t-2xl z-50">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              isActive
                ? "text-[#1A6CFA] font-bold active-tab-dot"
                : "text-[#0B2253]/40 hover:text-[#0B2253]/70"
            }`
          }
        >
          <tab.icon
            className="w-5 h-5 mb-0.5 transition-transform active:scale-90"
            strokeWidth={2.2}
          />
          <span className="text-[10px] tracking-wide">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
