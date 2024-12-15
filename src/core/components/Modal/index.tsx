import { X } from '@phosphor-icons/react';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'} `}
    >
      {/* modal */}
      <div
        onClick={e => e.stopPropagation()}
        className={`rounded-xl bg-white p-6 shadow transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} `}
      >
        <button
          onClick={onClose}
          className='absolute right-2 top-2 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600'
        >
          <X size={32} color='#909090' />
        </button>
        {children}
      </div>
    </div>
  );
}
