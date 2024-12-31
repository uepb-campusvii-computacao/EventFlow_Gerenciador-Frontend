import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return <h2 className='text-3xl font-bold tracking-tight'>{children}</h2>;
}
