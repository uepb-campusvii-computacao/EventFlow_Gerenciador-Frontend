import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosInstance';
import Loading from '../../pages/Loading/Loading';
import AuthContext from '../Auth/AuthContext';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(`/user/my-events`);
        const fetchedEvents = response.data;
        setEvents(fetchedEvents);
        if (fetchedEvents.length > 0) {
          setCurrentEvent(fetchedEvents[0].uuid_evento);
        } else {
          setCurrentEvent(null);
        }
      } catch (error) {
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

  const getEventDataById = eventId => {
    const event = events.find(e => e.uuid_evento === eventId);
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
      {isLoading ? <Loading /> : children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EventContext;
