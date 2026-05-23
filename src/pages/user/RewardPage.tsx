import React from 'react';
import Card from '../../components/ui/Card';

const RewardPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Rewards</h3>
      <Card>
        <div className="text-sm text-gray-600">Available reward campaigns</div>
      </Card>
    </div>
  );
};

export default RewardPage;
