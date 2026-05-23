import {create} from 'zustand';

export type Transaction = {
  id: string;
  type: 'deposit' | 'withdraw' | 'bonus';
  amount: number;
  date: string;
  note?: string;
};

type WalletState = {
  balance: number;
  trialBonus: number;
  history: Transaction[];
  boundAddress?: { network: string; address: string; tag?: string } | null;
  deposit: (amount: number, kind?: string) => void;
  withdraw: (amount: number) => boolean;
  bindAddress: (network: string, address: string, tag?: string) => void;
};

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 120.5,
  trialBonus: 10,
  history: [],
  boundAddress: null,
  deposit: (amount) => {
    const tx = { id: 'tx' + Date.now(), type: 'deposit' as const, amount, date: new Date().toISOString() };
    set((s) => ({ balance: s.balance + amount, history: [tx, ...s.history] }));
  },
  withdraw: (amount) => {
    if (get().balance < amount) return false;
    const tx = { id: 'tx' + Date.now(), type: 'withdraw' as const, amount, date: new Date().toISOString() };
    set((s) => ({ balance: s.balance - amount, history: [tx, ...s.history] }));
    return true;
  },
  bindAddress: (network, address, tag) => set({ boundAddress: { network, address, tag } })
}));
