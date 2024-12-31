import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Button } from '@/core/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';

import { StatusPagamento } from '@/events/domain/entities/subscribersEntity';

export function EditParticipantModal() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar participante!</DialogTitle>
        <DialogDescription>
          Edite algo do participante selecionado!
        </DialogDescription>
      </DialogHeader>
      <div className='space-x-4'>
        <form>
          <div className='mb-2'>
            <Label
              htmlFor='name'
              className='mb-2 font-bold text-muted-foreground dark:text-white'
            >
              Nome
            </Label>
            <Input
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

          <div className='mb-2'>
            <Label
              htmlFor='badgeName'
              className='mb-2 font-bold text-muted-foreground dark:text-white'
            >
              Nome do crachá
            </Label>
            <Input
              id='badgeName'
              // {...register('email', { required: 'O e-mail é obrigatório' })}
              placeholder='Nome do crachá'
            />
            {/* @TODO: adicionar erros quando adicionar react hook form e zod */}
            {/* {errors.email ? (
              <p className='mx-1 mt-1 text-xs text-rose-600'>
                {errors.email.message}
              </p>
            ) : null} */}
          </div>

          <div className='mb-2'>
            <Label
              htmlFor='email'
              className='mb-2 font-bold text-muted-foreground dark:text-white'
            >
              E-mail
            </Label>
            <Input
              id='email'
              // {...register('email', { required: 'O e-mail é obrigatório' })}
              placeholder='E-mail'
            />
            {/* @TODO: adicionar erros quando adicionar react hook form e zod */}
            {/* {errors.email ? (
              <p className='mx-1 mt-1 text-xs text-rose-600'>
                {errors.email.message}
              </p>
            ) : null} */}
          </div>

          <div className='mb-2'>
            <Label
              htmlFor='institution'
              className='mb-2 font-bold text-muted-foreground dark:text-white'
            >
              Instituição
            </Label>
            <Input
              id='institution'
              // {...register('email', { required: 'O e-mail é obrigatório' })}
              placeholder='Instituição'
            />
            {/* @TODO: adicionar erros quando adicionar react hook form e zod */}
            {/* {errors.email ? (
              <p className='mx-1 mt-1 text-xs text-rose-600'>
                {errors.email.message}
              </p>
            ) : null} */}
          </div>

          <div className='mb-4 flex flex-col gap-2'>
            {/* @TODO: esses selects serão feitas reqs pro backend para pegar informações das atividades */}
            <div>
              <Label className='mb-2 font-bold text-muted-foreground dark:text-white'>
                Atividades
              </Label>
              <div className='flex flex-col gap-2'>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Minicurso'></SelectValue>
                  </SelectTrigger>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='WorkShop'></SelectValue>
                  </SelectTrigger>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Oficina'></SelectValue>
                  </SelectTrigger>
                </Select>
              </div>
            </div>

            <div className='w-[180px]'>
              <Label
                className='mb-2 font-bold text-muted-foreground dark:text-white'
                htmlFor='paymentStatus'
              >
                Status de pagamento
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={StatusPagamento.FREE}>Gratuito</SelectItem>
                  <SelectItem value={StatusPagamento.PENDING}>
                    Pendente
                  </SelectItem>
                  <SelectItem value={StatusPagamento.REALIZED}>
                    Realizado
                  </SelectItem>
                  <SelectItem value={StatusPagamento.EXPIRED}>
                    Expirado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <Button type='submit'>Salvar</Button>

            <Button className='bg-rose-500 hover:bg-rose-700' type='button'>
              Excluir participante
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
