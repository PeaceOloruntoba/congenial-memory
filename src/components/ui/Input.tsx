import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<Props> = ({ label, className = '', ...rest }) => {
  return (
    <label className={`flex flex-col space-y-1 ${className}`}>
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <input className="px-3 py-2 rounded-lg border bg-white" {...rest} />
    </label>
  );
};

export default Input;
