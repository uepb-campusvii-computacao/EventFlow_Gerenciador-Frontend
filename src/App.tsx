import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './components/AdminModule/Layout/Layout';
import AdminEdicaoAtividade from './pages/Admin/AdminEdicaoAtividade/AdminEdicaoAtividade';
import AdminEdicaoEvento from './pages/Admin/AdminEdicaoEvento/AdminEdicaoEvento';
import AdminEdicaoProduto from './pages/Admin/AdminEdicaoProduto/AdminEdicaoProduto';
import AdminEdicaoUsuario from './pages/Admin/AdminEdicaoUsuario/AdminEdicaoUsuario';
import AdminInscritosEvento from './pages/Admin/AdminInscritosEvento/AdminInscritosEvento';
import AdminPresencaAtividade from './pages/Admin/AdminPresencaAtividade/AdminPresencaAtividade';
import AdminAtividades from './pages/Admin/Atividades/AdminAtividades';
import AdminCredenciamento from './pages/Admin/Credenciamento/AdminCredenciamento';
import Eventos from './pages/Admin/Eventos/Eventos';
import AdminHome from './pages/Admin/Home/AdminHome';
import AdminCompradores from './pages/Admin/Loja/AdminCompradores';
import AdminCompras from './pages/Admin/Loja/AdminCompras';
import AdminLoja from './pages/Admin/Loja/AdminLoja';
import Lotes from './pages/Admin/Lotes/Lotes';
import Sorteio from './pages/Admin/Sorteio/Sorteio';
import { paths } from './paths';
import { AuthProvider } from './auth/hooks/useAuthContext';
import { PrivateRoute } from './auth/components/PrivateRoute';
import { LoginFormPage } from './auth/pages/LoginFormPage';
import { NotFoundPage } from './auth/pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position='top-right'
          autoClose={1500}
          limit={3}
          closeOnClick
          pauseOnHover
        />

        <Routes>
          <Route path='/login' element={<LoginFormPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path={paths.home} element={<AdminHome />} />
              <Route
                path={paths.credenciamento}
                element={<AdminCredenciamento />}
              />
              <Route path={paths.eventos} element={<Eventos />} />
              <Route path={paths.lotes} element={<Lotes />} />
              <Route
                path={paths.inscritos}
                element={<AdminInscritosEvento />}
              />
              <Route path={paths.atividades} element={<AdminAtividades />} />
              <Route
                path={`${paths.participante}/editar/:user_id`}
                element={<AdminEdicaoUsuario />}
              />
              <Route
                path={`${paths.eventos}/editar/:event_id`}
                element={<AdminEdicaoEvento />}
              />
              <Route
                path={`${paths.atividades}/:id`}
                element={<AdminPresencaAtividade />}
              />
              <Route
                path={`${paths.atividades}/editar/:atividade_id`}
                element={<AdminEdicaoAtividade />}
              />
              <Route path={paths.loja} element={<AdminLoja />} />
              <Route
                path={`${paths.loja}/produto/:produto_id/editar`}
                element={<AdminEdicaoProduto />}
              />
              <Route
                path={`${paths.loja}/compras/:produto_id`}
                element={<AdminCompradores />}
              />
              <Route
                path={`${paths.loja}/usuario/:user_id/compras/:produto_id`}
                element={<AdminCompras />}
              />
              <Route
                path={`${paths.inscritos}/sorteio`}
                element={<Sorteio />}
              />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
