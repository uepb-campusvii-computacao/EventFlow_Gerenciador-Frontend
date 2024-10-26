import axiosInstance from "@/axiosInstance";
import CredenciamentoTable from "@/components/AdminModule/Tables/CredenciamentoTable";
import Title from "@/components/ui/Title";
import EventContext from "@/context/Event/EventContext";
import Loading from "@/pages/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const inscricoesEndpoint = (id_evento) => {
  return `/events/${id_evento}/inscricoes`;
};

const AdminCredenciamento = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentEvent } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          inscricoesEndpoint(currentEvent)
        );

        const mappedResponse = data.all_subscribers.map((item) => {
          return {
            id: item.uuid_user,
            name: item.nome,
            nome_cracha: item.nome_cracha,
            email: item.email,
            paymentStatus: item.status_pagamento,
            credential: item.credenciamento,
          };
        });

        setTableData(mappedResponse);
      } catch (error) {
        console.error("Erro ao buscar inscritos:", error);
        toast.error("Erro ao buscar inscritos.");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [currentEvent]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="md:px-8 pb-8">
          <Title title="Credenciamento" />
          <CredenciamentoTable
            data={tableData.filter((item) => item.paymentStatus === "REALIZADO" || item.paymentStatus === "GRATUITO")}
          />
        </div>
      )}
    </>
  );
};

export default AdminCredenciamento;
