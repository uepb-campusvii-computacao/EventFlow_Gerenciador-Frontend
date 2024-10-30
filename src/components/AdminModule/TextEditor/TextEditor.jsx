import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TextEditor from "../../../components/AdminModule/TextEditor/TextEditor";
// import axiosInstance from "@/axiosInstance";
import { useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import EventContext from "../../../context/Event/EventContext";

const extensions = [StarterKit];

// const fetchDataEndpoint = (atividade_id) => {
//   return `/admin/eventos/${atividade_id}`;
// };

const AdminEdicaoEvento = () => {
  const { getEventDataById } = useContext(EventContext);
  const { event_id } = useParams();
  const [htmlContent, setHtmlContent] = useState("");
  const [evento, setEvento] = useState({});
  // const {isLoading, setIsLoading} = useState({});

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose-sm max-w-full text-black bg-zinc-50 rounded-b-lg p-2 focus:outline-none w-full max-h-[400px] overflow-y-scroll",
      },
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    mode: "all",
  });

  async function onSubmit(data) {
    // try {
    //   await axiosInstance.put(fetchDataEndpoint(event_id), {
    //     ...data,
    //   });
    //   toast.success("Atividade Atualizado!");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Erro ao atualizar Atividade!");
    // }
    toast.info(
      "Ainda não temos podemos enviar nada pessoal, em fase experimental hehehe"
    );

    console.log(data);
    console.log(evento);
    console.log("JSON", editor.getJSON());
    console.log("HTML", editor.getHTML());
    setHtmlContent(editor.getHTML());
    console.log("TXT ", editor.getText());
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = getEventDataById(event_id);

      setEvento(response);

      const { nome, data } = response;

      setValue("nome", nome);
      setValue("data", data);

      // setIsLoading(false);
    };

    fetchData();
  }, [setValue, event_id, setEvento, getEventDataById]);

  return (
    <div className="w-full h-screen">
      <h1>esse é o id do evento {event_id}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 mx-auto bg-white p-7 rounded-lg text-black shadow"
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
              <TextEditor editor={editor} />
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
      {htmlContent && (
        <div className="w-full mt-4 p-4 border rounded-lg bg-gray-100 prose prose-lg">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      )}
    </div>
  );
};

export default AdminEdicaoEvento;