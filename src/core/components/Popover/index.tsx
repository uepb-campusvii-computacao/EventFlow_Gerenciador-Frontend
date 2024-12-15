import { ReactNode } from 'react';

interface PopoverProps {
  open: boolean;
  children: ReactNode;
  icon: ReactNode;
  togglePopover: () => void;
}

// tentar aplicar composition pattern aqui (seria legal)

export function Popover({ open, togglePopover, children, icon }: PopoverProps) {
  return (
    <div className='relative flex items-center justify-center'>
      <button className='rounded-md bg-blue-500 p-2' onClick={togglePopover}>
        {icon}
      </button>
      <div
        className={`${open ? 'block' : 'hidden'} absolute top-12 rounded-md bg-white p-2 shadow-md`}
      >
        {children}
      </div>
    </div>
  );
}
