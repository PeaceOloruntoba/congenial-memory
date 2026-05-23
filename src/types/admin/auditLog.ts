export interface SystemAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actionType:
    | "BALANCE_OVERRIDE"
    | "SETTINGS_CHANGED"
    | "USER_LOCK"
    | "USER_UNLOCK";
  description: string;
}
