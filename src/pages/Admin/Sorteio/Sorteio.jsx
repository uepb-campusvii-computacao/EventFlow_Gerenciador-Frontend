import axiosInstance from "@/axiosInstance";
import Raffle from "@/components/AdminModule/Raffle/Raffle";
import Title from "@/components/ui/Title";
import EventContext from "@/context/Event/EventContext";
import Loading from "@/pages/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Sorteio = () => {
  const [users, setUsers] = useState([]);
  const { currentEvent } = useContext(EventContext);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {
          data: { all_subscribers },
        } = await axiosInstance.get(`/events/${currentEvent}/inscricoes`);
        setUsers(all_subscribers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao buscar usuários");
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
        <>
          <Title title="Sorteio de Inscritos" />
          <Raffle data={users} />
        </>
      )}
    </>
  );
};

export default Sorteio;
