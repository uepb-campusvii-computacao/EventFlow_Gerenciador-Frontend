import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "@/axiosInstance";
import Title from "@/components/ui/Title";
import Loading from "@/pages/Loading/Loading";

const fetchDataEndpoint = (atividade_id) => {
  return `/admin/atividades/${atividade_id}`;
};

const AdminEdicaoAtividade = () => {
  const { atividade_id } = useParams();
  const [atividade, setAtividade] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await axiosInstance.get(fetchDataEndpoint(atividade_id));

      setAtividade(response.data);

      const { nome, descricao, tipo_atividade, max_participants } =
        response.data;

      setValue("nome", nome);
      setValue("descricao", descricao);
      setValue("tipo_atividade", tipo_atividade);
      setValue("max_participants", max_participants);

      setIsLoading(false);
    };

    fetchData();
  }, [setValue, atividade_id]);

  async function onSubmit(data) {
    try {
      await axiosInstance.put(fetchDataEndpoint(atividade_id), {
        ...data,
      });
      toast.success("Atividade Atualizado!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar Atividade!");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="max-w-3xl mx-auto pb-8 sm:pb-16">
      <Title title="Editar Atividade" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 max-w-3xl mx-auto bg-white p-7 rounded-lg text-black shadow"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Dados Publicos</h2>
          <div className="grid gap-4 grid-cols-1">
            <div className="flex flex-col">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm text-gray-900 font-bold"
              >
                Nome
              </label>
              <input
                required
                type="text"
                id="first_name"
                placeholder="Nome"
                className={`${
                  isSubmitting ? "blurred" : ""
                } input text-gray-900 bg-white shadow border border-gray-300 rounded h-10 p-3`}
                {...register("nome", { required: true })}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="descricao"
                className="block mb-2 text-sm text-gray-900 font-bold"
              >
                Descricao
              </label>
              <textarea
                required
                type="text"
                id="descricao"
                placeholder="Descricao"
                className={`${
                  isSubmitting ? "blurred" : ""
                } input text-gray-900 bg-white shadow border border-gray-300 rounded h-40 p-3`}
                {...register("descricao", { required: true })}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 flex flex-col gap-4 items-center sm:flex-row">
          <div className="flex flex-col w-full">
            <label htmlFor="tipo_atividade" className="block mb-2 text-sm text-gray-900 font-bold">Tipo de atividade</label>
            <select
              {...register("tipo_atividade")}
              id="tipo_atividade"
              defaultValue={atividade.tipo_atividade}
              className={`${
                isSubmitting ? "blurred" : ""
              } text-gray-900 bg-white shadow border border-gray-300 rounded h-12 p-3`}
            >
              <option value="">Selecione o Tipo da Atividade...</option>
              <option value="MINICURSO">MINICURSO</option>
              <option value="WORKSHOP">WORKSHOP</option>
              <option value="OFICINA">OFICINA</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
              <label
                htmlFor="max_participants"
                className="block mb-2 text-sm text-gray-900 font-bold"
              >
                Quantidade de vagas ofertadas
              </label>
              <input
                required
                type="number"
                id="max_participants"
                placeholder="Nome"
                className={`${
                  isSubmitting ? "blurred" : ""
                } text-gray-900 bg-white shadow border border-gray-300 h-12 mb-2 rounded p-3`}
                {...register("max_participants", { required: true })}
                disabled={isSubmitting}
              />
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

export default AdminEdicaoAtividade;
