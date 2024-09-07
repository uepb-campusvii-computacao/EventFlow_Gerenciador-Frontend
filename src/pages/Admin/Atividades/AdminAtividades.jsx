import axiosInstance from "@/axiosInstance";
import AtividadesTable from "@/components/AdminModule/Tables/AtividadesTable";
import Title from "@/components/ui/Title";
import EventContext from "@/context/Event/EventContext";
import Loading from "@/pages/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const getAtividadesDataEndpoint = (event_id) => {
  return `/admin/events/${event_id}/atividades`;
};

const AdminAtividades = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentEvent } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await axiosInstance.get(getAtividadesDataEndpoint(currentEvent))

        const mappedResponse = data.map(item => {
          return {
            id: item.uuid_atividade,
            name: item.nome,
            max_participants: item.max_participants,
            inscricoes: item._count.userAtividade,
            tipo_atividade: item.tipo_atividade
          }
        })

        setTableData(mappedResponse);
      }catch (error) {
        console.error("Erro ao buscar inscritos:", error);
        toast.error("Erro ao buscar inscritos.");
      }
      setIsLoading(false);
    }

    fetchData();
  }, [currentEvent])

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <div className="md:px-8 pb-8">
            <Title title="Atividades"/>
            <AtividadesTable data={tableData} />
          </div>
        )
      }
    </>
  );
};

export default AdminAtividades;
