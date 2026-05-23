import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import { useTaskStore } from '../../store/taskStore';

const TaskControls: React.FC = () => {
  const { maxDaily, setMaxDaily } = useTaskStore();
  const [val, setVal] = useState(String(maxDaily));

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Task Controls</h3>
      <Card>
        <div className="flex items-center space-x-2">
          <input className="border p-2 rounded" value={val} onChange={(e)=>setVal(e.target.value)} />
          <button className="px-3 py-2 bg-royal-500 text-white rounded" onClick={()=>setMaxDaily(Number(val) || 25)}>Set Max Daily</button>
        </div>
      </Card>
    </div>
  );
};

export default TaskControls;
