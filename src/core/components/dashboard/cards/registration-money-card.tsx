import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

import colors from 'tailwindcss/colors';

interface RegistrationMoneyCardProps {
  value: string;
}

export function RegistrationMoneyCard({ value }: RegistrationMoneyCardProps) {
  return (
    <Card className='border-green-500'>
      <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-base font-semibold'>
          Dinheiro das Inscrições
        </CardTitle>
        <DollarSign
          color={colors.green['500']}
          className='h-4 w-4 text-muted-foreground'
        />
      </CardHeader>
      <CardContent className='space-y-1'>
        <span className='text-2xl font-bold tracking-tight'>{value}</span>
      </CardContent>
    </Card>
  );
}
