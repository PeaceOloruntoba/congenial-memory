import React from "react";
import { Outlet } from "react-router-dom";
import { MessageSquare } from "lucide-react";

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCF6E4] px-5 py-8 relative font-sans fade-in">
      {/* Global Brand Header Area */}
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2253]">
          Orbit<span className="text-[#1A6CFA]">pedia</span>
        </h1>
        <p className="text-xs text-[#0B2253]/60 uppercase tracking-widest mt-1 font-semibold">
          Luxury Hospitality Portals
        </p>
      </div>

      {/* Main Authentication Card Shell */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-white/40">
        <Outlet />
      </div>

      {/* Persistent Floating Live Support Widget Button */}
      <button
        onClick={() => alert("Opening live chat support connection...")}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#1A6CFA] hover:bg-[#1255DB] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer z-50"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1A6CFA]">
            1
          </span>
        </div>
      </button>
    </div>
  );
};

export default AuthLayout;
