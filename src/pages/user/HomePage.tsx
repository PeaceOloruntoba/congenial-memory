import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';

const items = [
  { id: 1, title: 'Stays Royale - Ocean View', tag: 'Recommended' },
  { id: 2, title: 'Grand Palace Suite', tag: 'Popular' },
  { id: 3, title: 'City Penthouse Retreat', tag: 'Recommended' }
];

const HomePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : 'Good afternoon';

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">{greet}, {user?.name || 'Guest'}</h3>
        <p className="text-sm text-gray-600">Check your verification status and recommended properties</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Featured</h4>
          <div className="text-sm text-gray-600">Filter</div>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {items.map(i => (
            <Card key={i.id} className="min-w-[220px]">
              <div className="h-32 bg-gray-200 rounded mb-3" />
              <div className="flex items-center justify-between">
                <div className="font-medium">{i.title}</div>
                <Badge variant={i.tag === 'Recommended' ? 'success' : 'neutral'}>{i.tag}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-3 bg-yellow-50 rounded">Your profile verification: <span className="font-medium">{user?.verified ? 'Verified' : 'Incomplete'}</span></div>
    </div>
  );
};

export default HomePage;
