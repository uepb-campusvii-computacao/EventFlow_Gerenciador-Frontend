const NotFound = () => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Página não encontrada.</p>
            <p className="mb-4 text-lg font-light">Desculpe, o recurso que você está procurando foi removido ou não existe.</p>
            <a href="/" className="inline-flex text-white bg-blue-900 p-3 rounded shadow-sm hover:bg-blue-700">Voltar para home</a>
        </div>   
    </div>
    );
}

export default NotFound
