import { TypeOfActivityEnum } from '@/activities/domain/entities/activityEntity';

import { Button } from '@/core/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { Textarea } from '@/core/components/ui/textarea';

export function EditActivityModal() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar atividade!</DialogTitle>
        <DialogDescription>
          Atividade: {crypto.randomUUID().toString()}
        </DialogDescription>
      </DialogHeader>
      <div className='space-x-4'>
        <form>
          <div className='mb-4'>
            <Label
              htmlFor='name'
              className='mb-2 font-bold text-muted-foreground dark:text-white'
            >
              Nome
            </Label>
            <Input
              type='name'
              id='name'
              // {...register('email', { required: 'O e-mail é obrigatório' })}
              placeholder='Nome'
            />
            {/* @TODO: adicionar erros quando adicionar react hook form e zod */}
            {/* {errors.email ? (
              <p className='mx-1 mt-1 text-xs text-rose-600'>
                {errors.email.message}
              </p>
            ) : null} */}
          </div>

          <div className='mb-4'>
            <Label
              className='mb-2 font-bold text-muted-foreground dark:text-white'
              htmlFor='description'
            >
              Descrição
            </Label>
            <Textarea placeholder='Informe a descrição' />
          </div>

          <div className='mb-4 grid w-full grid-cols-2 gap-2'>
            <div>
              <Label
                className='mb-2 font-bold text-muted-foreground dark:text-white'
                htmlFor='typeActivity'
              >
                Tipo de atividade
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TypeOfActivityEnum.MINICURSO}>
                    Minicurso
                  </SelectItem>
                  <SelectItem value={TypeOfActivityEnum.OFICINA}>
                    Oficina
                  </SelectItem>
                  <SelectItem value={TypeOfActivityEnum.PALESTRA}>
                    Palestra
                  </SelectItem>
                  <SelectItem value={TypeOfActivityEnum.WORKSHOP}>
                    Workshop
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                className='mb-2 font-bold text-muted-foreground dark:text-white'
                htmlFor='description'
              >
                Quantidade de vagas ofertadas
              </Label>
              <Input type='number' />
            </div>
          </div>

          <div>
            <Button className='w-full' type='submit'>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
