import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/ui/BottomNav";
import { MessageSquare } from "lucide-react";

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FC] flex justify-center items-start">
      {/* Mobile Frame Container Mock on Desktop */}
      <div className="w-full max-w-md min-h-screen bg-[#F4F7FC] flex flex-col relative pb-24 shadow-2xl shadow-[#0D49C0]/10 overflow-y-auto">
        {/* Main Routed Content Space */}
        <main className="flex-1 w-full fade-in">
          <Outlet />
        </main>

        {/* Floating App Live Chat Handle - Absolute Pin Framework Locking */}
        <button
          onClick={() =>
            alert("Connecting to system architecture service desk...")
          }
          className="absolute bottom-28 right-5 w-12 h-12 bg-[#1A6CFA] text-white rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-95 z-40 cursor-pointer border border-white/10"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#F4F7FC]">
              1
            </span>
          </div>
        </button>

        {/* Sticky Fixed Bottom Navigation Component */}
        <div className="absolute bottom-0 left-0 right-0 z-40">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
