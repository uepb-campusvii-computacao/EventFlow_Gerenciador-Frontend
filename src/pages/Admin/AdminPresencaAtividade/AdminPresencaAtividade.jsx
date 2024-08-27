import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/axiosInstance";
import PresencaTable from "@/components/AdminModule/Tables/PresencaTable";
import Title from "@/components/ui/Title";
import Loading from "@/pages/Loading/Loading";

const AdminPresencaAtividade = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async (activityId) => {
    try {
      const response = await axiosInstance.get(`/admin/atividades/${activityId}/inscricoes`);

      const mappedData = response.data.map((inscrito) => ({
        id: inscrito.uuid_user,
        name: inscrito.nome,
        email: inscrito.email,
        presenca: inscrito.presenca,
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Erro ao buscar dados de inscritos:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (    
    <>
      {
        isLoading ? (
          <Loading />
        ) : (          
          <div className="md:px-8 pb-8">
            <Title title="Registrar Presença" />
            <PresencaTable data={data} atividadeId={id} />
          </div>
        )
      }
    </>
  );
};

export default AdminPresencaAtividade;

