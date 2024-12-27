import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PrivateRoute } from './auth/components/PrivateRoute';
import { LoginFormPage } from './auth/pages/LoginFormPage';
import { NotFoundPage } from './auth/pages/NotFoundPage';
import { EventPage } from './events/pages/EventPage';
import { LotesPage } from './lots/pages/LotsPage';
import { EventRafflePage } from './events/pages/EventRafflePage';
import { EventRegistrationPage } from './events/pages/EventRegistrationPage';
import { EventSubscribersPage } from './events/pages/EventSubscribersPage';
import { EditParticipantPage } from './events/pages/EditParticipantPage';
import { ActivityPage } from './activities/pages/ActivityPage';
import { EditActivityPage } from './activities/pages/EditActivityPage';
import { ActivityPresencePage } from './activities/pages/ActivityPresencePage';

import { paths } from './paths';
import { Dashboard } from './core/components/dashboard';
import { AppLayout } from './core/layout/app-layout';

export function RoutesWrapper() {
  return (
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
          <Route element={<AppLayout />}>
            <Route path={paths.home} element={<Dashboard />} />
            <Route
              path={paths.credenciamento}
              element={<EventRegistrationPage />}
            />
            <Route path={paths.eventos} element={<EventPage />} />
            <Route path={paths.lotes} element={<LotesPage />} />
            <Route path={paths.inscritos} element={<EventSubscribersPage />} />
            <Route
              path={`${paths.participante}/editar/:user_id`}
              element={<EditParticipantPage />}
            />
            <Route path={paths.atividades} element={<ActivityPage />} />
            <Route
              path={`${paths.atividades}/:id`}
              element={<ActivityPresencePage />}
            />
            <Route
              path={`${paths.atividades}/editar/:atividade_id`}
              element={<EditActivityPage />}
            />
            <Route
              path={`${paths.inscritos}/sorteio`}
              element={<EventRafflePage />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
