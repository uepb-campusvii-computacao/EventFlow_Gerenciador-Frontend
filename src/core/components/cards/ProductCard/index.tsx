import { MagnifyingGlass, NotePencil } from '@phosphor-icons/react';

interface ProductCardProps {
  descricao: string;
  estoque: string;
  imagem_url: string;
  nome: string;
  preco: number;
  uuid_produto: string;
}

export function ProductCard({
  descricao,
  estoque,
  imagem_url,
  nome,
  preco,
  uuid_produto,
}: ProductCardProps) {
  return (
    <div className='flex w-[250px] flex-col items-center gap-4 rounded-md bg-white p-4 text-black shadow-3xl'>
      <h2 className='text-3xl font-bold text-indigo-700'>{nome}</h2>
      <img
        className='h-[200px] w-auto rounded-md'
        src={imagem_url}
        alt={nome}
      />
      <p className='text-base font-light text-gray-700'>{descricao}</p>
      <div className='flex w-full justify-between border-t border-dashed border-t-black pt-2'>
        <div className='flex flex-col'>
          <span className='text-lg font-black text-indigo-700'>
            R$ {preco.toFixed(2)}
          </span>
          <span className='text-sm font-light text-gray-800'>
            Estoque: {estoque}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <a
            href={`/loja/produto/${uuid_produto}/editar`}
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-green-500 text-white transition-colors hover:bg-green-700'
          >
            <NotePencil size={24} />
          </a>
          <a
            href={`/loja/compras/${uuid_produto}`}
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-indigo-500 text-white transition-colors hover:bg-indigo-700'
          >
            <MagnifyingGlass size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
