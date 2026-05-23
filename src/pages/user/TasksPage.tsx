import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useTaskStore } from '../../store/taskStore';
import { useWalletStore } from '../../store/walletStore';

const Telemetry: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="bg-white p-3 rounded shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

const TasksPage: React.FC = () => {
  const { todayCount, maxDaily, getTask, submitTask, loadingMatch } = useTaskStore();
  const wallet = useWalletStore();
  const [match, setMatch] = useState<any | null>(null);
  const [matching, setMatching] = useState(false);

  const handleGet = async () => {
    setMatching(true);
    const res = await getTask();
    if (res) setMatch(res);
    setMatching(false);
  };

  const handleSubmit = () => {
    if (!match) return;
    submitTask(match);
    wallet.deposit(match.commission, 'bonus');
    setMatch(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Telemetry label="Total Asset" value="€1,200" />
        <Telemetry label="Asset" value="€800" />
        <Telemetry label="Dividends" value="€120" />
        <Telemetry label="Processing" value="3" />
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>Order received today: {todayCount} / {maxDaily}</div>
          <div className="text-sm text-gray-500">Progress</div>
        </div>
      </Card>

      <div className="text-center">
        <Button onClick={handleGet} className="w-full" disabled={matching || loadingMatch}>
          {matching ? 'Matching...' : 'Click to get your task'}
        </Button>
      </div>

      {match && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-md">
            <div className="h-36 bg-gray-200 mb-3 rounded" />
            <div className="font-semibold text-lg">{match.title}</div>
            <div className="text-sm text-gray-600">Order ID: {match.orderId}</div>
            <div className="mt-3">Base Value: €{match.baseValue.toFixed(2)}</div>
            <div>Commission: €{match.commission.toFixed(2)}</div>
            <div className="mt-4 flex space-x-2"><Button onClick={() => setMatch(null)}>Cancel</Button><Button variant="primary" onClick={handleSubmit}>Submit</Button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
