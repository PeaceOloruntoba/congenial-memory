import type { UserProfile, LoginResponse, RegisterResponse } from "../types/auth";
import type { TaskMatch } from "../types/task";

const delay = <T>(value: T, ms = 600): Promise<T> =>
  new Promise((res) => setTimeout(() => res(value), ms));

// Fallback image constants for luxury hospitality look-and-feel
const IMAGES = {
  vienna:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
  barcelona:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
};

// Seed administrative database defaults
const DEFAULT_USERS: Record<
  string,
  UserProfile & { balance: number; bonus: number }
> = {
  admin: {
    id: "admin",
    phone: "+1000000000",
    name: "Platform Admin",
    verified: true,
    createdAt: new Date().toISOString(),
    role: "admin",
    balance: 0,
    bonus: 0,
  },
  user1: {
    id: "user1",
    phone: "+32490000000",
    name: "Anastasia 👋",
    verified: false,
    createdAt: new Date().toISOString(),
    role: "user",
    balance: 142.5,
    bonus: 300.0,
  },
};

if (!localStorage.getItem("orbit_db_users")) {
  localStorage.setItem("orbit_db_users", JSON.stringify(DEFAULT_USERS));
}

export const api = {
  getAdminSettings: () => {
    const data = localStorage.getItem("orbit_admin_settings");
    return data
      ? JSON.parse(data)
      : { commissionMultiplier: 0.108, maxDailyTasks: 25 };
  },

  updateAdminSettings: (multiplier: number, maxTasks: number) => {
    localStorage.setItem(
      "orbit_admin_settings",
      JSON.stringify({
        commissionMultiplier: multiplier,
        maxDailyTasks: maxTasks,
      }),
    );
  },

  getDbUsers: (): Record<
    string,
    UserProfile & { balance: number; bonus: number }
  > => {
    return JSON.parse(localStorage.getItem("orbit_db_users") || "{}");
  },

  updateDbUser: (
    id: string,
    fields: Partial<UserProfile & { balance: number; bonus: number }>,
  ) => {
    const users = api.getDbUsers();
    if (users[id]) {
      users[id] = { ...users[id], ...fields };
      localStorage.setItem("orbit_db_users", JSON.stringify(users));
    }
  },

  login: async (phone: string, _pass: string): Promise<LoginResponse> => {
    const users = api.getDbUsers();
    const matched = Object.values(users).find((u) => u.phone === phone);
    if (matched) return delay({ success: true, user: { ...matched } }, 600);

    // Default fallback to auto-create standard profile if testing cleanly
    if (phone === "+12345678") {
      return delay({ success: true, user: users["admin"] }, 600);
    }
    return delay({ success: true, user: users["user1"] }, 600);
  },

  register: async (
    phone: string,
    _pass: string,
    _invite?: string,
  ): Promise<RegisterResponse> => {
    const id = "u_" + Math.floor(Math.random() * 9000 + 1000);
    const newUser = {
      id,
      phone,
      name: "Anastasia 👋",
      verified: false,
      createdAt: new Date().toISOString(),
      role: "user" as const,
      balance: 0,
      bonus: 300.0,
    };

    const users = api.getDbUsers();
    users[id] = newUser;
    localStorage.setItem("orbit_db_users", JSON.stringify(users));

    return delay(
      {
        success: true,
        user: {
          id,
          phone,
          name: newUser.name,
          verified: false,
          createdAt: newUser.createdAt,
          role: "user",
        },
      },
      800,
    );
  },

  fetchTaskMatch: async (): Promise<TaskMatch> => {
    const config = api.getAdminSettings();
    const useVienna = Math.random() > 0.5;

    const hotels = [
      {
        title: "Grand Hotel Wien",
        loc: "Vienna, AT",
        img: IMAGES.vienna,
        base: 120.0,
      },
      {
        title: "Hotel 1898",
        loc: "Barcelona, ES",
        img: IMAGES.barcelona,
        base: 85.0,
      },
    ];

    const selection = useVienna ? hotels[0] : hotels[1];
    const generatedCommission = Number(
      (selection.base * config.commissionMultiplier).toFixed(2),
    );

    return delay(
      {
        orderId: "ORD-" + Math.floor(Math.random() * 900000 + 100000),
        title: selection.title,
        propertyImage: selection.img,
        location: selection.loc,
        nights: 2,
        rating: 4.9,
        baseValue: selection.base,
        commission: generatedCommission,
      },
      1100,
    );
  },
};
