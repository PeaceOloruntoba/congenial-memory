export type UserRole = "user" | "admin";

export interface UserProfile {
  id: string;
  phone: string;
  name: string;
  verified: boolean;
  createdAt: string;
  role: UserRole;
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
  error?: string;
}
