import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "@/axiosInstance";
import Title from "@/components/ui/Title";
import Loading from "@/pages/Loading/Loading";

const fetchProductDataEndpoint = (produto_id) => {
  return `/admin/loja/produtos/${produto_id}`;
};

const AdminEdicaoProduto = () => {
  const { produto_id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get(
        fetchProductDataEndpoint(produto_id)
      );

      setProduct(data);

      setValue("nome", data.nome);
      setValue("descricao", data.descricao);
      setValue("estoque", data.estoque);
      setValue("preco", data.preco.toFixed(2));

      setIsLoading(false);
    };

    fetchData();
  }, [setValue, produto_id]);

  async function onSubmit(data) {
    console.log(data)
    try {
      await axiosInstance.put(fetchProductDataEndpoint(produto_id), {
        ...data,
        imagem_url: product.imagem_url,
      });
      toast.success("Produto Atualizado!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar produto!");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="max-w-3xl mx-auto">
      <Title title="Editar Produto" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-3xl mx-auto bg-white p-7 rounded-lg text-black shadow"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
              <img
                className="rounded-full h-[250px] w-[250px] border-[8px] border-indigo-800"
                src={product.imagem_url}
                alt={product.nome}
              />
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="nome"
                    className="block mb-2 text-sm text-gray-900 font-bold"
                  >
                    Nome
                  </label>
                  <input
                    required
                    type="text"
                    id="nome"
                    placeholder="Nome"
                    className={`${
                      isSubmitting ? "blurred" : ""
                    } input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                    {...register("nome", { required: true })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="descricao"
                    className="block mb-2 text-sm text-gray-900 font-bold"
                  >
                    Descrição
                  </label>
                  <textarea
                    required
                    type="text"
                    id="descricao"
                    placeholder="descricao"
                    className={`${
                      isSubmitting ? "blurred" : ""
                    } input text-gray-900 bg-white shadow border border-gray-300 rounded h-40 p-3`}
                    {...register("descricao", { required: true })}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="estoque"
                  className="block mb-2 text-sm text-gray-900 font-bold"
                >
                  Estoque
                </label>
                <input
                  required
                  type="number"
                  id="estoque"
                  placeholder="Estoque"
                  className={`${
                    isSubmitting ? "blurred" : ""
                  } input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                  {...register("estoque", { required: true })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="preco"
                  className="block mb-2 text-sm text-gray-900 font-bold"
                >
                  Valor
                </label>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  id="preco"
                  placeholder="valor"
                  className={`${
                    isSubmitting ? "blurred" : ""
                  } input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                  {...register("preco", { required: true })}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary inline-flex items-center justify-center rounded h-10 bg-green-400 w-60 text-white font-bold"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Aguarde...
              </>
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminEdicaoProduto;
