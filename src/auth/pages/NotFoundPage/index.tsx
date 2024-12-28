import { Button } from '@/core/components/ui/button';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className='m-auto flex flex-col items-center'>
      <h1 className='text-primary-600 text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
        404
      </h1>
      <p className='mb-4 text-3xl font-bold tracking-tight md:text-4xl'>
        Página não encontrada.
      </p>
      <p className='mb-4 text-lg font-light'>
        Desculpe, o recurso que você está procurando foi removido ou não existe.
      </p>
      <Button asChild>
        <Link to='/'>Voltar para página inicial!</Link>
      </Button>
    </div>
  );
}
