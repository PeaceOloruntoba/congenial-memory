import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/ui/BottomNav";
import { MessageSquare } from "lucide-react";

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FC] flex justify-center items-start">
      {/* Mobile Frame Container Mock on Desktop */}
      <div className="w-full max-w-md min-h-screen bg-[#F4F7FC] flex flex-col relative pb-24 shadow-2xl shadow-[#0D49C0]/10 overflow-x-hidden">
        {/* Main Routed Content Space */}
        <main className="flex-1 w-full fade-in">
          <Outlet />
        </main>

        {/* Floating App Live Chat Handle */}
        <button
          onClick={() => alert("Connecting to service desk...")}
          className="fixed bottom-24 right-4 sm:absolute sm:right-4 w-12 h-12 bg-[#1A6CFA] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 z-40 cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              1
            </span>
          </div>
        </button>

        {/* Sticky Fixed Bottom Navigation Component */}
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;
