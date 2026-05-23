import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Key, Smartphone } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { toast } from "sonner";

export const ForgotPasswordPage: React.FC = () => {
  const [viewStep, setViewStep] = useState<1 | 2>(1);
  const [prefix, setPrefix] = useState("+32");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authVerifyCode, setAuthVerifyCode] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");

  const navigate = useNavigate();

  const handleDispatchCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber)
      return toast.error(
        "Please input a valid registered string phone number.",
      );

    toast.success(
      "Reset verification routing signature pushed to SMS network.",
    );
    setViewStep(2);
  };

  const handleCommitNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authVerifyCode || !updatedPassword)
      return toast.error("Please complete all form security cells.");

    toast.success("Account password updated successfully.");
    navigate("/auth/login");
  };

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center gap-1.5">
        <Link
          to="/auth/login"
          className="text-gray-400 hover:text-[#0B2253] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-[#0B2253]">Recover Access</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Reset encrypted authentication keys securely.
          </p>
        </div>
      </div>

      {viewStep === 1 ? (
        <form onSubmit={handleDispatchCode} className="space-y-4">
          <div className="relative">
            <Input
              label="Registered Mobile Phone"
              isPhone={true}
              placeholder="490 00 00 00"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              phonePrefixProps={{
                value: prefix,
                onChange: (e) => setPrefix(e.target.value),
              }}
            />
            <Smartphone className="w-4 h-4 text-gray-300 absolute right-4 bottom-4" />
          </div>

          <Button type="submit" fullWidth={true}>
            Request Security Token
          </Button>
        </form>
      ) : (
        <form onSubmit={handleCommitNewPassword} className="space-y-4">
          <Input
            label="Verification Passcode (SMS)"
            placeholder="Enter temporary 4-digit token"
            value={authVerifyCode}
            onChange={(e) => setAuthVerifyCode(e.target.value)}
          />

          <div className="relative">
            <Input
              label="New Access Password"
              type="password"
              placeholder="Configure new credential keys"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
            <Key className="w-4 h-4 text-gray-300 absolute right-4 bottom-4" />
          </div>

          <Button type="submit" fullWidth={true}>
            Apply Changes
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
