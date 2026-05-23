import React from 'react';

export const Modal: React.FC<React.PropsWithChildren<{ open: boolean; onClose: () => void }>> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-4">{children}
        <div className="mt-4 text-right"><button onClick={onClose} className="text-sm text-gray-600">Close</button></div>
      </div>
    </div>
  );
};

export default Modal;
