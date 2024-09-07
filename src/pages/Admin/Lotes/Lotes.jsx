import axiosInstance from "@/axiosInstance";
import LotesTable from "@/components/AdminModule/Tables/LotesTable";
import Title from "@/components/ui/Title";
import EventContext from "@/context/Event/EventContext";
import Loading from "@/pages/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const lotesEndpoint = (id_evento) => {
  return `/events/${id_evento}/all/lotes`;
};

const AdminLotesEvento = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentEvent } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      
      try {
        const lotesResponse = await axiosInstance.get(lotesEndpoint(currentEvent));
        
        const mappedResponse = lotesResponse.data.map((item) => ({
          id: item.uuid_lote,
          nome: item.nome,
          descricao: item.descricao || 'Não disponível',
          preco: item.preco,
          ativo: item.ativo
        }));
    
        setTableData(mappedResponse);
      } catch (error) {
        console.error("Erro ao buscar lotes:", error);
        toast.error("Erro ao buscar lotes.");
      } finally {
        setIsLoading(false);
      }
    }

    if (currentEvent) {
      fetchData();
    }
  }, [currentEvent]);  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="md:px-8 pb-8">
          <Title title="Lotes" />
          <LotesTable data={tableData} />
        </div>
      )}
    </>
  );
};

export default AdminLotesEvento;