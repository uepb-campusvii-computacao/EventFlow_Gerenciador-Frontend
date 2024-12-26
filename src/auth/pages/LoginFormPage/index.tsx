import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Eye, EyeOff } from 'lucide-react';
import logo from '../../../assets/images/logo.png';

import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from '@/core/components/ui/button';
import { Label } from '@/core/components/ui/label';
import { Input } from '@/core/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';

const logInForm = z.object({
  email: z.string().email(),
  senha: z.string().min(4),
});

type LogInForm = z.infer<typeof logInForm>;

export function LoginFormPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LogInForm>({
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data: LogInForm) => {
    await login(data);
    navigate('/');
  };

  return (
    <div className='grid min-h-screen grid-cols-2'>
      <div className='flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground'>
        <div className='flex items-center'>
          <img className='w-35 h-10' src={logo} alt='Logo' />
        </div>
        <footer className='text-sm'>
          Gerenciador de eventos dos parceiros &copy; event.flow -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      <div className='flex flex-col items-center justify-center bg-gradient-to-b from-[#7C3AED] to-purple-950'>
        <Card className='flex w-[450px] flex-col justify-center gap-2'>
          <CardHeader className='flex flex-col items-start justify-start gap-2'>
            <CardTitle>Entre!</CardTitle>
            <CardDescription>
              O melhor gerenciador de eventos da região!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <Label
                  htmlFor='email'
                  className='mb-2 block font-bold text-gray-700'
                >
                  E-mail
                </Label>
                <Input
                  type='email'
                  id='email'
                  {...register('email', { required: 'O e-mail é obrigatório' })}
                  placeholder='Seu e-mail'
                />
                {errors.email && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className='relative'>
                <Label
                  htmlFor='senha'
                  className='mb-2 block font-bold text-gray-700'
                >
                  Senha
                </Label>

                <Input
                  type={passwordVisibility ? 'text' : 'password'}
                  id='senha'
                  {...register('senha', { required: 'A senha é obrigatória' })}
                  placeholder='Sua senha'
                />
                <button
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                  className='absolute right-0 top-0 h-full px-3 py-7 hover:bg-transparent'
                  type='button'
                >
                  {passwordVisibility ? (
                    <EyeOff aria-hidden='true' size={24} />
                  ) : (
                    <Eye aria-hidden='true' size={24} />
                  )}
                </button>
                {errors.senha && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.senha.message}
                  </p>
                )}
              </div>

              <div className='flex items-center justify-center pt-6'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                >
                  Entrar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
