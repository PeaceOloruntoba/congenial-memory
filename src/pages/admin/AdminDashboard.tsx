import React, { useEffect } from "react";
import { TrendingUp, ArrowDownRight, Users, Activity } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import { Card } from "../../components/ui/Card";

export const AdminDashboard: React.FC = () => {
  const { metrics, fetchAdminState } = useAdminStore();

  useEffect(() => {
    fetchAdminState();
  }, [fetchAdminState]);

  const analyticalCards = [
    {
      label: "Active Inbound Deposits",
      value: `€${metrics.activeDeposits.toLocaleString()}`,
      change: "+14.2%",
      icon: TrendingUp,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      label: "Processed Payout Clearances",
      value: `€${metrics.processedPayouts.toLocaleString()}`,
      change: "Audit OK",
      icon: ArrowDownRight,
      color: "text-[#1A6CFA] bg-blue-50",
    },
    {
      label: "Hydrated Optimization Agents",
      value: metrics.activeAgentsCount,
      change: "Live Nodes",
      icon: Users,
      color: "text-purple-500 bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-[#F8FAFC] min-h-screen">
      <div>
        <h3 className="text-xl font-black text-[#0B2253]">
          Operational Backoffice Dashboard
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Global analytical monitors over platform nodes and ledger escrows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {analyticalCards.map((card, idx) => (
          <Card
            key={idx}
            className="p-5 flex items-center justify-between shadow-orbit-card border border-gray-100"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                {card.label}
              </span>
              <span className="text-2xl font-black text-[#0B2253] block tracking-tight">
                {card.value}
              </span>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-bold">
                {card.change}
              </span>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}
            >
              <card.icon className="w-6 h-6" />
            </div>
          </Card>
        ))}
      </div>

      {/* Real-time Heartbeat System Status Area */}
      <Card className="p-5 flex items-center gap-4 bg-white border border-gray-100">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
        <div className="flex-1">
          <h4 className="text-xs font-bold text-[#0B2253] uppercase tracking-wide flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#1A6CFA]" /> Distributed
            Synchronization Engine
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">
            All internal mock instances are fully responding. Remote socket
            configurations match settings buffers securely.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
