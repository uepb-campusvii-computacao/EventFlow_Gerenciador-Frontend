import { TipoAtividade } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { RegisterUserRequestParams } from "../interfaces/registerUserRequestParam";
import { findActivitiesInEvent } from "../repositories/activityRepository";
import {
  countUsuariosCredenciadosByEvento,
  findAllActivitiesInEvent,
  findAllEvents,
  registerParticipante,
} from "../repositories/eventRepository";
import { getLotesAtivosByEventID } from "../repositories/loteRepository";
import { getTotalValueVendasByEvento } from "../repositories/orderRepository";
import { findAllProductsByEventId } from "../repositories/productRepository";
import {
  changeCredenciamentoValue,
  findAllEventsByUserId,
  findAllSubscribersInEvent,
  findUserInscricaoByEventId,
  findUserInscriptionStatus,
  projectionTableCredenciamento,
  updateParticipante,
} from "../repositories/userInscricaoRepository";
import { getPayment } from "../services/payments/getPayment";

export async function registerParticipanteInEvent(req: Request, res: Response) {
  try {
    const {
      nome,
      email,
      instituicao,
      nome_cracha,
      atividades,
      lote_id,
    }: RegisterUserRequestParams = req.body;

    const user = await registerParticipante({
      nome,
      email,
      instituicao,
      nome_cracha,
      atividades,
      lote_id,
    });

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    } else {
      return res.status(400).json(error);
    }
  }
}

export async function getLotesInEvent(req: Request, res: Response) {
  try {
    const { event_id } = req.params;

    const lotes_in_event = await getLotesAtivosByEventID(event_id);

    return res.status(200).json(lotes_in_event);
  } catch (error) {
    return res.status(400).send("informações inválidas");
  }
}

