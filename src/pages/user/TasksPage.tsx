import React, { useState } from "react";
import { Layers, Loader2, Star, ShieldCheck, HelpCircle } from "lucide-react";
import { useTaskStore } from "../../store/taskStore";
import { useWalletStore } from "../../store/walletStore";
import {Card} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export const TasksPage: React.FC = () => {
  const {
    todayCount,
    maxDaily,
    getTask,
    activeMatch,
    submitActiveTask,
    clearActiveMatch,
    loadingMatch,
  } = useTaskStore();
  const { totalAsset, assetBalance, dividends, processingLocked } =
    useWalletStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFetchMatch = async () => {
    await getTask();
  };

  const handleCommitTask = () => {
    setIsProcessing(true);
    // Simulate high-performance remote synchronization loop execution
    setTimeout(() => {
      submitActiveTask();
      setIsProcessing(false);
    }, 1500);
  };

  // Safe percentage calculator avoiding structural division errors
  const usagePercentage = Math.min(
    100,
    Math.floor((todayCount / maxDaily) * 100),
  );

  return (
    <div className="p-5 space-y-5 bg-[#F4F7FC] min-h-screen">
      {/* Title Header Area */}
      <div>
        <h3 className="text-xl font-bold text-[#0B2253]">
          Optimization Terminal
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Submit evaluation signatures into live hospitality servers.
        </p>
      </div>

      {/* Grid Allocation Framework Telemetry Block */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Total Asset Worth",
            value: `€${totalAsset.toFixed(2)}`,
            color: "text-[#0B2253]",
          },
          {
            label: "Available Working Cap",
            value: `€${assetBalance.toFixed(2)}`,
            color: "text-[#1A6CFA]",
          },
          {
            label: "Dividends Generated",
            value: `€${dividends.toFixed(2)}`,
            color: "text-emerald-600",
          },
          {
            label: "Processing Locks",
            value: processingLocked,
            color: "text-purple-600",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 shadow-orbit-card border border-gray-100/50"
          >
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              {item.label}
            </span>
            <span
              className={`text-base font-black tracking-tight mt-1 block ${item.color}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Real-time Dynamic Progress Framework Bar */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B2253] uppercase tracking-wide">
            <Layers className="w-4 h-4 text-[#1A6CFA]" /> Progress Matrix
          </div>
          <span className="text-xs font-black text-[#1A6CFA]">
            {todayCount} / {maxDaily} Entries
          </span>
        </div>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-orbit-header-gradient h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </Card>

      {/* Execution Deployment Anchor Control Button */}
      <div className="pt-2">
        <Button
          onClick={handleFetchMatch}
          fullWidth={true}
          disabled={loadingMatch || todayCount >= maxDaily}
          className="relative py-4 text-sm tracking-wide font-bold uppercase overflow-hidden group shadow-lg"
        >
          {loadingMatch ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Fetching Server Match
              Node...
            </span>
          ) : todayCount >= maxDaily ? (
            "Daily Processing Target Exhausted"
          ) : (
            "Deploy Server Optimization Match"
          )}
        </Button>
      </div>

      {/* Premium Luxury Order Match Modal Overlay */}
      {activeMatch && (
        <div className="fixed inset-0 bg-[#0B2253]/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 z-50 fade-in">
          <div className="bg-white rounded-t-[2rem] sm:rounded-3xl w-full max-w-md p-6 shadow-2xl border border-white/20 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Ribbon Bar Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] bg-[#1A6CFA]/10 text-[#1A6CFA] px-2.5 py-1 rounded-md font-bold tracking-widest uppercase">
                  Node Target Engaged
                </span>
                <h4 className="text-xs font-bold text-gray-400 mt-1 uppercase">
                  ID: {activeMatch.orderId}
                </h4>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-black">{activeMatch.rating}</span>
              </div>
            </div>

            {/* Core Destination Imagery */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-inner bg-gray-100 mb-4">
              <img
                src={activeMatch.propertyImage}
                alt={activeMatch.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#0B2253]/80 backdrop-blur-md px-3 py-1.5 rounded-xl">
                <p className="text-[11px] font-bold text-white tracking-wide">
                  {activeMatch.location} ({activeMatch.nights} Nights Stay)
                </p>
              </div>
            </div>

            {/* Target Core Description */}
            <h3 className="text-sm font-black text-[#0B2253] leading-snug mb-4">
              {activeMatch.title}
            </h3>

            {/* Financial Multiplier Audit Cards */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 border border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium">
                  Platform Base Book Cost
                </span>
                <span className="font-bold text-[#0B2253]">
                  €{activeMatch.baseValue.toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-gray-200/60" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium flex items-center gap-1">
                  Your Commission Yield{" "}
                  <HelpCircle className="w-3 h-3 text-gray-300" />
                </span>
                <span className="font-black text-emerald-600 text-sm">
                  +€{activeMatch.commission.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Informational Verification Footer Warning */}
            <p className="text-[10px] text-gray-400 font-medium text-center mt-3.5 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Escrow
              secured via direct corporate architecture layers.
            </p>

            {/* Operational System Action Button Triggers */}
            <div className="grid grid-cols-2 gap-3.5 mt-5">
              <button
                onClick={clearActiveMatch}
                disabled={isProcessing}
                className="w-full py-3.5 border border-gray-200 text-gray-500 rounded-2xl text-xs font-bold hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                Reject Order
              </button>
              <Button
                onClick={handleCommitTask}
                isLoading={isProcessing}
                className="w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md shadow-[#1A6CFA]/10"
              >
                Submit Node
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
