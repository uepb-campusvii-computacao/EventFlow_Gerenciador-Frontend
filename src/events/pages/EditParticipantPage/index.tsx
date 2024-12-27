import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Trash } from '@phosphor-icons/react';
import { FaSpinner } from 'react-icons/fa';

import { Loading } from '../../../core/components/Loading';
import { Title } from '../../../core/components/Title';
import { Modal } from '../../../core/components/Modal';

import { deleteUserDataEndpoint } from '../../utils/participants/loadDeleteParticipantEndpoint';
import { getParticipantDataEndpoint } from '../../utils/participants/loadGetParticipantEndpoint';
import { getFormDataEndpoint } from '../../utils/participants/loadGetParticipantFormEndpoint';
import { editParticipantDataEndpoint } from '../../utils/participants/loadEditParticipantEndpoint';

import { useEventsContext } from '../../hooks/useEventsContext';
import { api } from '@/core/lib/axios';

export function EditParticipantPage() {
  const { user_id } = useParams() as { user_id: string };
  const { currentEvent } = useEventsContext();
  const [atividades, setAtividades] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    mode: 'all',
  });

  async function handleDeleteUser() {
    await api.delete(deleteUserDataEndpoint(user_id));

    navigate('/inscritos');
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: user } = await api.get(
        getParticipantDataEndpoint(currentEvent.uuid_evento, user_id)
      );

      const { data: activities } = await api.get(
        getFormDataEndpoint(currentEvent.uuid_evento)
      );

      await Promise.all([user, activities]);

      setAtividades(activities);

      const {
        personal_user_information: { nome, nome_cracha, email, instituicao },
        status_pagamento,
        atividades,
      } = user;

      setValue('nome', nome);
      setValue('nome_cracha', nome_cracha);
      setValue('email', email);
      setValue('instituicao', instituicao);
      setValue('status_pagamento', status_pagamento);

      const oficina = atividades.find(a => a.tipo_atividade === 'OFICINA');
      const minicurso = atividades.find(a => a.tipo_atividade === 'MINICURSO');
      const workshop = atividades.find(a => a.tipo_atividade === 'WORKSHOP');

      setValue('oficina', oficina ? oficina.uuid_atividade : '');
      setValue('minicurso', minicurso ? minicurso.uuid_atividade : '');
      setValue('workshop', workshop ? workshop.uuid_atividade : '');

      setIsLoading(false);
    };

    fetchData();
  }, [setValue, user_id, currentEvent]);

  async function onSubmit(data) {
    try {
      await api.put(editParticipantDataEndpoint(user_id), {
        ...data,
      });
      toast.success('Participante Atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar participante!');
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='mx-auto max-w-3xl'>
      <Title title='Editar Usuário' />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex max-w-3xl flex-col gap-10 rounded-lg bg-white p-7 text-black shadow'
      >
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-bold'>Dados Pessoais</h2>
          <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
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
                htmlFor='nome_cracha'
                className='mb-2 block text-sm font-bold text-gray-900'
              >
                Nome Cracha
              </label>
              <input
                required
                type='text'
                id='nome_cracha'
                placeholder='Nome no crachá'
                className={`${
                  isSubmitting ? 'blurred' : ''
                } input h-10 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                {...register('nome_cracha', { required: true })}
                disabled={isSubmitting}
              />
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='email'
                className='mb-2 block text-sm font-bold text-gray-900'
              >
                E-Mail
              </label>
              <input
                required
                type='email'
                id='email'
                placeholder='Email'
                className={`${
                  isSubmitting ? 'blurred' : ''
                } input h-10 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                {...register('email', { required: true })}
                disabled={isSubmitting}
              />
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='instituicao'
                className='mb-2 block text-sm font-bold text-gray-900'
              >
                Instituição
              </label>
              <input
                required
                type='text'
                id='instituicao'
                placeholder='Instituição'
                className={`${
                  isSubmitting ? 'blurred' : ''
                } input h-10 rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
                {...register('instituicao', { required: true })}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-lg font-bold'>Atividades</p>
          <div className='flex w-full flex-col gap-4'>
            <select
              className={`${
                isSubmitting ? 'blurred' : ''
              } select rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
              {...register('minicurso')}
              disabled={isSubmitting}
            >
              <option value=''>Minicurso...</option>
              {Array.isArray(atividades) &&
                atividades
                  .filter(a => a.tipo_atividade === 'MINICURSO')
                  .map(minicurso => (
                    <option
                      key={minicurso.uuid_atividade}
                      value={minicurso.uuid_atividade}
                    >
                      {minicurso.nome} - Vagas{' '}
                      {`(${minicurso._count.userAtividade}/${minicurso.max_participants})`}
                    </option>
                  ))}
            </select>
            <select
              className={`${
                isSubmitting ? 'blurred' : ''
              } select rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
              {...register('workshop')}
              disabled={isSubmitting}
            >
              <option value=''>Workshop...</option>
              {Array.isArray(atividades) &&
                atividades
                  .filter(a => a.tipo_atividade === 'WORKSHOP')
                  .map(workshop => (
                    <option
                      key={workshop.uuid_atividade}
                      value={workshop.uuid_atividade}
                    >
                      {workshop.nome} - Vagas{' '}
                      {`(${workshop._count.userAtividade}/${workshop.max_participants})`}
                    </option>
                  ))}
            </select>
            <select
              className={`${
                isSubmitting ? 'blurred' : ''
              } select rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
              {...register('oficina')}
              disabled={isSubmitting}
            >
              <option value=''>Oficina...</option>
              {Array.isArray(atividades) &&
                atividades
                  .filter(a => a.tipo_atividade === 'OFICINA')
                  .map(oficina => (
                    <option
                      key={oficina.uuid_atividade}
                      value={oficina.uuid_atividade}
                    >
                      {oficina.nome} - Vagas{' '}
                      {`(${oficina._count.userAtividade}/${oficina.max_participants})`}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <div className='space-y-2'>
          <p className='text-lg font-bold'>Status de Pagamento</p>
          <select
            {...register('status_pagamento')}
            className={`${
              isSubmitting ? 'blurred' : ''
            } select rounded border border-gray-300 bg-white p-3 text-gray-900 shadow`}
          >
            <option value=''>Selecione o Status de Pagamento...</option>
            <option value='PENDENTE'>Pendente</option>
            <option value='REALIZADO'>Realizado</option>
            <option value='EXPIRADO'>Expirado</option>
            <option value='GRATUITO'>Gratuito</option>
          </select>
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

          <button
            type='button'
            onClick={() => setOpen(true)}
            disabled={isSubmitting}
            className='btn-primary inline-flex h-10 w-60 items-center justify-center rounded bg-red-500 font-bold text-white'
          >
            {isSubmitting ? (
              <>
                <FaSpinner className='mr-2 animate-spin' />
                Aguarde...
              </>
            ) : (
              'Excluir usuario'
            )}
          </button>
        </div>
      </form>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='w-56 text-center'>
          <Trash size={56} className='mx-auto text-red-500' />
          <div className='mx-auto my-4 w-48'>
            <h3 className='text-lg font-black text-gray-800'>Confirm Delete</h3>
            <p className='text-sm text-gray-500'>
              Você realmente quer excluir esse item?
            </p>
          </div>
          <div className='flex gap-4'>
            <button
              onClick={() => handleDeleteUser()}
              className='w-full rounded-md bg-red-500 px-3 py-2'
            >
              Excluir
            </button>
            <button
              className='w-full rounded-md bg-blue-300 px-3 py-2'
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
