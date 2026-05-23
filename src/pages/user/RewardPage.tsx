import React from "react";
import { Gift, Copy, CheckCircle2, Users, Trophy } from "lucide-react";
import { toast } from "sonner";
import {Card} from "../../components/ui/Card";

export const RewardPage: React.FC = () => {
  const referralCode = "ORBIT_INV_77A0";

  const executeClipboardWrite = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Affiliate code duplicated to clipboard storage.");
  };

  return (
    <div className="p-5 space-y-5 bg-[#F4F7FC] min-h-screen">
      {/* Title Context Header */}
      <div>
        <h3 className="text-xl font-bold text-[#0B2253]">
          Affiliate Perks Portal
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Scale corporate network pipelines to acquire daily bonuses.
        </p>
      </div>

      {/* Main Feature Invitation Allocation Element Card */}
      <Card className="bg-orbit-header-gradient text-white border-none p-5 relative overflow-hidden">
        {/* Abstract vector backgrounds using gradients */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">
              Affiliate Multipliers
            </span>
            <h4 className="text-sm font-bold">Network Provisioning Rules</h4>
          </div>
        </div>

        <p className="text-xs text-white/80 leading-relaxed mb-4 font-medium">
          Distribute your unique allocation protocol code below. New nodes
          registering under your credential token unlock 10% commission
          multipliers on active properties.
        </p>

        {/* Input Copy Link Layout Module Container */}
        <div className="bg-[#0B2253]/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
          <code className="text-xs font-mono font-black tracking-widest pl-2 text-white/90">
            {referralCode}
          </code>
          <button
            onClick={executeClipboardWrite}
            className="bg-white text-[#1A6CFA] hover:bg-gray-50 px-3.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Code
          </button>
        </div>
      </Card>

      {/* Bonus Milestone Parameters Tree Tracker */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#0B2253] uppercase tracking-wider px-1">
          Milestone Threshold Allocations
        </h4>

        {[
          {
            title: "Invite 3 Qualified Active Users",
            desc: "Unlock Tier-2 High-Yield Hospitality Nodes",
            bonus: "€50.00 Extra",
            metric: "0 / 3 Done",
            icon: Users,
          },
          {
            title: "Cycle 100 Optimized Data Runs",
            desc: "Bonus base allocation multiplier pushed directly",
            bonus: "€120.00 Extra",
            metric: "Completed",
            icon: Trophy,
          },
        ].map((item, idx) => (
          <Card key={idx} className="p-4 flex items-start gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                item.metric === "Completed"
                  ? "bg-emerald-50 text-emerald-500"
                  : "bg-[#1A6CFA]/5 text-[#1A6CFA]"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h5 className="text-xs font-bold text-[#0B2253] truncate">
                  {item.title}
                </h5>
                <span className="text-[10px] font-black text-emerald-600 shrink-0 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  {item.bonus}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                {item.desc}
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                  {item.metric}
                </span>
                {item.metric === "Completed" && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardPage;
