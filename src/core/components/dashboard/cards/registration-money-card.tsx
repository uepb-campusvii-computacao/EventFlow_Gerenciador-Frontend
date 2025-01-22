import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

import colors from 'tailwindcss/colors';
import { Skeleton } from '../../ui/skeleton';

interface RegistrationMoneyCardProps {
  value: string;
  isLoading: boolean;
}

export function RegistrationMoneyCard({
  value,
  isLoading,
}: RegistrationMoneyCardProps) {
  return (
    <Card className='border-green-500'>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        {isLoading ? (
          <Skeleton className='h-4 w-full' />
        ) : (
          <>
            <CardTitle className='text-base font-semibold'>
              Dinheiro das inscrições
            </CardTitle>
            <DollarSign
              color={colors.green['500']}
              className='h-4 w-4 text-muted-foreground'
            />
          </>
        )}
      </CardHeader>
      <CardContent className='space-y-1'>
        {isLoading ? (
          <Skeleton className='h-10 w-10' />
        ) : (
          <span className='text-2xl font-bold tracking-tight'>{value}</span>
        )}
      </CardContent>
    </Card>
  );
}
