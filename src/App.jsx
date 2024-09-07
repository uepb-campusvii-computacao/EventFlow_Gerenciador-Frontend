import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import paths from "@/paths.js";
import AdminLayout from "./components/AdminModule/Layout/Layout";
import { AuthProvider } from "./context/Auth/AuthContext";
import PrivateRoute from "./context/Auth/PrivateRoute";
import AdminEdicaoAtividade from "./pages/Admin/AdminEdicaoAtividade/AdminEdicaoAtividade";
import AdminEdicaoProduto from "./pages/Admin/AdminEdicaoProduto/AdminEdicaoProduto";
import AdminEdicaoUsuario from "./pages/Admin/AdminEdicaoUsuario/AdminEdicaoUsuario";
import AdminInscritosEvento from "./pages/Admin/AdminInscritosEvento/AdminInscritosEvento";
import AdminPresencaAtividade from "./pages/Admin/AdminPresencaAtividade/AdminPresencaAtividade";
import AdminAtividades from "./pages/Admin/Atividades/AdminAtividades";
import AdminCredenciamento from "./pages/Admin/Credenciamento/AdminCredenciamento";
import Eventos from "./pages/Admin/Eventos/Eventos";
import AdminHome from "./pages/Admin/Home/AdminHome";
import AdminCompradores from "./pages/Admin/Loja/AdminCompradores";
import AdminCompras from "./pages/Admin/Loja/AdminCompras";
import AdminLoja from "./pages/Admin/Loja/AdminLoja";
import Sorteio from "./pages/Admin/Sorteio/Sorteio";
import LoginForm from "./pages/Login/LoginForm";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={1500} limit={3} closeOnClick pauseOnHover />
        
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route exact path={paths.home} element={<AdminHome />} />
              <Route exact path={paths.credenciamento}  element={<AdminCredenciamento />} />
              <Route exact path={paths.eventos} element={<Eventos />} />
              <Route exact path={paths.inscritos} element={<AdminInscritosEvento />} />
              <Route exact path={paths.atividades} element={<AdminAtividades />} />
              <Route exact path={`${paths.participante}/editar/:user_id`} element={<AdminEdicaoUsuario />} />
              <Route exact path={`${paths.atividades}/:id`} element={<AdminPresencaAtividade />} />
              <Route exact path={`${paths.atividades}/editar/:atividade_id`} element={<AdminEdicaoAtividade />} />
              <Route exact path={paths.loja} element={<AdminLoja />} />
              <Route exact path={`${paths.loja}/produto/:produto_id/editar`} element={<AdminEdicaoProduto />} />
              <Route exact path={`${paths.loja}/compras/:produto_id`} element={<AdminCompradores />} />
              <Route exact path={`${paths.loja}/usuario/:user_id/compras/:produto_id`} element={<AdminCompras />} />
              <Route exact path={`${paths.inscritos}/sorteio`} element={<Sorteio />} />
              <Route exact path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
