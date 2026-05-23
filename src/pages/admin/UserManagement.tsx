import React from 'react';
import Card from '../../components/ui/Card';

const UserManagement: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">User Management</h3>
      <Card>
        <div className="text-sm text-gray-600">User matrix (mock)</div>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between"><div>Ava Traveler</div><div><button className="text-sm text-royal-500">Override</button></div></div>
          <div className="flex justify-between"><div>John Doe</div><div><button className="text-sm text-royal-500">Lock</button></div></div>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
