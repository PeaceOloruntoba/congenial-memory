import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Globe, ChevronDown } from "lucide-react";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data representing the "Trusted by over 72,602 people" avatars
  const trustAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF0] flex justify-center items-start">
      {/* Mobile Device Frame Container Mock */}
      <div className="w-full max-w-md min-h-screen bg-[#FFFDF0] flex flex-col relative shadow-2xl overflow-x-hidden font-sans">
        {/* Dynamic Marketing Navbar Banner Header */}
        <header className="w-full flex items-center justify-between px-4 pt-4 pb-3 bg-[#FFFDF0]">
          {/* Brand Identity Branding Logo Mark */}
          <div
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[3.5deg] border-[#F4C522] opacity-80 animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-[#1A6CFA]/15 border-[2.5deg] border-[#1A6CFA]"></div>
            </div>
            <span className="text-xl font-black text-[#0B2253] tracking-tight">
              rbit
            </span>
          </div>

          {/* Action Meta Handles: Language Selector & Access CTA */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-[#0C41A6] text-white text-[11px] font-bold px-3 py-2 rounded-lg transition-colors hover:bg-[#083182]">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            <button
              onClick={() => navigate("/auth/login")}
              className="bg-[#0C41A6] text-white text-[11px] font-bold px-3 py-2 rounded-lg tracking-wide border border-transparent shadow-xs hover:bg-[#083182] active:scale-95 transition-all cursor-pointer"
            >
              Get started
            </button>
          </div>
        </header>

        {/* Cinematic Main Ambient Presentation Background Section */}
        <div
          className="relative flex-1 w-full flex flex-col items-center pt-16 px-5 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11, 34, 83, 0.45) 0%, rgba(11, 34, 83, 0.1) 40%, rgba(11, 34, 83, 0.95) 100%), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80')`,
          }}
        >
          {/* Main Context Directives Headers */}
          <h1 className="text-[28px] font-serif font-semibold text-center leading-tight tracking-wide text-white drop-shadow-md max-w-sm">
            Experience The Magic Of Relaxation
          </h1>

          <p className="text-[12px] text-white/80 font-normal text-center mt-4 max-w-xs leading-relaxed tracking-wide">
            Indulge in the epitome of coastal living as you discover the
            breathtaking beauty and unparalleled tranquility of luxury.
          </p>

          {/* Social Proof Engagement Capsule Badge */}
          <div className="w-full max-w-[340px] bg-white/95 backdrop-blur-md rounded-full py-1.5 pl-2.5 pr-1.5 flex items-center justify-between mt-12 shadow-lg border border-white/20">
            <div className="flex items-center gap-2">
              {/* Stacked Proof Face Matrix */}
              <div className="flex -space-x-2 overflow-hidden">
                {trustAvatars.map((src, index) => (
                  <img
                    key={index}
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src={src}
                    alt="Network agent user verification"
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-500 font-semibold tracking-wide">
                Trusted by over{" "}
                <strong className="text-gray-900 font-extrabold">72,602</strong>{" "}
                people
              </span>
            </div>

            {/* Micro Interaction Execution Call */}
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-[#0A1D43] text-white text-[10px] font-extrabold px-4 py-2 rounded-full tracking-wider hover:bg-[#071530] transition-colors active:scale-95 cursor-pointer"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Global Network Partnerships Bottom Banner Segment */}
        <footer className="w-full bg-[#FFFDF0] pt-12 pb-16 flex flex-col items-center justify-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400/80 bg-gray-100/60 px-3 py-1 rounded-full">
            Trusted by
          </span>

          {/* Subordinate Brand Identity Monogram */}
          <div className="flex items-center gap-1 opacity-90 grayscale contrast-125 hover:grayscale-0 transition-all duration-300 cursor-pointer">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[2.5deg] border-[#F4C522]"></div>
              <div className="w-2 h-2 rounded-full bg-[#1A6CFA]/10 border-[1.5deg] border-[#1A6CFA]"></div>
            </div>
            <span className="text-sm font-black text-[#0B2253] tracking-tighter">
              rbitpedia
            </span>
          </div>
        </footer>

        {/* Pin Framework Floating Live Chat Action Anchor */}
        <button
          onClick={() =>
            alert("Connecting to system architecture service desk...")
          }
          className="absolute bottom-6 right-5 w-12 h-12 bg-[#1A6CFA] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-95 z-40 cursor-pointer border border-white/10"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-white/10" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#FFFDF0]">
              3
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
