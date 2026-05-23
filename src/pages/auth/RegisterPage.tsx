import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const generateCaptcha = () => Math.random().toString(36).substring(2, 6).toUpperCase();

const RegisterPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [invite, setInvite] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const auth = useAuthStore();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert('Passwords must match');
    if (captchaInput !== captcha) return alert('Captcha mismatch');
    await auth.register(phone || '+441234567890', password, invite);
    nav('/');
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44..." />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <Input label="Invitation Code (optional)" value={invite} onChange={(e) => setInvite(e.target.value)} />

      <div className="flex items-center space-x-3">
        <div className="bg-gray-100 px-3 py-2 rounded font-mono tracking-wider text-lg">{captcha}</div>
        <Input label="Enter Captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} />
        <button type="button" onClick={() => setCaptcha(generateCaptcha())} className="text-sm text-gray-600">Refresh</button>
      </div>

      <div className="text-right"><Button type="submit">Register</Button></div>
    </form>
  );
};

export default RegisterPage;
