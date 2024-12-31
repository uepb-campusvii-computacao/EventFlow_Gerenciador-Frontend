import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useEventsContext } from '../../hooks/useEventsContext';
import { ISubscribersEntity } from '../../domain/entities/subscribersEntity';
import { Loading } from '../../../core/components/Loading';
import { Raffle } from '../../components/Raffle';
import { api } from '@/core/lib/axios';
import { Title } from '@/core/components/ui/title';

export function EventRafflePage() {
  const [users, setUsers] = useState<ISubscribersEntity[]>([]);
  const [load, setLoad] = useState(true);
  const { currentEvent } = useEventsContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {
          data: { all_subscribers },
        } = await api.get(`/events/${currentEvent}/inscricoes`);
        setUsers(all_subscribers);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        toast.error('Erro ao buscar usuários');
      } finally {
        setLoad(false);
      }
    };

    fetchUsers();
  }, [currentEvent, setLoad]);

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div className='flex flex-col gap-4'>
          <Title>Sorteio de inscritos</Title>

          <Raffle data={users} />
        </div>
      )}
    </>
  );
}
