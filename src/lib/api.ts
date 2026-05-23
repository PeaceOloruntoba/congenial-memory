export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  phone: string;
  name: string;
  email?: string;
  verified: boolean;
  createdAt: string;
  role: UserRole;
  balance: number;
  kycLevel?: 0 | 1 | 2;
}

export interface TaskMatch {
  orderId: string;
  title: string;
  propertyImage?: string;
  location?: string;
  nights?: number;
  rating?: number;
  baseValue: number;
  commission: number;
}

export interface LoginResponse {
  success: boolean;
  user?: UserProfile;
  token?: string;
  error?: string;
}

export interface RegisterResponse {
  success: boolean;
  user?: UserProfile;
}

export interface ResetResponse {
  success: boolean;
  code?: string;
}

const mockUsers: Record<string, UserProfile> = {
  'u1': {
    id: 'u1',
    phone: '+441234567890',
    name: 'Ava Traveler',
    email: 'ava@example.com',
    verified: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    role: 'user',
    balance: 120.5,
    kycLevel: 1
  },
  'u2': {
    id: 'u2',
    phone: '+447700900123',
    name: 'John Doe',
    email: 'john@example.com',
    verified: false,
    createdAt: new Date().toISOString(),
    role: 'user',
    balance: 5.0,
    kycLevel: 0
  },
  'admin': {
    id: 'admin',
    phone: '+10000000000',
    name: 'Platform Admin',
    email: 'admin@platform.local',
    verified: true,
    createdAt: new Date().toISOString(),
    role: 'admin',
    balance: 0,
    kycLevel: 2
  }
};

const mockProperties = [
  { id: 'p1', title: 'Ocean View Suite - Stays Royale', image: '/assets/property.jpg', tag: 'Recommended' },
  { id: 'p2', title: 'Grand Palace Suite', image: '/assets/property-2.jpg', tag: 'Popular' }
];

function delay<T>(value: T, ms = 600): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), ms));
}

let settings = {
  commissionMultiplier: 1.0,
  maxDailyTasks: 25
};

export const api = {
  getProperties: async () => {
    return delay(mockProperties, 400);
  },
  login: async (phone: string, password: string): Promise<LoginResponse> => {
    const user = Object.values(mockUsers).find(u => u.phone === phone) || mockUsers['u1'];
    return delay({ success: true, user, token: 'mock-token' }, 700);
  },
  register: async (phone: string, password: string, invite?: string): Promise<RegisterResponse> => {
    const id = 'u' + Math.floor(Math.random() * 10000);
    const user: UserProfile = { id, phone, name: 'New User', email: undefined, verified: false, createdAt: new Date().toISOString(), role: 'user', balance: 0, kycLevel: 0 };
    mockUsers[id] = user;
    return delay({ success: true, user }, 900);
  },
  sendResetCode: async (phone: string): Promise<ResetResponse> => {
    // always return 1234 for simulation
    return delay({ success: true, code: '1234' }, 800);
  },
  verifyResetCode: async (phone: string, code: string, newPassword: string): Promise<{ success: boolean }> => {
    return delay({ success: code === '1234' }, 700);
  },
  fetchTaskMatch: async (): Promise<TaskMatch> => {
    const matched: TaskMatch = {
      orderId: 'ORD-' + Math.floor(Math.random() * 90000 + 10000),
      title: 'Ocean View Suite - Stays Royale',
      propertyImage: mockProperties[0].image,
      location: 'Lisbon, PT',
      nights: 2,
      rating: 4.8,
      baseValue: 12.0,
      commission: Number((12.0 * settings.commissionMultiplier * 0.108333).toFixed(2))
    };
    return delay(matched, 1200);
  },
  getUsers: async (): Promise<UserProfile[]> => {
    return delay(Object.values(mockUsers), 400);
  },
  adminOverrideBalance: async (userId: string, amount: number) => {
    const u = mockUsers[userId];
    if (!u) return delay({ success: false }, 300);
    u.balance = amount;
    return delay({ success: true, user: u }, 300);
  },
  updateSettings: async (patch: Partial<typeof settings>) => {
    settings = { ...settings, ...patch };
    return delay({ success: true, settings }, 200);
  }
};
