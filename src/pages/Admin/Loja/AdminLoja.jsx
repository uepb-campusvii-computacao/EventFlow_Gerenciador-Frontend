import axiosInstance from "@/axiosInstance";
import ProductCard from "@/components/AdminModule/Cards/ProductCard";
import Title from "@/components/ui/Title";
import EventContext from "@/context/Event/EventContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const getProdutosDataEndpoint = (event_id) => {
  return `/events/${event_id}/produtos`;
};

const AdminLoja = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentEvent } = useContext(EventContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          getProdutosDataEndpoint(currentEvent)
        );

        const mappedResponse = data.map((item) => {
          return {
            descricao: item.descricao,
            estoque: item.estoque,
            imagem_url: item.imagem_url,
            nome: item.nome,
            preco: item.preco,
            uuid_produto: item.uuid_produto,
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
    <div className="py-8">
      <Title title={"Produtos"}/>
      <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-16">
        {
            tableData.map((item) => (
                <ProductCard key={item.uuid_produto} {...item}/>                
            ))
        }
      </div>
    </div>
  );
};

export default AdminLoja;
