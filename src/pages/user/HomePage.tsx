import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';
import sample1 from '../../assets/samples/IMG-20260518-WA0016.jpg';
import sample2 from '../../assets/samples/IMG-20260518-WA0017.jpg';
import sample3 from '../../assets/samples/IMG-20260518-WA0018.jpg';

const items = [
  { id: 1, title: 'Stays Royale - Ocean View', tag: 'Recommended', img: sample1 },
  { id: 2, title: 'Grand Palace Suite', tag: 'Popular', img: sample2 },
  { id: 3, title: 'City Penthouse Retreat', tag: 'Recommended', img: sample3 }
];

const HomePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : 'Good afternoon';

  return (
    <div className="space-y-4">
      <div className="bg-royal-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-royal-700">{greet}, {user?.name || 'Guest'}</h3>
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
              <img src={i.img} alt={i.title} className="h-32 w-full object-cover rounded mb-3" />
              <div className="flex items-center justify-between">
                <div className="font-medium">{i.title}</div>
                <Badge variant={i.tag === 'Recommended' ? 'success' : 'neutral'}>{i.tag}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-3 bg-royal-100 rounded">Your profile verification: <span className="font-medium text-royal-700">{user?.verified ? 'Verified' : 'Incomplete'}</span></div>
    </div>
  );
};

export default HomePage;
