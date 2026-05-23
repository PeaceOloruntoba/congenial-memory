import React from 'react';
import Card from '../../components/ui/Card';

const AuditLog: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Audit Log</h3>
      <Card>
        <div className="text-sm text-gray-600">Recent system actions (mock)</div>
      </Card>
    </div>
  );
};

export default AuditLog;
