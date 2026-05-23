import type { UserProfile } from "../auth";

export interface AdminManagedUser extends UserProfile {
  balance: number;
  bonus: number;
  isLocked: boolean;
  notes?: string;
}
