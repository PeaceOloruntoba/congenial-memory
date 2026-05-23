import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
};

export const Button: React.FC<Props> = ({ variant = 'primary', className = '', children, ...rest }) => {
  const base = 'px-4 py-2 rounded-lg font-medium shadow-sm flex items-center justify-center';
  const variantClass = variant === 'primary' ? 'bg-royal-500 text-white' : variant === 'danger' ? 'bg-red-500 text-white' : 'bg-white text-gray-800 border';
  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
