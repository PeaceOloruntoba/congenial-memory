import React from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Award,
  Grid,
  ArrowUpRight,
  ChevronRight,
  User,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useWalletStore } from "../../store/walletStore";
import {Card} from "../../components/ui/Card";
import {Badge} from "../../components/ui/Badge";

export const HomePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const triggerVerification = useAuthStore((s) => s.triggerProfileCompletion);
  const { totalAsset, assetBalance } = useWalletStore();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F4F7FC]">
      {/* Curved Royal Blue Dynamic Header Banner */}
      <div className="bg-orbit-header-gradient text-white pt-7 pb-12 px-5 rounded-b-[2.5rem] shadow-lg relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] text-white/60 font-semibold uppercase tracking-wider">
                Welcome back
              </div>
              <h3 className="text-base font-bold tracking-tight">
                {user?.name || "Anastasia"}
              </h3>
            </div>
          </div>

          {/* Real-time Status Badge */}
          {user?.verified ? (
            <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Account
            </div>
          ) : (
            <button
              onClick={triggerVerification}
              className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold animate-pulse cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Complete KYC
            </button>
          )}
        </div>

        {/* Floating Quick Balance Capsule inside Header */}
        <div className="bg-[#0B2253]/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 mt-2 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-white/50 font-medium block uppercase tracking-wide">
              Combined Book Value
            </span>
            <span className="text-2xl font-black tracking-tight text-white">
              €
              {totalAsset.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-white/40 block font-medium">
              Liquid Balance
            </span>
            <span className="text-sm font-bold text-white/90">
              €
              {assetBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Body Grid Container */}
      <div className="px-5 -mt-6 space-y-5 z-10">
        {/* Core Actions Grid Selection */}
        <div className="grid grid-cols-2 gap-3.5">
          <Card className="flex items-center justify-between p-4 cursor-pointer group active:scale-95 transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A6CFA]/10 rounded-xl flex items-center justify-center text-[#1A6CFA]">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0B2253] block">
                  Data Portals
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  Optimize Nodes
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#1A6CFA] transition-colors" />
          </Card>

          <Card className="flex items-center justify-between p-4 cursor-pointer group active:scale-95 transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0B2253] block">
                  Tier Perks
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  Level 1 Active
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-purple-600 transition-colors" />
          </Card>
        </div>

        {/* KYC Incomplete Banner Prompt */}
        {!user?.verified && (
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Verification Missing
              </h4>
              <p className="text-xs text-amber-800/80 mt-0.5 leading-relaxed">
                Your profile verification is currently incomplete. To prevent
                account limits, tap below to submit your secure parameters.
              </p>
              <button
                onClick={triggerVerification}
                className="text-xs font-extrabold text-[#1A6CFA] mt-2 flex items-center gap-0.5 hover:underline cursor-pointer"
              >
                Submit credentials now <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Premium Portfolio Slider Carousel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-sm font-bold text-[#0B2253] uppercase tracking-wider">
              Premium Allocations
            </h4>
            <span className="text-xs font-bold text-[#1A6CFA] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none scroll-smooth">
            {[
              {
                id: 1,
                title: "Grand Hotel Wien",
                loc: "Vienna, AT",
                tag: "High-Yield",
                img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
              },
              {
                id: 2,
                title: "Hotel 1898 Barcelona",
                loc: "Catalonia, ES",
                tag: "Trending",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
              },
              {
                id: 3,
                title: "The Savoy Executive",
                loc: "London, UK",
                tag: "Exclusive",
                img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="min-w-[260px] max-w-[260px] bg-white rounded-3xl overflow-hidden shadow-orbit-card border border-gray-100/40 snap-start"
              >
                <div className="relative h-32 w-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant={item.tag === "High-Yield" ? "success" : "warn"}
                    >
                      {item.tag}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-xs text-[#0B2253] truncate">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {item.loc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
