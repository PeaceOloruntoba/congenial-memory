import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isPhone?: boolean;
  phonePrefixProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, isPhone = false, phonePrefixProps, className = "", ...props },
    ref,
  ) => {
    return (
      <div className={`w-full flex flex-col ${className}`}>
        {label && (
          <span className="text-xs font-bold text-[#0B2253] mb-1.5 uppercase tracking-wide">
            {label}
          </span>
        )}

        <div className="relative flex items-center w-full">
          {isPhone ? (
            <div className="flex w-full items-center bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#1A6CFA] focus-within:bg-white transition-all">
              {/* Embedded Country Dial-Code Dropdown */}
              <select
                className="bg-transparent pl-3 pr-1 py-3.5 text-sm font-semibold text-[#0B2253] border-r border-gray-200 outline-none appearance-none cursor-pointer"
                {...phonePrefixProps}
              >
                <option value="+32">BE (+32)</option>
                <option value="+234">NG (+234)</option>
                <option value="+44">UK (+44)</option>
                <option value="+1">US (+1)</option>
              </select>
              <input
                type="tel"
                ref={ref}
                className="w-full bg-transparent px-3 py-3.5 text-sm text-[#0B2253] outline-none font-medium placeholder-gray-400"
                {...props}
              />
            </div>
          ) : (
            <input
              ref={ref}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-[#0B2253] placeholder-gray-400 outline-none focus:border-[#1A6CFA] focus:bg-white transition-all font-medium"
              {...props}
            />
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
