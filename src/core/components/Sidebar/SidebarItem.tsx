import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  nome: string;
  link: string;
  icon: ReactNode;
}

export function SidebarItem({ nome, link, icon }: SidebarItemProps) {
  return (
    <Link
      to={link}
      className='flex items-center rounded-lg px-3 py-2 hover:bg-blue-500'
    >
      {icon}
      <span>{nome}</span>
    </Link>
  );
}
