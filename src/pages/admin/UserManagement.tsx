import React, { useEffect, useState } from "react";
import {
  UserCheck,
  UserMinus,
  DollarSign,
  Settings,
} from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export const UserManagement: React.FC = () => {
  const {
    users,
    fetchAdminState,
    overrideUserFinancials,
    toggleUserAccessLock,
  } = useAdminStore();

  // Selected user contextual overlay tracking
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [balanceInput, setBalanceInput] = useState("");
  const [bonusInput, setBonusInput] = useState("");

  useEffect(() => {
    fetchAdminState();
  }, [fetchAdminState]);

  const handleOpenModifierDrawer = (
    id: string,
    currentBalance: number,
    currentBonus: number,
  ) => {
    setSelectedUserId(id);
    setBalanceInput(String(currentBalance));
    setBonusInput(String(currentBonus));
  };

  const handleSaveFinancialInjections = () => {
    if (!selectedUserId) return;
    overrideUserFinancials(
      selectedUserId,
      Number(balanceInput) || 0,
      Number(bonusInput) || 0,
    );
    setSelectedUserId(null);
  };

  return (
    <div className="space-y-6 p-6 bg-[#F8FAFC] min-h-screen">
      <div>
        <h3 className="text-xl font-black text-[#0B2253]">
          Agent Directory Grid
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Manage identity profiles, modify financial limits, and restrict system
          access.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Main Users Registry List */}
        <div className="xl:col-span-2 space-y-3">
          {users.map((agent) => (
            <Card
              key={agent.id}
              className={`p-5 bg-white border transition-all ${agent.isLocked ? "border-red-200 bg-red-50/10" : "border-gray-100"}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#0B2253]">
                      {agent.name}
                    </h4>
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded-sm text-gray-500 font-bold">
                      {agent.id}
                    </span>
                    {agent.isLocked && (
                      <span className="text-[9px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-md uppercase">
                        Suspended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    {agent.phone} • Registered:{" "}
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </p>

                  {/* Ledger Metrics Displays */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="text-xs">
                      <span className="text-gray-400">Working Cap: </span>
                      <span className="font-extrabold text-[#0B2253]">
                        €{agent.balance.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-400">Bonus Credits: </span>
                      <span className="font-extrabold text-[#1A6CFA]">
                        €{agent.bonus.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Command Button Links */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() =>
                      handleOpenModifierDrawer(
                        agent.id,
                        agent.balance,
                        agent.bonus,
                      )
                    }
                    className="p-2.5 border border-gray-200 hover:border-[#1A6CFA] text-[#0B2253] hover:text-[#1A6CFA] rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer bg-white"
                  >
                    <Settings className="w-3.5 h-3.5" /> Adjust
                  </button>
                  <button
                    onClick={() => toggleUserAccessLock(agent.id)}
                    className={`p-2.5 border rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      agent.isLocked
                        ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-white"
                        : "border-red-100 text-red-500 hover:bg-red-50 bg-white"
                    }`}
                  >
                    {agent.isLocked ? (
                      <UserCheck className="w-3.5 h-3.5" />
                    ) : (
                      <UserMinus className="w-3.5 h-3.5" />
                    )}
                    {agent.isLocked ? "Unlock" : "Lock"}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Financial Override Context Side-Tray Card */}
        {selectedUserId && (
          <Card className="p-5 bg-white border border-[#1A6CFA]/30 shadow-xl space-y-4 rounded-2xl sticky top-6 fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <DollarSign className="w-4 h-4 text-[#1A6CFA]" />
              <h4 className="text-xs font-black text-[#0B2253] uppercase tracking-wider">
                Financial Override Node ({selectedUserId})
              </h4>
            </div>

            <div className="space-y-3.5">
              <Input
                label="Inject Settled Wallet Balance (€)"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
              />
              <Input
                label="Inject Unlocked Bonus Reserves (€)"
                value={bonusInput}
                onChange={(e) => setBonusInput(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setSelectedUserId(null)}
                  className="py-3 border border-gray-200 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Dismiss
                </button>
                <Button
                  onClick={handleSaveFinancialInjections}
                  className="text-xs font-bold rounded-xl py-3 shadow-md shadow-[#1A6CFA]/10"
                >
                  Commit Capital Injection
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
