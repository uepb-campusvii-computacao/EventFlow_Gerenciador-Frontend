export function NotFoundPage() {
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
      <div className='mx-auto max-w-screen-sm text-center'>
        <h1 className='text-primary-600 text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
          404
        </h1>
        <p className='mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl'>
          Página não encontrada.
        </p>
        <p className='mb-4 text-lg font-light'>
          Desculpe, o recurso que você está procurando foi removido ou não
          existe.
        </p>
        <a
          href='/'
          className='inline-flex rounded bg-blue-900 p-3 text-white shadow-sm hover:bg-blue-700'
        >
          Voltar para página inicial!
        </a>
      </div>
    </div>
  );
}
