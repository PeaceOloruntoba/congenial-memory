import { create } from "zustand";
import { api } from "../lib/api";
import { useWalletStore } from "./walletStore";
import { useTaskStore } from "./taskStore";
import type { PerformanceMetrics } from "../types/admin/dashboard";
import type { SystemPlatformSettings } from "../types/admin/taskControls";
import type { AdminManagedUser } from "../types/admin/userManagement";
import type { SystemAuditEntry } from "../types/admin/auditLog";
import { toast } from "sonner";

interface AdminState {
  metrics: PerformanceMetrics;
  settings: SystemPlatformSettings;
  users: AdminManagedUser[];
  auditLogs: SystemAuditEntry[];
  isLoading: boolean;

  fetchAdminState: () => void;
  commitSettingsUpdate: (patch: Partial<SystemPlatformSettings>) => void;
  overrideUserFinancials: (
    userId: string,
    balance: number,
    bonus: number,
  ) => void;
  toggleUserAccessLock: (userId: string) => void;
  appendAuditLog: (entry: Omit<SystemAuditEntry, "id" | "timestamp">) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  metrics: {
    activeDeposits: 142450.0,
    processedPayouts: 89310.0,
    activeAgentsCount: 452,
    systemVolume: 231760.0,
  },
  settings: {
    commissionMultiplier: 0.108,
    maxDailyTasks: 25,
    requireKycForWithdrawal: true,
  },
  users: [],
  auditLogs: [],
  isLoading: false,

  fetchAdminState: () => {
    set({ isLoading: true });

    // Core parameters from our sync API layer
    const liveSettings = api.getAdminSettings();
    const rawUsers = api.getDbUsers();

    // Parse records into operational admin schemas
    const parsedUsers: AdminManagedUser[] = Object.values(rawUsers).map(
      (u: any) => ({
        id: u.id,
        phone: u.phone,
        name: u.name,
        verified: u.verified,
        createdAt: u.createdAt,
        role: u.role,
        balance: u.balance ?? 0,
        bonus: u.bonus ?? 0,
        isLocked: u.isLocked ?? false,
      }),
    );

    // Generate hydration structural entry
    const localLogs = localStorage.getItem("orbit_audit_trail");
    const parsedLogs: SystemAuditEntry[] = localLogs
      ? JSON.parse(localLogs)
      : [
          {
            id: "LOG-001",
            timestamp: new Date().toLocaleTimeString(),
            actor: "System Core",
            actionType: "SETTINGS_CHANGED",
            description: "System base variables hydrated successfully.",
          },
        ];

    set({
      settings: {
        commissionMultiplier: liveSettings.commissionMultiplier,
        maxDailyTasks: liveSettings.maxDailyTasks,
        requireKycForWithdrawal: true,
      },
      users: parsedUsers,
      auditLogs: parsedLogs,
      isLoading: false,
    });
  },

  commitSettingsUpdate: (patch) => {
    set((state) => {
      const updatedSettings = { ...state.settings, ...patch };

      // Save directly to the persistence registry layer
      api.updateAdminSettings(
        updatedSettings.commissionMultiplier,
        updatedSettings.maxDailyTasks,
      );

      // Instantly synchronize the consumer task store boundaries
      useTaskStore.getState().syncAdminLimits();

      return { settings: updatedSettings };
    });

    get().appendAuditLog({
      actor: "Platform Admin",
      actionType: "SETTINGS_CHANGED",
      description: `Updated constraints: Multiplier=${patch.commissionMultiplier ?? get().settings.commissionMultiplier}, MaxTasks=${patch.maxDailyTasks ?? get().settings.maxDailyTasks}`,
    });

    toast.success("Core node configuration settings pushed.");
  },

  overrideUserFinancials: (userId, balance, bonus) => {
    api.updateDbUser(userId, { balance, bonus });

    // If the administrator is mutating the active user session, hot reload consumer engine values
    const currentUserSession = useWalletStore.getState();
    if (currentUserSession) {
      useWalletStore.getState().overrideBalancesFromAdmin(balance, bonus);
    }

    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, balance, bonus } : u,
      ),
    }));

    get().appendAuditLog({
      actor: "Platform Admin",
      actionType: "BALANCE_OVERRIDE",
      description: `Injected financial parameters to Account [${userId}]: Cap Balance=€${balance}, Bonus Grants=€${bonus}`,
    });

    toast.success(`Dispatched €${balance} balance injection parameters.`);
  },

  toggleUserAccessLock: (userId) => {
    let actionLabel: "USER_LOCK" | "USER_UNLOCK" = "USER_LOCK";

    set((state) => {
      const targetUser = state.users.find((u) => u.id === userId);
      if (!targetUser) return state;

      const nextLockState = !targetUser.isLocked;
      actionLabel = nextLockState ? "USER_LOCK" : "USER_UNLOCK";

      api.updateDbUser(userId, { isLocked: nextLockState } as any);

      return {
        users: state.users.map((u) =>
          u.id === userId ? { ...u, isLocked: nextLockState } : u,
        ),
      };
    });

    get().appendAuditLog({
      actor: "Platform Admin",
      actionType: actionLabel,
      description: `Toggled core structural gate values on runtime profile target [${userId}]`,
    });

    toast.info(`Updated clearance permissions for [${userId}].`);
  },

  appendAuditLog: (entry) => {
    const logItem: SystemAuditEntry = {
      ...entry,
      id: "LOG-" + Math.floor(Math.random() * 90000 + 10000),
      timestamp: new Date().toLocaleTimeString(),
    };

    set((state) => {
      const nextLogs = [logItem, ...state.auditLogs];
      localStorage.setItem("orbit_orbit_trail", JSON.stringify(nextLogs));
      return { auditLogs: nextLogs };
    });
  },
}));
