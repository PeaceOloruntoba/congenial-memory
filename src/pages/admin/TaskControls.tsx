import React, { useState, useEffect } from "react";
import { Sliders, HelpCircle, Save } from "lucide-react";
import { useAdminStore } from "../../store/adminStore";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export const TaskControls: React.FC = () => {
  const { settings, commitSettingsUpdate, fetchAdminState } = useAdminStore();

  const [multiplierInput, setMultiplierInput] = useState(
    String(settings.commissionMultiplier),
  );
  const [maxTasksInput, setMaxTasksInput] = useState(
    String(settings.maxDailyTasks),
  );

  useEffect(() => {
    fetchAdminState();
  }, [fetchAdminState]);

  // Synchronize dynamic updates if internal states shift
  useEffect(() => {
    setMultiplierInput(String(settings.commissionMultiplier));
    setMaxTasksInput(String(settings.maxDailyTasks));
  }, [settings]);

  const handleSaveControlParameters = (e: React.FormEvent) => {
    e.preventDefault();
    commitSettingsUpdate({
      commissionMultiplier: Number(multiplierInput) || 0.108,
      maxDailyTasks: Number(maxTasksInput) || 25,
    });
  };

  return (
    <div className="space-y-6 p-6 bg-[#F8FAFC] min-h-screen">
      <div>
        <h3 className="text-xl font-black text-[#0B2253]">
          Algorithm Controls Configurator
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Configure yield thresholds and structural loop processing caps.
        </p>
      </div>

      <Card className="max-w-2xl p-6 bg-white border border-gray-100 shadow-orbit-card">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
          <Sliders className="w-5 h-5 text-[#1A6CFA]" />
          <h4 className="text-sm font-bold text-[#0B2253] uppercase tracking-wider">
            Operational Parameters
          </h4>
        </div>

        <form onSubmit={handleSaveControlParameters} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Global Commission Multiplier Ratio"
              placeholder="e.g. 0.10833"
              value={multiplierInput}
              onChange={(e) => setMultiplierInput(e.target.value)}
            />
            <Input
              label="Absolute Task Cap (Per Agent / Day)"
              placeholder="e.g. 25"
              value={maxTasksInput}
              onChange={(e) => setMaxTasksInput(e.target.value)}
            />
          </div>

          <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4 flex gap-3 text-xs text-[#0B2253]">
            <HelpCircle className="w-5 h-5 text-[#1A6CFA] shrink-0" />
            <p className="leading-relaxed font-medium">
              Updating these fields pushes immediate real-time variables across
              active client browser spaces. The base pricing engine multiplies
              property inventory book values by this target commission
              multiplier ratio.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="flex items-center gap-2 px-5 py-3">
              <Save className="w-4 h-4" /> Save Operational Limits
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TaskControls;
