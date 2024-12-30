import { Download, Search } from 'lucide-react';

import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { TypeOfActivityEnum } from '@/activities/domain/entities/activityEntity';

export function ActivityTableFilters() {
  return (
    <form className='flex items-center gap-2'>
      <span className='text-sm font-semibold'>Filtros:</span>
      <Input placeholder='Pesquise por atividade' className='h-8 w-[350px]' />
      <Select defaultValue='all'>
        <SelectTrigger className='h-8 w-[180px]'>
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Todas Atividades</SelectItem>
          <SelectItem value={TypeOfActivityEnum.MINICURSO}>
            Minicurso
          </SelectItem>
          <SelectItem value={TypeOfActivityEnum.OFICINA}>Oficina</SelectItem>
          <SelectItem value={TypeOfActivityEnum.PALESTRA}>Palestra</SelectItem>
          <SelectItem value={TypeOfActivityEnum.WORKSHOP}>Workshop</SelectItem>
        </SelectContent>
      </Select>

      <Button type='submit' variant='secondary' size='sm'>
        <Search className='mr-2 h-4 w-4' />
        Filtrar resultados
      </Button>

      <Button type='button' size='sm'>
        <Download className='mr-2 h-4 w-4' />
        Baixar planilha
      </Button>
      {/*
      <Button type='button' variant='outline' size='sm'>
        <X className='mr-2 h-4 w-4' />
        Remover filtros
      </Button> */}
    </form>
  );
}

/* <div className='mb-4 flex w-full flex-col items-center justify-center gap-4 sm:mb-8 sm:flex-row sm:gap-12'>
{tiposAtividades.map(tipo => (
  <button
    key={tipo}
    onClick={() => filtrarAtividades(tipo)}
    className={`w-full hover:bg-blue-900 ${
      tipoAtividadeSelecionada === tipo
        ? 'bg-blue-900'
        : 'bg-indigo-500'
    } rounded-md px-4 py-3 text-center text-3xl font-bold shadow-md transition-colors`}
  >
    {tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()}
  </button>
))}
</div> */

/* <div className='mb-3 mt-3 flex w-full flex-col items-end'>
<button
  onClick={convertToXLSX}
  className='rounded-md bg-green-500 px-4 py-2 text-white'
  disabled={!tipoAtividadeSelecionada}
>
  Exportar XLSX
</button>
</div> */

// const [tipoAtividadeSelecionada, setTipoAtividadeSelecionada] =
//   useState<TypeActivity | null>(null);

// function filtrarAtividades(tipoAtividade: TypeActivity) {
//   let atividadesFiltradas: (minicurso | workshop | oficina | palestra)[] = [];

//   switch (tipoAtividade) {
//     case TypeActivity.MINICURSO:
//       atividadesFiltradas = data.minicurso || [];
//       break;
//     case TypeActivity.WORKSHOP:
//       atividadesFiltradas = data.workshop || [];
//       break;
//     case TypeActivity.OFICINA:
//       atividadesFiltradas = data.oficina || [];
//       break;
//     case TypeActivity.PALESTRA:
//       atividadesFiltradas = data.palestra || [];
//       break;
//   }

//   setAtividadesExibidas(atividadesFiltradas);
//   setTipoAtividadeSelecionada(tipoAtividade);
// }

// const convertToXLSX = () => {
//   const excelData = data.map(item => ({
//     Atividade: item.nome,
//     'Vagas Máximas': item.max_participants || 0,
//     'Tipo de Atividade': tipoAtividadeSelecionada,
//   }));

//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.json_to_sheet(excelData);

//   worksheet['!cols'] = [{ wch: 70 }, { wch: 15 }, { wch: 20 }];

//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Atividades');

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: 'xlsx',
//     type: 'array',
//   });

//   const blob = new Blob([excelBuffer], {
//     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
//   });

//   const link = document.createElement('a');
//   link.href = window.URL.createObjectURL(blob);
//   link.setAttribute('download', `${tipoAtividadeSelecionada}S.xlsx`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
