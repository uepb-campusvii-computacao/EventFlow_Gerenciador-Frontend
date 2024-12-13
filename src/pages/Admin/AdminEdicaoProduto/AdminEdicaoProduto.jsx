import axiosInstance from '../../../axiosInstance';
import Title from '@/components/ui/Title';
import Loading from '@/pages/Loading/Loading';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const fetchProductDataEndpoint = produto_id => {
  return `/loja/produtos/${produto_id}`;
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
    mode: 'all',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get(
        fetchProductDataEndpoint(produto_id)
      );

      setProduct(data);

      setValue('nome', data.nome);
      setValue('descricao', data.descricao);
      setValue('estoque', data.estoque);
      setValue('preco', data.preco.toFixed(2));

      setIsLoading(false);
    };

    fetchData();
  }, [setValue, produto_id]);

  async function onSubmit(data) {
    console.log(data);
    try {
      await axiosInstance.put(fetchProductDataEndpoint(produto_id), {
        ...data,
        imagem_url: product.imagem_url,
      });
      toast.success('Produto Atualizado!');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao atualizar produto!');
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='mx-auto max-w-3xl'>
      <Title title='Editar Produto' />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex max-w-3xl flex-col gap-10 rounded-lg bg-white p-7 text-black shadow'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center gap-8 sm:flex-row'>
              <img
                className='h-[250px] w-[250px] rounded-full border-[8px] border-indigo-800'
                src={product.imagem_url}
                alt={product.nome}
              />
              <div className='flex w-full flex-col gap-4'>
                <div className='flex w-full flex-col'>
                  <label
                    htmlFor='nome'
                    className='mb-2 block text-sm font-bold text-gray-900'
                  >
                    Nome
                  </label>
                  <input
                    required
                    type='text'
                    id='nome'
                    placeholder='Nome'
                    className={`${
                      isSubmitting ? 'blurred' : ''
                    } input h-10 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                    {...register('nome', { required: true })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className='flex w-full flex-col'>
                  <label
                    htmlFor='descricao'
                    className='mb-2 block text-sm font-bold text-gray-900'
                  >
                    Descrição
                  </label>
                  <textarea
                    required
                    type='text'
                    id='descricao'
                    placeholder='descricao'
                    className={`${
                      isSubmitting ? 'blurred' : ''
                    } input h-40 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                    {...register('descricao', { required: true })}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8 sm:flex-row'>
              <div className='flex w-full flex-col'>
                <label
                  htmlFor='estoque'
                  className='mb-2 block text-sm font-bold text-gray-900'
                >
                  Estoque
                </label>
                <input
                  required
                  type='number'
                  id='estoque'
                  placeholder='Estoque'
                  className={`${
                    isSubmitting ? 'blurred' : ''
                  } input h-10 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                  {...register('estoque', { required: true })}
                  disabled={isSubmitting}
                />
              </div>

              <div className='flex w-full flex-col'>
                <label
                  htmlFor='preco'
                  className='mb-2 block text-sm font-bold text-gray-900'
                >
                  Valor
                </label>
                <input
                  required
                  type='text'
                  inputMode='numeric'
                  id='preco'
                  placeholder='valor'
                  className={`${
                    isSubmitting ? 'blurred' : ''
                  } input h-10 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                  {...register('preco', { required: true })}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn-primary inline-flex h-10 w-60 items-center justify-center rounded bg-green-400 font-bold text-white'
          >
            {isSubmitting ? (
              <>
                <FaSpinner className='mr-2 animate-spin' />
                Aguarde...
              </>
            ) : (
              'Salvar'
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminEdicaoProduto;
