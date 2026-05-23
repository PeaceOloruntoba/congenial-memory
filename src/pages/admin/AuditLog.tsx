import React, { useEffect } from "react";
import { Clock, Terminal } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import { Card } from "../../components/ui/Card";

export const AuditLog: React.FC = () => {
  const { auditLogs, fetchAdminState } = useAdminStore();

  useEffect(() => {
    fetchAdminState();
  }, [fetchAdminState]);

  const mapActionBadgeStyles = (type: string) => {
    switch (type) {
      case "BALANCE_OVERRIDE":
        return "bg-amber-100 text-amber-700";
      case "SETTINGS_CHANGED":
        return "bg-blue-100 text-blue-700";
      case "USER_LOCK":
        return "bg-red-100 text-red-700";
      default:
        return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="space-y-6 p-6 bg-[#F8FAFC] min-h-screen">
      <div>
        <h3 className="text-xl font-black text-[#0B2253]">
          Immutable Audit Trail Log
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Security logging pipeline recording core backoffice mutations.
        </p>
      </div>

      <Card className="p-0 overflow-hidden bg-white border border-gray-100 shadow-orbit-card rounded-2xl">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-500" />
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            System Process Stream Logs
          </span>
        </div>

        <div className="divide-y divide-gray-100/70 font-mono">
          {auditLogs.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              No structural administrative mutations logged inside this
              execution session.
            </div>
          ) : (
            auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide ${mapActionBadgeStyles(log.actionType)}`}
                    >
                      {log.actionType.replace("_", " ")}
                    </span>
                    <p className="text-xs font-bold text-[#0B2253]">
                      {log.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                    <span>
                      Actor Signature:{" "}
                      <strong className="text-gray-600 font-semibold">
                        {log.actor}
                      </strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {log.timestamp}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-300 font-bold self-start sm:self-center">
                  #{log.id}
                </span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default AuditLog;
