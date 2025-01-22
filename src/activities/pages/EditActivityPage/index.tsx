import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IActivityDataEditFormEntity } from '../../domain/entities/activityEntity';
import { api } from '@/core/lib/axios';
import { Title } from '@/core/components/ui/title';
import { Spinner } from '@/core/components/spinner';

const fetchDataEndpoint = (atividade_id: string) => {
  return `/atividades/${atividade_id}`;
};

export function EditActivityPage() {
  const { atividade_id } = useParams() as { atividade_id: string };
  const [atividade, setAtividade] = useState<IActivityDataEditFormEntity>(
    {} as IActivityDataEditFormEntity
  );
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<IActivityDataEditFormEntity>({
    mode: 'all',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(fetchDataEndpoint(atividade_id));

      setAtividade(response.data);

      const { nome, descricao, tipo_atividade, max_participants } =
        response.data;

      setValue('nome', nome);
      setValue('descricao', descricao);
      setValue('tipo_atividade', tipo_atividade);
      setValue('max_participants', max_participants);

      setIsLoading(false);
    };

    fetchData();
  }, [setValue, atividade_id]);

  async function onSubmit(data: IActivityDataEditFormEntity) {
    try {
      await api.put(fetchDataEndpoint(atividade_id), {
        ...data,
      });
      toast.success('Atividade Atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar Atividade!');
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className='mx-auto max-w-3xl pb-8 sm:pb-16'>
      <Title>Editar atividade</Title>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex max-w-3xl flex-col gap-10 rounded-lg bg-white p-7 text-black shadow'
      >
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-bold'>Dados Públicos</h2>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex flex-col'>
              <label
                htmlFor='first_name'
                className='mb-2 block text-sm font-bold text-gray-900'
              >
                Nome
              </label>
              <input
                required
                type='text'
                id='first_name'
                placeholder='Nome'
                className={`${
                  isSubmitting ? 'blurred' : ''
                } input h-10 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                {...register('nome', { required: true })}
                disabled={isSubmitting}
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='descricao'
                className='mb-2 block text-sm font-bold text-gray-900'
              >
                Descricao
              </label>
              <textarea
                required
                id='descricao'
                placeholder='Descricao'
                className={`${
                  isSubmitting ? 'blurred' : ''
                } input h-40 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                {...register('descricao', { required: true })}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center gap-4 space-y-2 sm:flex-row'>
          <div className='flex w-full flex-col'>
            <label
              htmlFor='tipo_atividade'
              className='mb-2 block text-sm font-bold text-gray-900'
            >
              Tipo de atividade
            </label>
            <select
              {...register('tipo_atividade')}
              id='tipo_atividade'
              defaultValue={atividade.tipo_atividade}
              className={`${
                isSubmitting ? 'blurred' : ''
              } h-12 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
            >
              <option value=''>Selecione o Tipo da Atividade...</option>
              <option value='MINICURSO'>MINICURSO</option>
              <option value='WORKSHOP'>WORKSHOP</option>
              <option value='OFICINA'>OFICINA</option>
            </select>
          </div>
          <div className='flex w-full flex-col'>
            <label
              htmlFor='max_participants'
              className='mb-2 block text-sm font-bold text-gray-900'
            >
              Quantidade de vagas ofertadas
            </label>
            <input
              required
              type='number'
              id='max_participants'
              placeholder='Nome'
              className={`${
                isSubmitting ? 'blurred' : ''
              } mb-2 h-12 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
              {...register('max_participants', { required: true })}
              disabled={isSubmitting}
            />
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
}
