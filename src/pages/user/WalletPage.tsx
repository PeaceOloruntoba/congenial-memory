import React, { useState } from "react";
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Link2,
  Key,
} from "lucide-react";
import { useWalletStore } from "../../store/walletStore";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { toast } from "sonner";

export const WalletPage: React.FC = () => {
  const {
    assetBalance,
    trialBonus,
    boundAddress,
    withdrawalPin,
    executeDeposit,
    processWithdrawalRequest,
    configureWithdrawalPin,
    savePayoutAddress,
  } = useWalletStore();

  // Deposit States
  const [depositAmount, setDepositAmount] = useState("");
  const [depositNetwork, setDepositNetwork] = useState<"ERC20" | "TRC20">(
    "TRC20",
  );

  // Bind States
  const [bindNetwork, setBindNetwork] = useState<"ERC20" | "TRC20">("TRC20");
  const [bindAddressInput, setBindAddressInput] = useState("");

  // Withdrawal States
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [entryPin, setEntryPin] = useState("");

  // Initial Setup PIN State
  const [newPin, setNewPin] = useState("");

  const handleDepositSubmit = () => {
    const parsed = Number(depositAmount);
    if (isNaN(parsed) || parsed <= 0)
      return toast.error("Please input a valid target number value.");
    executeDeposit(parsed, depositNetwork);
    setDepositAmount("");
  };

  const handleSaveBinding = () => {
    if (!bindAddressInput.trim())
      return toast.error("Address cannot remain empty.");
    savePayoutAddress({
      network: bindNetwork,
      address: bindAddressInput.trim(),
    });
    setBindAddressInput("");
  };

  const handleWithdrawalRequest = () => {
    if (!boundAddress)
      return toast.error(
        "Please bind your payout destination contract network first.",
      );
    if (!withdrawalPin)
      return toast.error("Please configure security PIN settings block.");
    if (entryPin !== withdrawalPin)
      return toast.error("Secondary authentication PIN string rejected.");

    const parsed = Number(withdrawAmount);
    if (isNaN(parsed) || parsed <= 0)
      return toast.error("Invalid target values input.");

    const triggered = processWithdrawalRequest(parsed);
    if (triggered) {
      setWithdrawAmount("");
      setEntryPin("");
    }
  };

  const handleRegisterPin = () => {
    if (newPin.trim().length !== 6)
      return toast.error("PIN length must equal exactly 6 numeric entries.");
    configureWithdrawalPin(newPin.trim());
    setNewPin("");
  };

  return (
    <div className="p-5 space-y-5 bg-[#F4F7FC] min-h-screen">
      {/* Title Header */}
      <div>
        <h3 className="text-xl font-bold text-[#0B2253]">Ledger Station</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Control funding reserves and request withdrawal processing pipelines.
        </p>
      </div>

      {/* Balance Assets Information Frame Card */}
      <Card className="bg-gradient-to-br from-[#0B2253] to-[#04112B] text-white border-none p-5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#1A6CFA]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
              Central Asset Reserves
            </span>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md text-white/70 font-mono">
            USDT Escrowed
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <span className="text-[11px] text-white/40 block font-medium">
              Withdrawable Balance
            </span>
            <span className="text-xl font-black tracking-tight text-white">
              €{assetBalance.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-white/40 block font-medium">
              Trial Grant Credit
            </span>
            <span className="text-base font-bold text-[#1A6CFA]">
              €{trialBonus.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* 1. Deposit Management Section */}
      <Card className="space-y-4">
        <h4 className="text-xs font-bold text-[#0B2253] uppercase tracking-wider flex items-center gap-1.5">
          <ArrowDownCircle className="w-4 h-4 text-[#1A6CFA]" /> Deploy Capital
          Inbound
        </h4>

        <div className="space-y-3">
          <Input
            placeholder="0.00"
            label="Input Value Base Amount (€)"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />

          {/* Quick Selection Hot-pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[20, 100, 500, 1500, 5000].map((val) => (
              <button
                key={val}
                onClick={() => setDepositAmount(String(val))}
                className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0B2253] hover:border-[#1A6CFA] transition-colors cursor-pointer"
              >
                +€{val}
              </button>
            ))}
          </div>

          {/* Network Selection Rows */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 block uppercase mb-1.5">
              Gateway Selection Ledger
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(["TRC20", "ERC20"] as const).map((net) => (
                <button
                  key={net}
                  onClick={() => setDepositNetwork(net)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    depositNetwork === net
                      ? "border-[#1A6CFA] bg-[#1A6CFA]/5 text-[#1A6CFA]"
                      : "border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  USDT-{net}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleDepositSubmit}
            fullWidth={true}
            className="text-xs uppercase font-bold py-3"
          >
            Initiate Secure Deposit Node
          </Button>
        </div>
      </Card>

      {/* 2. Withdrawal Management Station */}
      <Card className="space-y-4">
        <h4 className="text-xs font-bold text-[#0B2253] uppercase tracking-wider flex items-center gap-1.5">
          <ArrowUpCircle className="w-4 h-4 text-purple-600" /> Dispatch
          Outbound Capital
        </h4>

        {!withdrawalPin ? (
          /* Secondary security setup wrapper */
          <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-2 text-xs text-purple-900 font-medium">
              <Key className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  Configure Verification PIN
                </span>
                Configure a secondary numeric signature string to protect
                against unauthorized remote extractions.
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                maxLength={6}
                placeholder="6-Digit Security String"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0B2253] placeholder-gray-300 font-mono text-center outline-none flex-1 focus:border-purple-500"
              />
              <button
                onClick={handleRegisterPin}
                className="bg-purple-600 text-white font-bold text-xs px-4 rounded-xl hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Commit PIN
              </button>
            </div>
          </div>
        ) : (
          /* Main outbox entry cells */
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">
                Bound Extraction Address:
              </span>
              <span className="font-mono font-bold text-[#0B2253] max-w-[180px] truncate">
                {boundAddress
                  ? `(${boundAddress.network}) ${boundAddress.address}`
                  : "No destination targeted"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="0.00"
                label="Amount (€)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <Input
                type="password"
                maxLength={6}
                placeholder="••••••"
                label="Security PIN Code"
                value={entryPin}
                onChange={(e) => setEntryPin(e.target.value)}
              />
            </div>

            <Button
              onClick={handleWithdrawalRequest}
              variant="secondary"
              fullWidth={true}
              className="text-xs uppercase font-bold py-3 text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Post Outbound Request Signature
            </Button>
          </div>
        )}
      </Card>

      {/* 3. Crypto Payout Binding Address Drawer */}
      <Card className="space-y-4">
        <h4 className="text-xs font-bold text-[#0B2253] uppercase tracking-wider flex items-center gap-1.5">
          <Link2 className="w-4 h-4 text-emerald-500" /> Anchor Payout Protocols
        </h4>

        <div className="space-y-3.5">
          <div>
            <span className="text-[10px] font-bold text-gray-400 block uppercase mb-1">
              Contract Target Network
            </span>
            <select
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-xs text-[#0B2253] font-bold outline-none cursor-pointer"
              value={bindNetwork}
              onChange={(e) =>
                setBindNetwork(e.target.value as "ERC20" | "TRC20")
              }
            >
              <option value="TRC20">USDT Tether Protocol (TRC20 Core)</option>
              <option value="ERC20">
                USDT Tether Protocol (ERC20 Mainnet)
              </option>
            </select>
          </div>

          <Input
            label="Cryptocurrency Address Destination"
            placeholder="Paste raw hash token address..."
            value={bindAddressInput}
            onChange={(e) => setBindAddressInput(e.target.value)}
          />

          <Button
            onClick={handleSaveBinding}
            fullWidth={true}
            variant="secondary"
            className="text-xs uppercase font-bold py-3 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
          >
            Bind Extraction Network Node Address
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WalletPage;
