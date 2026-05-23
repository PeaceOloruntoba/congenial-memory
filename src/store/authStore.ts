import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "../types/auth";
import { api } from "../lib/api";
import { toast } from "sonner";

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  login: (phone: string, pass: string) => Promise<boolean>;
  register: (
    phone: string,
    pass: string,
    inviteCode: string,
  ) => Promise<boolean>;
  logout: () => void;
  triggerProfileCompletion: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      login: async (phone, pass) => {
        set({ loading: true });
        const res = await api.login(phone, pass);
        set({ loading: false });
        if (res.success && res.user) {
          set({ user: res.user });
          toast.success(`Welcome back, ${res.user.name}`);
          return true;
        }
        toast.error("Invalid dynamic credentials");
        return false;
      },
      register: async (phone, pass, invite) => {
        set({ loading: true });
        const res = await api.register(phone, pass, invite);
        set({ loading: false });
        if (res.success && res.user) {
          set({ user: res.user });
          toast.success("Account provisioned successfully!");
          return true;
        }
        toast.error(res.error || "Registration failed");
        return false;
      },
      logout: () => {
        set({ user: null });
        toast.info("Session disconnected safely.");
      },
      triggerProfileCompletion: () => {
        set((state) => {
          if (!state.user) return state;
          const updated = { ...state.user, verified: true };
          api.updateDbUser(state.user.id, { verified: true });
          toast.success("Identity profile fully updated!");
          return { user: updated };
        });
      },
    }),
    { name: "orbit.auth.session" },
  ),
);