export async function updateParticipantInformations(
  req: Request,
  res: Response
) {
  try {
    const { user_id } = req.params;

    const {
      nome,
      nome_cracha,
      email,
      instituicao,
      status_pagamento,
      minicurso,
      workshop,
      oficina,
    } = req.body;

    const activities: { id: string; type: TipoAtividade }[] = [];

    if (minicurso) {
      activities.push({ id: minicurso, type: "MINICURSO" });
    }

    if (workshop) {
      activities.push({ id: workshop, type: "WORKSHOP" });
    }

    if (oficina) {
      activities.push({ id: oficina, type: "OFICINA" });
    }

    const updatedUser = await updateParticipante(
      user_id,
      nome,
      nome_cracha,
      email,
      instituicao,
      status_pagamento,
      activities
    );

    return res.status(200).json({
      message: "Dados alterados com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar informações do usuário:", error);

    let errorMessage = "Erro ao atualizar dados do usuário.";
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        errorMessage = "Este e-mail já está em uso.";
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({ message: errorMessage });
  }
}

export async function getAllEvents(req: Request, res: Response) {
  const all_events = await findAllEvents();

  res.send(all_events);
}

export async function getAllProductsInEvent(req: Request, res: Response) {
  try {
    const { event_id } = req.params;

    const response = await findAllProductsByEventId(event_id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getAllEventsByIdUser(req: Request, res: Response) {
  try {
    const { user_id } = req.params;

    const eventos = await findAllEventsByUserId(user_id);

    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(400).send("Informação incorreta");
  }
}

export async function getAllSubscribersInEvent(req: Request, res: Response) {
  try {
    const { id_evento } = req.params;

    const all_subscribers = await projectionTableCredenciamento(id_evento);

    if (!all_subscribers) {
      return res.status(400).send("Evento não encontrado");
    }

    return res.status(200).json({ all_subscribers });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}

export async function getAllFinancialInformationsInEvent(
  req: Request,
  res: Response
) {
  try {
    const { id_evento } = req.params;

    const all_subscribers = await findAllSubscribersInEvent(id_evento);

    if (!all_subscribers) {
      return res.status(400).send("Evento não encontrado");
    }

    const response = await Promise.all(all_subscribers.map(async (item) => {
      let transaction_data = null;
      if (item.id_payment_mercado_pago) {
        try {
          transaction_data = await getPayment(item.id_payment_mercado_pago);
        } catch (error) {
          console.error("Erro ao obter dados do pagamento:", error);
        }
      }

      return {
        uuid_user: item.uuid_user,
        nome: item.usuario.nome,
        email: item.usuario.email,
        mercado_pago_id: item.id_payment_mercado_pago,
        status_pagamento: item.status_pagamento,
        status: transaction_data ? transaction_data.status : "",
        date_created: transaction_data ? transaction_data.date_created : "",
        data_approved: transaction_data ? transaction_data.date_approved : "",
      };
    }));

    return res.status(200).json(response);
  } catch (error) {
    console.error("Erro na solicitação:", error);
    return res.status(500).send("Ocorreu um erro ao processar a solicitação.");
  }
}


export async function changeEventCredenciamentoValue(
  req: Request,
  res: Response
) {
  try {
    const { event_id, user_id } = req.params;

    const user_inscricao = await findUserInscricaoByEventId(user_id, event_id);

    await changeCredenciamentoValue(
      user_id,
      user_inscricao!.uuid_lote,
      !user_inscricao?.credenciamento
    );

    return res.status(200).send("Valor Alterado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Informações inválidas");
  }
}

export async function getAllActivitiesInEvent(req: Request, res: Response) {
  try {
    const { id_evento } = req.params;

    const all_activities = await findAllActivitiesInEvent(id_evento);

    if (!all_activities) {
      return res.status(400).send("Evento não encontrado");
    }

    return res.status(200).json(all_activities.atividade);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getAllActivitiesInEventOrdenateByTipo(
  req: Request,
  res: Response
) {
  try {
    const { id_evento } = req.params;

    const minicursos = await findActivitiesInEvent(id_evento, "MINICURSO");
    const oficinas = await findActivitiesInEvent(id_evento, "OFICINA");
    const workshops = await findActivitiesInEvent(id_evento, "WORKSHOP");

    return res.status(200).json({
      minicursos,
      oficinas,
      workshops,
    });
  } catch (error) {
    return res.status(400).send("Informações invalidas!");
  }
}

export async function getFinancialInformation(req: Request, res: Response) {
  try {
    const { event_id } = req.params;

    const [userInscriptions, totalArrecadadoVendas, credenciados] =
      await Promise.all([
        findUserInscriptionStatus(event_id),
        getTotalValueVendasByEvento(event_id),
        countUsuariosCredenciadosByEvento(event_id),
      ]);

    const usersRegistered = userInscriptions.length;
    const usersWithPaymentStatusPending = userInscriptions.filter(
      (inscricao) => inscricao.status_pagamento === "PENDENTE"
    ).length;

    const usersWithPaymentStatusGratuito = userInscriptions.filter(
      (inscricao) => inscricao.status_pagamento === "GRATUITO"
    ).length;

    const usersWithPaymentStatusRealizado = userInscriptions.filter(
      (inscricao) => inscricao.status_pagamento === "REALIZADO"
    );

    const totalArrecadadoInscricoes = usersWithPaymentStatusRealizado.reduce(
      (total, curr) => total + curr.lote.preco,
      0
    );

    return res.status(200).json({
      total_inscritos: usersRegistered,
      total_credenciados: credenciados,
      total_arrecadado: { totalArrecadadoInscricoes, totalArrecadadoVendas },
      inscricoes_pendentes: usersWithPaymentStatusPending,
      inscricoes_gratuitas: usersWithPaymentStatusGratuito,
    });
  } catch (error) {
    console.error("Erro ao obter informações financeiras:", error);
    return res
      .status(500)
      .json({ error: "Erro ao obter informações financeiras" });
  }
}
