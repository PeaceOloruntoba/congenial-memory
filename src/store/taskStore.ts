import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TaskMatch } from "../types/task";
import { api } from "../lib/api";
import { useWalletStore } from "./walletStore";
import { toast } from "sonner";

interface TaskState {
  todayCount: number;
  maxDaily: number;
  loadingMatch: boolean;
  activeMatch: TaskMatch | null;
  history: (TaskMatch & { timestamp: string })[];
  getTask: () => Promise<void>;
  submitActiveTask: () => void;
  clearActiveMatch: () => void;
  syncAdminLimits: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      todayCount: 0,
      maxDaily: 25,
      loadingMatch: false,
      activeMatch: null,
      history: [],
      syncAdminLimits: () => {
        const config = api.getAdminSettings();
        set({ maxDaily: config.maxDailyTasks });
      },
      getTask: async () => {
        get().syncAdminLimits();
        if (get().todayCount >= get().maxDaily) {
          toast.error(
            `Daily processing limit of ${get().maxDaily} runs reached.`,
          );
          return;
        }
        set({ loadingMatch: true, activeMatch: null });
        try {
          const match = await api.fetchTaskMatch();
          set({ activeMatch: match });
        } catch {
          toast.error("Network matching failure");
        } finally {
          set({ loadingMatch: false });
        }
      },
      submitActiveTask: () => {
        const { activeMatch } = get();
        if (!activeMatch) return;

        // Route commission directly into the wallet ledger store state
        useWalletStore.getState().addCommissionYield(activeMatch.commission);

        const record = {
          ...activeMatch,
          timestamp: new Date().toLocaleTimeString(),
        };
        set((state) => ({
          todayCount: state.todayCount + 1,
          history: [record, ...state.history],
          activeMatch: null,
        }));

        toast.success("Task completed.");
      },
      clearActiveMatch: () => set({ activeMatch: null }),
    }),
    { name: "orbit.tasks.engine" },
  ),
);
