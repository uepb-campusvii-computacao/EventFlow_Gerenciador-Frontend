import { Link } from 'react-router-dom';
import { Edit, Search } from 'lucide-react';

import {
  IActivityEntity,
  TypeOfActivityEnum,
} from '@/activities/domain/entities/activityEntity';

import { Button } from '@/core/components/ui/button';
import { TableCell, TableRow } from '@/core/components/ui/table';
import { Dialog, DialogTrigger } from '@/core/components/ui/dialog';
import { EditActivityModal } from '../EditActivityModal';

interface ActivityTableRowsProps {
  item: IActivityEntity;
}

export function ActivityTableRows({ item }: ActivityTableRowsProps) {
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          {/* pensar numa estilização melhor para isso */}
          {item.typeOfActivity === TypeOfActivityEnum.MINICURSO ? (
            <span className='w-[80px] p-0.5 text-center text-xs font-medium'>
              Minicurso
            </span>
          ) : item.typeOfActivity === TypeOfActivityEnum.OFICINA ? (
            <span className='w-[80px] p-0.5 text-center text-xs font-medium'>
              Oficina
            </span>
          ) : item.typeOfActivity === TypeOfActivityEnum.PALESTRA ? (
            <span className='w-[80px] p-0.5 text-center text-xs font-medium'>
              Palestra
            </span>
          ) : (
            <span className='w-[80px] p-0.5 text-center text-xs font-medium'>
              Workshop
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>{`${item.registrationCount}/${item.maxParticipants}`}</TableCell>
      <TableCell>
        <Button asChild variant='outline'>
          <Link to={`/atividades/${item.activityId}`}>
            <Search className='h-4 w-4' />
          </Link>
        </Button>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <Edit className='h-4 w-4' />
            </Button>
          </DialogTrigger>

          <EditActivityModal />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
