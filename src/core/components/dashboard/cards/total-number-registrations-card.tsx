import { UserRound } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

import colors from 'tailwindcss/colors';

interface TotalRegistrationsCardProps {
  total: string;
}

export function TotalRegistrationsCard({ total }: TotalRegistrationsCardProps) {
  return (
    <Card className='border-violet-600'>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-base font-semibold'>
          Total inscritos
        </CardTitle>
        <UserRound
          color={colors.violet['500']}
          className='h-4 w-4 text-muted-foreground'
        />
      </CardHeader>
      <CardContent className='space-y-1'>
        <span className='text-2xl font-bold tracking-tight'>{total}</span>
      </CardContent>
    </Card>
  );
}
