import React from 'react';

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => {
  return <div className={`bg-white rounded-xl shadow p-4 ${className}`}>{children}</div>;
};

export default Card;
