import { Router } from "express";
import {
  changeActivityPresencaValue,
  getActivityById,
  getSubscribersInActivity,
  upadateUserActivity,
  updateActivity,
} from "./controllers/activityController";
import {
  changeEventCredenciamentoValue,
  getAllActivitiesInEvent,
  getAllActivitiesInEventOrdenateByTipo,
  getAllEventsByIdUser,
  getAllFinancialInformationsInEvent,
  getAllProductsInEvent,
  getAllSubscribersInEvent,
  getFinancialInformation,
  getLotesInEvent,
  registerParticipanteInEvent,
  updateParticipantInformations,
} from "./controllers/eventController";
import {
  getProductInMarket,
  getUsersWithOrders,
  updateProductInMarket,
} from "./controllers/marketController";
import {
  createOrder,
  getOrders,
  getOrdersByUserAndProduct,
  realizarPagamentoVenda,
} from "./controllers/orderController";
import {
  deleteUser,
  getLoteIdAndUserId,
  getUserInEvent,
  getUserInformation,
  getUserInscricao,
  loginUser,
  realizarPagamento,
  updatePaymentStatus,
} from "./controllers/userController";
import { checkToken } from "./lib/ensureAuthenticate";

const routes = Router();

// Rotas Públicas (Mercardo)
routes.post("/marketplace", createOrder);
routes.get("/marketplace/user/:user_id", getOrders);
routes.post(
  "/marketplace/:pagamento_id/realizar-pagamento",
  realizarPagamentoVenda
);
routes.get("/events/:event_id/produtos", getAllProductsInEvent);

// Rotas Públicas
routes.post("/login", loginUser);
routes.get("/events/:event_id/lotes", getLotesInEvent);
routes.post("/register/:event_id", registerParticipanteInEvent);
routes.post("/events/:event_id/inscricoes/find", getLoteIdAndUserId);
routes.get("/lote/:lote_id/inscricoes/user/:user_id/", getUserInformation);
routes.post(
  "/lote/:lote_id/user/:user_id/realizar-pagamento",
  realizarPagamento
);
routes.get(
  "/events/:id_evento/atividades",
  getAllActivitiesInEventOrdenateByTipo
);
routes.get("/pagamento/user/:user_id/lote/:lote_id", getUserInscricao);

routes.get(
  "/admin/events/:id_evento/inscricoes/todos",
  getAllFinancialInformationsInEvent
);

// Rotas para usuários (com autenticação)
const userRoutes = Router();
userRoutes.use(checkToken);
userRoutes.get("/event/:event_id/inscricao/:user_id", getUserInEvent);
userRoutes.put("/admin/user/:user_id", updateParticipantInformations);
userRoutes.delete("/admin/user/:user_id", deleteUser);
userRoutes.put("/admin/lote/:lote_id/inscricoes/:user_id", updatePaymentStatus);

// Rotas para eventos (com autenticação)
const eventRoutes = Router();
eventRoutes.use(checkToken);
eventRoutes.get("/admin/events/:event_id/dashboard", getFinancialInformation);
eventRoutes.get("/admin/user/:user_id/events", getAllEventsByIdUser);
eventRoutes.get(
  "/admin/events/:id_evento/inscricoes",
  getAllSubscribersInEvent
);
eventRoutes.put(
  "/admin/events/:event_id/inscricoes/credenciamento/:user_id",
  changeEventCredenciamentoValue
);
eventRoutes.get("/admin/events/:id_evento/atividades", getAllActivitiesInEvent);

// Rotas para atividades (com autenticação)
const activityRoutes = Router();
activityRoutes.use(checkToken);
activityRoutes.get(
  "/admin/atividades/:id_atividade/inscricoes",
  getSubscribersInActivity
);
activityRoutes.get("/admin/atividades/:atividade_id", getActivityById);
activityRoutes.put("/admin/atividades/:atividade_id", updateActivity);
activityRoutes.put(
  "/admin/atividades/:atividade_id/inscricoes/:user_id/frequencia",
  changeActivityPresencaValue
);
activityRoutes.put(
  "/admin/user/:user_id/atividades/troca",
  upadateUserActivity
);

// Rotas para o mercado (com autenticação)
const marketRoutes = Router();
marketRoutes.use(checkToken);
marketRoutes.put("/admin/loja/produtos/:produto_id", updateProductInMarket);
marketRoutes.get("/admin/loja/produtos/:produto_id", getProductInMarket);
marketRoutes.get("/admin/loja/produtos/:produto_id/compradores", getUsersWithOrders);
marketRoutes.get("/admin/loja/usuario/:user_id/compras/produto/:produto_id", getOrdersByUserAndProduct);

// Monta os sub-routers no Router principal
routes.use("/", userRoutes);
routes.use("/", eventRoutes);
routes.use("/", activityRoutes);
routes.use("/", marketRoutes);

export default routes;
