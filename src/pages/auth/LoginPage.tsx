import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Phone } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";

export const LoginPage: React.FC = () => {
  const [prefix, setPrefix] = useState("+32");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Read URL search params (e.g., ?isAdmin=1)
  const [searchParams] = useSearchParams();
  const isAdminParam = searchParams.get("isAdmin") === "1";

  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = `${prefix}${phoneNumber.trim()}`;

    const success = await login(fullPhone, password);
    if (success) {
      // If the temporary URL bypass parameter is present, force go to /admin
      if (isAdminParam) {
        navigate("/admin");
        return;
      }

      // Fallback to native dynamic route splitting based on database role assignments
      const userSession = useAuthStore.getState().user;
      if (userSession?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/app");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0B2253]">
          {isAdminParam ? "Admin Terminal Sign In" : "Sign In"}
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {isAdminParam
            ? "Bypass mode active. Enter any valid login credentials to route to Admin panel."
            : "Please enter your credentials to access your terminal."}
        </p>
      </div>

      {isAdminParam && (
        <div className="mb-4 p-2.5 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-700 font-medium">
          ⚠️ <strong>Dev Note:</strong> You are using a temporary URL bypass.
          Successful sign-in will force redirect you straight to{" "}
          <code>/admin</code>.
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        {/* Phone Prefix Embedded Module */}
        <div className="relative">
          <Input
            label="Mobile Phone Number"
            isPhone={true}
            placeholder="490 00 00 00"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            phonePrefixProps={{
              value: prefix,
              onChange: (e) => setPrefix(e.target.value),
            }}
          />
          <Phone className="w-4 h-4 text-gray-300 absolute right-4 bottom-4" />
        </div>

        {/* Masked Password String with Eye-Toggle Toggle Visibility */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 bottom-3.5 text-gray-400 hover:text-[#1A6CFA] cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Password Recovery Hyperlink */}
        <div className="text-right">
          <Link
            to="/auth/forgot"
            className="text-xs font-semibold text-[#1A6CFA] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Form Submission Action Row */}
        <Button type="submit" fullWidth={true} isLoading={loading}>
          Log In
        </Button>

        {/* Footnote Link Redirects */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500 font-medium">
            Don't have an asset profile?{" "}
            <Link
              to="/auth/register"
              className="text-[#1A6CFA] font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
