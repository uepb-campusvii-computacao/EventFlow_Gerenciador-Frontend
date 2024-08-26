import { Prisma, TipoAtividade } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { findActivityById } from "./activityRepository";
import { RegisterParticipanteParams } from "./eventRepository";

export async function createUserAtividade(
  uuid_user: string,
  uuid_atividade: string
) {
  await prisma.userAtividade.create({
    data: {
      uuid_user,
      uuid_atividade,
    },
  });
}

export async function registerUserInActivities(
  tx: Prisma.TransactionClient,
  user_uuid: string,
  atividades: RegisterParticipanteParams['atividades'],
) {
  const activities_ids = [
    atividades?.minicurso_id,
    atividades?.workshop_id,
    atividades?.oficina_id,
  ];

  for (const uuid_atividade of activities_ids) {
    if (uuid_atividade) {
      const activity = await tx.atividade.findUnique({
        where: {
          uuid_atividade,
        },
      });

      if (!activity) {
        throw new Error("Atividade não encontrada");
      }

      const count = await tx.userAtividade.count({
        where: {
          uuid_atividade,
        },
      });

      if (activity.max_participants && count >= activity.max_participants) {
        throw new Error(`A atividade ${activity.nome} está cheia`);
      }

      await tx.userAtividade.create({
        data: {
          uuid_user: user_uuid,
          uuid_atividade,
        },
      });
    }
  }
}

export async function changeUserAtividade(
  uuid_atividade_atual: string,
  uuid_atividade_nova: string,
  uuid_user: string
) {
  await prisma.userAtividade.updateMany({
    where: {
      uuid_user,
      uuid_atividade: uuid_atividade_atual,
    },
    data: {
      uuid_atividade: uuid_atividade_nova,
    },
  });

  console.log("Atualizada com sucesso!");
}

export async function findActivitiesByUserId(uuid_user: string) {
  const response = await prisma.userAtividade.findMany({
    where: {
      uuid_user,
    },
    select: {
      atividade: {
        select: {
          uuid_atividade: true,
          nome: true,
          tipo_atividade: true,
        },
      },
      presenca: true,
    },
    orderBy: {
      atividade: {
        tipo_atividade: "asc",
      },
    },
  });

  return response.map((item) => ({
    ...item.atividade,
    presenca: item.presenca,
  }));
}

export async function findUserAtividadeById(
  uuid_atividade: string,
  uuid_user: string
) {
  const activity = await prisma.userAtividade.findUnique({
    where: {
      uuid_user_uuid_atividade: {
        uuid_atividade,
        uuid_user,
      },
    },
  });

  return activity;
}

export async function changeActivity(
  uuid_user: string,
  uuid_atividade_atual: string,
  uuid_atividade_nova: string
) {
  await prisma.userAtividade.update({
    where: {
      uuid_user_uuid_atividade: {
        uuid_atividade: uuid_atividade_atual,
        uuid_user,
      },
    },
    data: {
      uuid_atividade: uuid_atividade_nova,
    },
  });
}

export async function findAllSubscribersInActivityExceptCurrentUser(
  uuid_atividade: string,
  exclude_user_id: string
) {
  const subscribers = await prisma.userAtividade.findMany({
    where: {
      uuid_atividade,
      uuid_user: {
        not: exclude_user_id,
      },
    },
    select: {
      uuid_user: true,
      presenca: true,
      user: {
        select: {
          nome: true,
          email: true,
          nome_cracha: true,
        },
      },
    },
    orderBy: {
      user: {
        nome: 'asc'
      }
    }
  });

  return subscribers;
}

export async function findAllSubscribersInActivity(uuid_atividade: string) {
  const subscribers = await prisma.userAtividade.findMany({
    where: {
      uuid_atividade,
      user: {
        userInscricao: {
          some: {
            status_pagamento: {
              in: ["REALIZADO", "GRATUITO"],
            }
          },
        },
      },
    },
    select: {
      uuid_user: true,
      presenca: true,
      user: {
        select: {
          nome: true,
          email: true,
          nome_cracha: true,
        },
      },
    },
    orderBy: {
      user: {
        nome: 'asc'
      },
    },
  });

  return subscribers;
}

export const deleteAllActivityByUserAndType = async (
  userId: string,
  activityType: TipoAtividade
) => {
  await prisma.userAtividade.deleteMany({
    where: {
      uuid_user: userId,
      atividade: {
        tipo_atividade: activityType,
      },
    },
  });
};

export async function checkIfActivityHasVacancy(
  activityId: string,
  userId: string
): Promise<void> {
  const activity = await findActivityById(activityId);

  if (!activity) {
    throw new Error("Atividade inválida!");
  }

  if (activity.max_participants) {
    const totalParticipants = (
      await findAllSubscribersInActivityExceptCurrentUser(activityId, userId)
    ).length;

    if (totalParticipants >= activity.max_participants) {
      throw new Error(`A atividade ${activity.nome} já está esgotada.`);
    }
  }
}

export async function replaceActivity(
  userId: string,
  activityId: string,
  activityType: TipoAtividade
): Promise<void> {
  await checkIfActivityHasVacancy(activityId, userId);

  await deleteAllActivityByUserAndType(userId, activityType);

  await prisma.userAtividade.create({
    data: {
      uuid_user: userId,
      uuid_atividade: activityId,
    },
  });
}

export async function changePresencaValueInActivity(
  uuid_atividade: string,
  uuid_user: string,
  presenca_value: boolean
) {
  await prisma.userAtividade.update({
    where: {
      uuid_user_uuid_atividade: {
        uuid_atividade,
        uuid_user,
      },
    },
    data: {
      presenca: presenca_value,
    },
  });
}
