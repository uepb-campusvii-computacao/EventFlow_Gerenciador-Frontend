import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { RegistrationMoneyCard } from './cards/registration-money-card';
import { TotalRegistrationsCard } from './cards/total-number-registrations-card';
import { SalesMoneyCard } from './cards/sales-money-card';
import { RegistrationsChart } from './charts/registrations-chart';
import { RegistrationsAccreditedChart } from './charts/registrations-accredited-chart';
import { Loading } from '../../components/Loading';
import { useEventsContext } from '../../../events/hooks/useEventsContext';

import { env } from '@/env';
import { api } from '@/core/lib/axios';
import { Title } from '../ui/title';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [financialData, setFinancialData] = useState({
    totalInscritos: 0,
    totalCredenciados: 0,
    totalArrecadado: { totalArrecadadoInscricoes: 0, totalArrecadadoVendas: 0 },
    inscricoesPendentes: 0,
    inscricoesGratuitas: 0,
  });
  const { currentEvent } = useEventsContext();

  useEffect(() => {
    const fetchFinancialInformation = async () => {
      try {
        const FINANCIAL_INFORMATION_ENDPOINT = `${env.VITE_API_URL}/events/${currentEvent.uuid_evento}/dashboard`;
        const response = await api.get(FINANCIAL_INFORMATION_ENDPOINT);

        const data = response.data;

        const {
          totalArrecadadoInscricoes: vInsc,
          totalArrecadadoVendas: vVend,
        } = data.total_arrecadado;

        setFinancialData({
          totalInscritos: data.total_inscritos,
          totalCredenciados: data.total_credenciados,
          totalArrecadado: {
            totalArrecadadoInscricoes: vInsc ? vInsc : 0,
            totalArrecadadoVendas: vVend ? vVend : 0,
          },
          inscricoesPendentes: data.inscricoes_pendentes,
          inscricoesGratuitas: data.inscricoes_gratuitas,
        });
      } catch (error) {
        console.error('Erro ao buscar dados financeiros:', error);
        toast.error(
          'Falha ao buscar dados financeiros. Tente novamente mais tarde.'
        );
      }
      setIsLoading(false);
    };

    fetchFinancialInformation();
  }, [currentEvent]);

  return (
    <>
      {/* @TODO: remover loading e adicionar o padrão da lib do shadcn */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-4'>
          <Title>Dashboard</Title>

          <div className='grid grid-cols-3 gap-4'>
            <TotalRegistrationsCard
              total={financialData.totalInscritos.toString()}
            />
            <RegistrationMoneyCard
              value={new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                financialData.totalArrecadado.totalArrecadadoInscricoes
              )}
            />
            <SalesMoneyCard
              value={new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(financialData.totalArrecadado.totalArrecadadoVendas)}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <RegistrationsChart
              data={[
                {
                  name: 'payers',
                  value:
                    financialData.totalInscritos -
                    (financialData.inscricoesPendentes +
                      financialData.inscricoesGratuitas),
                  fill: 'var(--blue)',
                },
                {
                  name: 'free',
                  value: financialData.inscricoesPendentes,
                  fill: 'var(--green)',
                },
                {
                  name: 'pending',
                  value: financialData.inscricoesGratuitas,
                  fill: 'var(--red)',
                },
              ]}
              total={financialData.totalInscritos}
            />
            <RegistrationsAccreditedChart
              data={[
                {
                  name: 'accredited',
                  value:
                    financialData.totalInscritos -
                    financialData.totalCredenciados,
                  fill: 'var(--blue)',
                },
                {
                  name: 'unaccredited',
                  value: financialData.totalCredenciados,
                  fill: 'var(--red)',
                },
              ]}
              total={financialData.totalInscritos}
            />
          </div>
        </div>
      )}
    </>
  );
}
