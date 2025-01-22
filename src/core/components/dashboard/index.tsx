import { useQuery } from '@tanstack/react-query';

import { RegistrationMoneyCard } from './cards/registration-money-card';
import { TotalRegistrationsCard } from './cards/total-number-registrations-card';
import { SalesMoneyCard } from './cards/sales-money-card';
import { RegistrationsChart } from './charts/registrations-chart';
import { RegistrationsAccreditedChart } from './charts/registrations-accredited-chart';
import { useEventsContext } from '../../../events/hooks/useEventsContext';

import { Title } from '../ui/title';
import { Spinner } from '../spinner';
import { getDashboardData } from '@/core/data/services/get-dashboard-data';

export function Dashboard() {
  const { currentEvent } = useEventsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: () => getDashboardData(currentEvent.uuid_evento),
  });

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Title>Dashboard</Title>

        <div className='grid grid-cols-3 gap-4'>
          <TotalRegistrationsCard
            isLoading={isLoading}
            total={data?.total_inscritos.toString()}
          />
          <RegistrationMoneyCard
            isLoading={isLoading}
            value={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(data?.total_arrecadado.totalArrecadadoInscricoes || 0)}
          />
          <SalesMoneyCard
            isLoading={isLoading}
            value={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(data?.total_arrecadado.totalArrecadadoVendas || 0)}
          />
        </div>
        <div></div>
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <Spinner size='large' />
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            <RegistrationsChart
              data={[
                {
                  name: 'payers',
                  value:
                    data?.total_inscritos -
                    (data?.inscricoes_pendentes + data?.inscricoes_gratuitas),
                  fill: 'var(--blue)',
                },
                {
                  name: 'free',
                  value: data?.inscricoes_pendentes,
                  fill: 'var(--green)',
                },
                {
                  name: 'pending',
                  value: data?.inscricoes_gratuitas,
                  fill: 'var(--red)',
                },
              ]}
              total={data?.total_inscritos}
            />
            <RegistrationsAccreditedChart
              data={[
                {
                  name: 'accredited',
                  value: data?.total_inscritos - data?.total_credenciados,
                  fill: 'var(--blue)',
                },
                {
                  name: 'unaccredited',
                  value: data?.total_credenciados,
                  fill: 'var(--red)',
                },
              ]}
              total={data?.total_inscritos}
            />
            <div />
          </div>
        )}
      </div>
    </>
  );
}
