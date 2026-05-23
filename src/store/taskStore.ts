import {create} from 'zustand';
import { api, type TaskMatch } from '../lib/api';
import { toast } from 'sonner';

type TaskState = {
  todayCount: number;
  maxDaily: number;
  loadingMatch: boolean;
  history: TaskMatch[];
  getTask: () => Promise<TaskMatch | null>;
  submitTask: (match: TaskMatch) => void;
  setMaxDaily: (v: number) => void;
};

export const useTaskStore = create<TaskState>((set, get) => ({
  todayCount: 0,
  maxDaily: 25,
  loadingMatch: false,
  history: [],
  setMaxDaily: (v) => set({ maxDaily: v }),
  getTask: async () => {
    if (get().todayCount >= get().maxDaily) {
      toast.error('Daily limit reached');
      return null;
    }
    set({ loadingMatch: true });
    try {
      const match = await api.fetchTaskMatch();
      return match;
    } catch (e) {
      toast.error('No match available');
      return null;
    } finally {
      set({ loadingMatch: false });
    }
  },
  submitTask: (match) => {
    set((s) => ({ todayCount: s.todayCount + 1, history: [match, ...s.history] }));
    toast.success('Task completed');
  }
}));
