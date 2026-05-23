import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { api, type UserProfile } from '../lib/api';
import { toast } from 'sonner';

type AuthState = {
  user?: UserProfile | null;
  token?: string | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  register: (phone: string, password: string, invite?: string) => Promise<void>;
  setUser: (u?: UserProfile | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      user: null,
      token: null,
      loading: false,
      setUser: (u) => set({ user: u }),
      login: async (phone, password) => {
        set({ loading: true });
        try {
          const res = await api.login(phone, password);
          if (res.success) {
            set({ user: res.user, token: 'mock-token' });
            toast.success('Logged in');
          }
        } catch (e) {
          toast.error('Login failed');
        } finally {
          set({ loading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null });
        toast('Logged out');
      },
      register: async (phone, password, invite) => {
        set({ loading: true });
        try {
          const res = await api.register(phone, password, invite);
          if (res.success) {
            set({ user: res.user, token: 'mock-token' });
            toast.success('Registration successful');
          }
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: 'congenial.auth' }
  )
);
