import { prisma } from "../lib/prisma";
import { createPaymentUserResgistration } from "../services/payments/createPaymentUserRegistration";
import { isUserRegisteredInLote } from "./loteRepository";
import { registerUserInActivities } from "./userAtividadeRepository";
import { createUserInscricao } from "./userInscricaoRepository";
import { createUser } from "./userRepository";

export interface RegisterParticipanteParams {
  nome: string;
  nome_cracha: string;
  email: string;
  instituicao: string;
  atividades?: {
    minicurso_id?: string;
    workshop_id?: string;
    oficina_id?: string;
  };
  lote_id: string;
}

export async function registerParticipante({
  nome,
  nome_cracha,
  email,
  instituicao,
  atividades,
  lote_id,
}: RegisterParticipanteParams) {
  return await prisma.$transaction(async (tx) => {
    const user = await createUser(tx, {
      nome,
      nome_cracha,
      email,
      instituicao,
    });

    if (await isUserRegisteredInLote(tx, user.uuid_user, lote_id)) {
      throw new Error("Você já se cadastrou nesse evento!");
    }

    await registerUserInActivities(tx, user.uuid_user, atividades);

    const { payment_id, expiration_date } = await createPaymentUserResgistration(tx, user.uuid_user, lote_id);

    return await createUserInscricao(tx, user.uuid_user, lote_id, payment_id, expiration_date);
  });
}

export async function findAllActivitiesInEvent(uuid_evento: string) {
  const activities = await prisma.evento.findFirst({
    where: {
      uuid_evento,
    },
    select: {
      atividade: {
        select: {
          uuid_atividade: true,
          nome: true,
          max_participants: true,
          tipo_atividade: true,
          _count: {
            select: {
              userAtividade: true,
            },
          },
        },
        orderBy: {
          nome: "asc",
        },
      },
    },
  });

  return activities;
}

export async function getEventoPrecoById(uuid_evento: string) {
  const evento = await prisma.evento.findUniqueOrThrow({
    where: {
      uuid_evento,
    },
    select: {
      lote: {
        select: {
          preco: true,
        },
      },
    },
  });

  return evento.lote;
}

export async function findAllEvents() {
  const response = await prisma.evento.findMany();

  return response;
}

export async function countUsuariosCredenciadosByEvento(idEvento: string) {
  const totalUsuariosCredenciados = await prisma.userInscricao.count({
    where: {
      credenciamento: true,
      lote: {
        evento: {
          uuid_evento: idEvento
        }
      }
    }
  });
  
  return totalUsuariosCredenciados;
}

async function findPagamentoByUserID(user_id : string) {
  try {
    const pagamentos = await prisma.pagamento.findMany({
      where: {
        uuid_user: user_id,
      },
    });
    return pagamentos;
  } catch (error) {
    throw error;
  }
}