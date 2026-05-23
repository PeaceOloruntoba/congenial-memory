import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { api } from '../../lib/api';
import { toast } from 'sonner';

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('ABCD');
  const [code, setCode] = useState('');
  const [newPass, setNewPass] = useState('');

  const send = async () => {
    const res = await api.sendResetCode(phone || '+441234567890');
    if (res.success) {
      toast('Reset code sent');
      setStep(2);
    }
  };

  const verify = async () => {
    const res = await api.verifyResetCode(phone, code, newPass);
    if (res.success) {
      toast('Password reset');
      setStep(1);
    } else {
      toast('Invalid code');
    }
  };

  return (
    <div className="space-y-4">
      {step === 1 ? (
        <div>
          <Input label="Registered phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div className="flex items-center space-x-3 mt-3">
            <div className="bg-gray-100 px-3 py-2 rounded">{captcha}</div>
            <Input label="Captcha" placeholder="Enter" />
          </div>
          <div className="text-right"><Button onClick={send}>Send Reset Code</Button></div>
        </div>
      ) : (
        <div>
          <Input label="Verification code" value={code} onChange={(e) => setCode(e.target.value)} />
          <Input label="New password" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          <div className="text-right"><Button onClick={verify}>Reset Password</Button></div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
