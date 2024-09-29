import axiosInstance from "@/axiosInstance";
import InscritosTable from "@/components/AdminModule/Tables/InscritosTable";
import Title from "@/components/ui/Title";
import EventContext from "@/context/Event/EventContext";
import Loading from "@/pages/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const inscricoesEndpoint = (id_evento) => {
  return `/events/${id_evento}/inscricoes`;
};

const AdminInscritosEvento = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentEvent } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);
  
  function gerarMapaDeCores(lotes) {
    const cores = ['text-black', 'text-green-500', 'text-red-500', 'text-blue-500', 'text-yellow-500']; // Adicione mais cores conforme necessário
    const coresMap = {};
    lotes.forEach((lote, index) => {
      coresMap[lote] = cores[index % cores.length];
    });
    return coresMap;
  }
  
  function gerarCorTexto(uuid_lote_atual, coresMap) {
    return coresMap[uuid_lote_atual] || 'text-gray-500';
  }
  
  useEffect(() => {
      async function fetchData(events, setTableData, setIsLoading) {
        setIsLoading(true);
        
        try {
          const inscricoesResponse = await axiosInstance.get(inscricoesEndpoint(currentEvent));
          
          const uuid_lotes = inscricoesResponse.data.all_subscribers.map((item) => (item.uuid_lote));

          const lotes = [...new Set(uuid_lotes)];
          
          const coresMap = gerarMapaDeCores(lotes);
          
          const mappedResponse = inscricoesResponse.data.all_subscribers.map((item) => {
            const cor_texto = gerarCorTexto(item.uuid_lote, coresMap);
            return {
              id: item.uuid_user,
              name: item.nome,
              email: item.email,
              cor_texto,
              nome_cracha: item.nome_cracha,
              paymentStatus: item.status_pagamento,
              credential: item.credenciamento,
            };
          });
      
          setTableData(mappedResponse);
        } catch (error) {
          console.error("Erro ao buscar inscritos:", error);
          toast.error("Erro ao buscar inscritos.");
        } finally {
          setIsLoading(false);
        }
      }

    fetchData(currentEvent, setTableData, setIsLoading);
  }, [currentEvent]);  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="md:px-8 pb-8">
          <Title title="Inscrições" />
          <InscritosTable data={tableData} />
        </div>
      )}
    </>
  );
};

export default AdminInscritosEvento;
