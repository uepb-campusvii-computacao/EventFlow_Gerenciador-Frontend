import { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  bgColor: string;
  title: string;
  value: string;
}

export function InfoCard({ icon, bgColor, title, value }: InfoCardProps) {
  return (
    <div
      className={`flex items-center overflow-hidden rounded-sm border shadow ${bgColor}`}
    >
      <div className='p-4'>{icon}</div>
      <div className='px-4 text-gray-700'>
        <h3 className='text-sm tracking-wider'>{title}</h3>
        <p className='text-3xl'>{value}</p>
      </div>
    </div>
  );
}