import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

const createSecureCaptchaToken = () =>
  Math.random().toString(36).substring(2, 6).toUpperCase();

export const RegisterPage: React.FC = () => {
  const [prefix, setPrefix] = useState("+32");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [captchaToken, setCaptchaToken] = useState(createSecureCaptchaToken());
  const [captchaInput, setCaptchaInput] = useState("");

  const [showPass, setShowPass] = useState(false);
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) return toast.error("Please input your phone number.");
    if (password !== confirmPassword)
      return toast.error("Verification passwords do not match.");
    if (captchaInput.toUpperCase() !== captchaToken) {
      toast.error("Security captcha code incorrect.");
      setCaptchaToken(createSecureCaptchaToken());
      return;
    }

    const fullPhoneStr = `${prefix}${phone.trim()}`;
    const cleanInvite = inviteCode.trim();

    const verified = await register(fullPhoneStr, password, cleanInvite);
    if (verified) navigate("/");
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#0B2253]">Open Asset Account</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Closed system registration via secure validation metrics.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
        <Input
          label="Phone Number"
          isPhone={true}
          placeholder="490 00 00 00"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          phonePrefixProps={{
            value: prefix,
            onChange: (e) => setPrefix(e.target.value),
          }}
        />

        <div className="relative">
          <Input
            label="Account Password"
            type={showPass ? "text" : "password"}
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 bottom-3.5 text-gray-400 cursor-pointer"
          >
            {showPass ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Repeat password string"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Input
          label="Invitation Code"
          placeholder="Mandatory allocation token"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />

        {/* Dynamic Verification Captcha Area */}
        <div>
          <span className="text-xs font-bold text-[#0B2253] block mb-1.5 uppercase tracking-wide">
            Security Check
          </span>
          <div className="flex items-center gap-3">
            <div className="bg-[#0B2253] text-[#FCF6E4] px-4 py-3 rounded-2xl font-mono font-black text-lg tracking-widest select-none shadow-inner bg-radial from-[#0B2253] to-[#040D21]">
              {captchaToken}
            </div>
            <button
              type="button"
              onClick={() => setCaptchaToken(createSecureCaptchaToken())}
              className="p-3 text-gray-400 hover:text-[#1A6CFA] bg-gray-50 border border-gray-100 rounded-2xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter token"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-[#0B2253] font-mono outline-none focus:border-[#1A6CFA] focus:bg-white transition-all uppercase"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth={true}
          isLoading={loading}
          className="mt-2"
        >
          Complete Registration
        </Button>

        <div className="text-center pt-1">
          <p className="text-xs text-gray-500 font-medium">
            Already registered?{" "}
            <Link
              to="/auth/login"
              className="text-[#1A6CFA] font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
