import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Eye, EyeSlash } from '@phosphor-icons/react';
import logo from '../../../assets/images/logo.png';

import { useAuthContext } from '../../hooks/useAuthContext';
import { IUserDataLogin } from '../../domain/entities/userEntity';

export function LoginFormPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserDataLogin>({
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data: IUserDataLogin) => {
    await login(data);
    navigate('/');
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-sm rounded-lg bg-white p-8 shadow-lg'>
        <img className='py-10' src={logo} alt='Logo' />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block font-bold text-gray-700'
            >
              E-mail
            </label>
            <input
              type='email'
              id='email'
              {...register('email', { required: 'O e-mail é obrigatório' })}
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder='Seu e-mail'
            />
            {errors.email && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className='relative mb-6'>
            <label
              htmlFor='senha'
              className='mb-2 block font-bold text-gray-700'
            >
              Senha
            </label>
            <input
              type={passwordVisibility ? 'text' : 'password'}
              id='senha'
              {...register('senha', { required: 'A senha é obrigatória' })}
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                errors.senha ? 'border-red-500' : ''
              }`}
              placeholder='Sua senha'
            />
            <button
              onClick={() => setPasswordVisibility(!passwordVisibility)}
              className='absolute right-4 top-[42px] text-black'
              type='button'
            >
              {passwordVisibility ? <EyeSlash size={24} /> : <Eye size={24} />}
            </button>
            {errors.senha && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.senha.message}
              </p>
            )}
          </div>

          <div className='flex items-center justify-center pt-6'>
            <button
              type='submit'
              className='focus:shadow-outline rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none'
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
