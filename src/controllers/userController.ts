import { StatusPagamento } from "@prisma/client";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { FindLoteIdAnduserIdParams } from "../interfaces/findLoteIdAnduserIdParams";
import { UpdatePaymentStatusParams } from "../interfaces/updatePaymentStatusParams";
import { UserLoginParams } from "../interfaces/userLoginParams";
import { findLoteById } from "../repositories/loteRepository";
import { findActivitiesByUserId } from "../repositories/userAtividadeRepository";
import {
  changeStatusPagamento,
  findLoteIdAndUserIdByEmail,
  findUserInscricaoByEventId,
  findUserInscricaoById
} from "../repositories/userInscricaoRepository";
import { findUserByEmail, findUserById } from "../repositories/userRepository";
import { getPayment, getPaymentStatusForInscricao } from "../services/payments/getPayment";
import { checkPassword } from "../services/user/checkPassword";
import { deleteUserByUserId } from "../services/user/deleteUserByUserId";

export async function loginUser(req: Request, res: Response) {
  const params: UserLoginParams = req.body;

  const { email, senha } = params;

  const userExists = await findUserByEmail(email);

  if (!userExists) {
    return res.status(401).send("email não encontrado");
  }

  const password_encrypted = userExists.senha || "";

  const check_password = await checkPassword(senha, password_encrypted);

  if (!check_password) {
    return res.status(401).send("Senha inválida!");
  }

  const token = jsonwebtoken.sign(
    {
      id: userExists.uuid_user,
    },
    String(process.env.SECRET),
    {
      expiresIn: "12h",
    }
  );

  return res.status(200).json({ token: token, user_id: userExists.uuid_user });
}

export async function getLoteIdAndUserId(req: Request, res: Response) {
  try {
    const { event_id } = req.params;

    const { email }: FindLoteIdAnduserIdParams = req.body;

    const response = await findLoteIdAndUserIdByEmail(event_id, email);

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
    return res.status(400).send(error);
  }
}

export async function realizarPagamento(req: Request, res: Response) {
  try {
    const { lote_id, user_id } = req.params;
    const { action } = req.body;

    if (action === "payment.updated") {
      const status = await getPaymentStatusForInscricao(user_id, lote_id);

      console.log(status)
      if(status === StatusPagamento.REALIZADO){
        console.log("inicio");
        await changeStatusPagamento(user_id, lote_id, StatusPagamento.REALIZADO);
        console.log("fim");
      }else if(status === StatusPagamento.EXPIRADO){
        await changeStatusPagamento(user_id, lote_id, StatusPagamento.EXPIRADO);
      }

      console.log("alterado");
    }

    return res.status(200).send("Valor alterado");
  } catch (error) {
    return res.status(400).send("Informações inválidas");
  }
}

export async function getUserInformation(req: Request, res: Response) {
  try {
    const { user_id, lote_id } = req.params;

    const atividades = await findActivitiesByUserId(user_id);
    const user = await findUserById(user_id);
    const user_inscricao = await findUserInscricaoById(user_id, lote_id);
    const lote = await findLoteById(lote_id);

    const response = {
      user_name: user.nome,
      inscricao: {
        status: user_inscricao?.status_pagamento,
        nome_lote: lote.nome,
        preco: lote.preco,
      },
      atividades: atividades.map((atividade) => ({
        nome: atividade.nome,
        tipo: atividade.tipo_atividade,
      })),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getUserInscricao(req: Request, res: Response) {
  try {
    const { user_id, lote_id } = req.params;

    const user_inscricao = await findUserInscricaoById(user_id, lote_id)

    const payment = await getPayment(user_inscricao!.id_payment_mercado_pago);

    return res.status(200).json(payment);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getUserInEvent(req: Request, res: Response) {
  try {
    const { event_id, user_id } = req.params;

    const personal_user_information = await findUserById(user_id);

    const activities = await findActivitiesByUserId(user_id);

    const user_inscricao = await findUserInscricaoByEventId(user_id, event_id);

    const response = {
      personal_user_information: {
        uuid: personal_user_information.uuid_user,
        nome: personal_user_information.nome,
        nome_cracha: personal_user_information.nome_cracha,
        email: personal_user_information.email,
        instituicao: personal_user_information.instituicao,
      },
      atividades: activities,
      status_pagamento: user_inscricao?.status_pagamento,
      credenciamento: user_inscricao?.credenciamento,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).send("Informações inválidas");
  }
}

export async function updatePaymentStatus(req: Request, res: Response) {
  try {
    const { lote_id, user_id } = req.params;
    const { status_pagamento }: UpdatePaymentStatusParams = req.body;

    await changeStatusPagamento(lote_id, user_id, status_pagamento);

    res.status(200).send("Alterado com sucesso!");
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { user_id } = req.params;

    await deleteUserByUserId(user_id);

    return res.status(200).send("Usuario deletado");
  } catch (error) {
    return res.status(400).send(error);
  }
}
