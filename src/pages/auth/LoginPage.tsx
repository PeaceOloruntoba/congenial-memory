import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuthStore();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth.login(phone || '+441234567890', password);
    nav('/');
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44..." />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex justify-between items-center">
        <Link to="/auth/forgot" className="text-sm text-amber-600">Forgot Password?</Link>
        <Button type="submit">Login</Button>
      </div>
      <div className="text-center text-sm">
        <Link to="/auth/register" className="text-amber-600">Create an account</Link>
      </div>
    </form>
  );
};

export default LoginPage;
