import React from "react";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex justify-center items-center p-5">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 text-center shadow-xl border border-gray-100/60 flex flex-col items-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-[#0B2253] tracking-tight">
          Node Address Unreachable
        </h3>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-xs">
          The structural path vector parameter you are targeting does not exist
          or has shifted locations inside the platform registry.
        </p>

        <button
          onClick={() => navigate("/app/home")}
          className="mt-6 w-full py-3.5 bg-orbit-header-gradient text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#0B2253]/10 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Terminal Hub
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
