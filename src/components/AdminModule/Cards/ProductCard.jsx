import { MagnifyingGlass, NotePencil } from "@phosphor-icons/react";

const ProductCard = ({
  descricao,
  estoque,
  imagem_url,
  nome,
  preco,
  uuid_produto,
}) => {
  return (
    <div className="text-black w-[250px] rounded-md bg-white p-4 flex flex-col items-center gap-4 shadow-3xl">
      <h2 className="text-3xl font-bold text-indigo-700">{nome}</h2>
      <img
        className="h-[200px] w-auto rounded-md"
        src={imagem_url}
        alt={nome}
      />
      <p className="text-gray-700 text-base font-light">{descricao}</p>
      <div className="w-full flex justify-between pt-2 border-t border-dashed border-t-black">
        <div className="flex flex-col">
          <span className="text-lg font-black text-indigo-700">
            R$ {preco.toFixed(2)}
          </span>
          <span className="text-sm font-light text-gray-800">
            Estoque: {estoque}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a href={`/loja/produto/${uuid_produto}/editar`} className="w-8 h-8 flex items-center justify-center rounded-md text-white bg-green-500 cursor-pointer hover:bg-green-700 transition-colors">
            <NotePencil size={24}/>
          </a>
          <a href={`/loja/compras/${uuid_produto}`} className="w-8 h-8 flex items-center justify-center rounded-md text-white bg-indigo-500 cursor-pointer hover:bg-indigo-700 transition-colors">
            <MagnifyingGlass size={24}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
