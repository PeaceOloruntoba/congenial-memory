import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Transaction, BoundAddress } from "../types/wallet";
import { toast } from "sonner";

interface WalletState {
  totalAsset: number;
  assetBalance: number;
  dividends: number;
  processingLocked: number;
  trialBonus: number;
  withdrawalPin: string | null;
  boundAddress: BoundAddress | null;
  history: Transaction[];

  addCommissionYield: (amount: number) => void;
  executeDeposit: (amount: number, network: "ERC20" | "TRC20") => void;
  processWithdrawalRequest: (amount: number) => boolean;
  configureWithdrawalPin: (pin: string) => void;
  savePayoutAddress: (addr: BoundAddress) => void;
  overrideBalancesFromAdmin: (balance: number, bonus: number) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      totalAsset: 442.5,
      assetBalance: 142.5,
      dividends: 0.0,
      processingLocked: 0.0,
      trialBonus: 300.0,
      withdrawalPin: null,
      boundAddress: null,
      history: [],

      addCommissionYield: (amount) => {
        set((state) => {
          const nextDividends = Number((state.dividends + amount).toFixed(2));
          const nextAsset = Number((state.assetBalance + amount).toFixed(2));
          const nextTotal = Number(
            (nextAsset + state.trialBonus + state.processingLocked).toFixed(2),
          );

          const tx: Transaction = {
            id: "TX-" + Math.floor(Math.random() * 90000 + 10000),
            type: "commission",
            amount,
            date: new Date().toLocaleDateString(),
          };

          return {
            dividends: nextDividends,
            assetBalance: nextAsset,
            totalAsset: nextTotal,
            history: [tx, ...state.history],
          };
        });
      },

      executeDeposit: (amount, network) => {
        set((state) => {
          const nextAsset = Number((state.assetBalance + amount).toFixed(2));
          const nextTotal = Number(
            (nextAsset + state.trialBonus + state.processingLocked).toFixed(2),
          );

          const tx: Transaction = {
            id: "DEP-" + Math.floor(Math.random() * 90000 + 10000),
            type: "deposit",
            amount,
            date: new Date().toLocaleDateString(),
            note: `Network: ${network}`,
          };

          return {
            assetBalance: nextAsset,
            totalAsset: nextTotal,
            history: [tx, ...state.history],
          };
        });
        toast.success(`Deposit of €${amount} processed!`);
      },

      processWithdrawalRequest: (amount) => {
        if (get().assetBalance < amount) {
          toast.error("Insufficient available user capital balance.");
          return false;
        }

        set((state) => {
          const nextAsset = Number((state.assetBalance - amount).toFixed(2));
          const nextTotal = Number(
            (nextAsset + state.trialBonus + state.processingLocked).toFixed(2),
          );

          const tx: Transaction = {
            id: "WTH-" + Math.floor(Math.random() * 90000 + 10000),
            type: "withdrawal",
            amount,
            date: new Date().toLocaleDateString(),
          };

          return {
            assetBalance: nextAsset,
            totalAsset: nextTotal,
            history: [tx, ...state.history],
          };
        });
        toast.success("Withdrawal request posted to audit desk.");
        return true;
      },

      configureWithdrawalPin: (pin) => {
        set({ withdrawalPin: pin });
        toast.success("Secondary withdrawal protection PIN committed.");
      },

      savePayoutAddress: (addr) => {
        set({ boundAddress: addr });
        toast.success("Crypto currency withdrawal network address bound.");
      },

      overrideBalancesFromAdmin: (balance, bonus) => {
        set((state) => {
          const total = Number(
            (balance + bonus + state.processingLocked).toFixed(2),
          );
          return {
            assetBalance: balance,
            trialBonus: bonus,
            totalAsset: total,
          };
        });
      },
    }),
    { name: "orbit.wallet.ledger" },
  ),
);
