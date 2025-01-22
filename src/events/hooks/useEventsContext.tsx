import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useAuthContext } from '../../auth/hooks/useAuthContext';
import { IEventEntity } from '../domain/entities/eventEntity';
import { api } from '@/core/lib/axios';
import { Spinner } from '@/core/components/spinner';

interface IEventContext {
  events: IEventEntity[];
  currentEvent: IEventEntity;
  isLoading: boolean;

  setCurrentEvent: (event: IEventEntity) => void;
  getEventDataById: (eventId: string) => IEventEntity | void; // melhorar esse retorno
}

const EventContext = createContext({} as IEventContext);

interface IEventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: IEventProviderProps) {
  const [events, setEvents] = useState<IEventEntity[]>([]);
  const [currentEvent, setCurrentEvent] = useState<IEventEntity>(
    {} as IEventEntity
  );
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`/user/my-events`);
        const fetchedEvents = response.data;

        setEvents(fetchedEvents);
        if (fetchedEvents.length > 0) {
          setCurrentEvent(fetchedEvents[0]);
        }
      } catch (error: any) {
        console.error('Erro ao buscar eventos:', error);

        let errorMessage = 'Não foi possível carregar os eventos.';
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo && userInfo.id) {
      fetchEvents();
    }
  }, [userInfo]);

  const getEventDataById = (eventId: string) => {
    const event = events.find(e => e.uuid_evento === eventId);
    if (!event) {
      toast.error('Evento não encontrado');
      return;
    }

    return event;
  };

  return (
    <EventContext.Provider
      value={{
        events,
        isLoading,
        currentEvent,
        setCurrentEvent,
        getEventDataById,
      }}
    >
      {isLoading ? <Spinner /> : children}
    </EventContext.Provider>
  );
}

export function useEventsContext() {
  const context = useContext(EventContext);
  return context;
}
