import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'neutral' | 'success' }> = ({ children, variant = 'neutral' }) => (
  <span className={`inline-block text-xs px-2 py-1 rounded-full ${variant === 'success' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{children}</span>
);

export default Badge;
