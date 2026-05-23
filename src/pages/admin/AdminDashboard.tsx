import React from 'react';
import Card from '../../components/ui/Card';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Admin Dashboard</h3>
      <div className="grid grid-cols-3 gap-4">
        <Card><div className="text-sm text-gray-500">Active Deposits</div><div className="text-xl font-bold">€12,340</div></Card>
        <Card><div className="text-sm text-gray-500">Processed Payouts</div><div className="text-xl font-bold">€8,200</div></Card>
        <Card><div className="text-sm text-gray-500">Active Agents</div><div className="text-xl font-bold">452</div></Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
