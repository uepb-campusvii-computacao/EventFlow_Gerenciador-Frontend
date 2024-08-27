import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loading from "../../pages/Loading/Loading"
import AuthContext from '../Auth/AuthContext';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(`/admin/user/${userInfo.id}/events`);
        setEvents(response.data);

      } catch (error) {
        console.error("Erro ao buscar eventos:", error);

        let errorMessage = "Não foi possível carregar os eventos.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }

        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [userInfo]);

  return (
    <EventContext.Provider value={{ events, isLoading }}>
      {
        isLoading ? <Loading /> : children
      }
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EventContext;
