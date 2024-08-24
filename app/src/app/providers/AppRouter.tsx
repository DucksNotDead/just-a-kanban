import { useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { PAGE_TRANSITION_DURATION, appRoutes } from 'shared/const';

import { BoardKanbanPage } from '../../pages/BoardKanbanPage';
import { ErrorPage } from '../../pages/ErrorPage';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

const routes = [
  { path: '/', element: <Navigate to={appRoutes.home} replace /> },
  { path: appRoutes.login, element: <LoginPage /> },
  { path: appRoutes.home, element: <HomePage /> },
  { path: appRoutes.board(':boardSlug'), element: <BoardKanbanPage /> },
  { path: '*', element: <ErrorPage /> },
];

export function AppRouter() {
  const nodeRef = useRef(null);

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <SwitchTransition mode={'out-in'}>
              <CSSTransition
                key={route.path}
                nodeRef={nodeRef}
                classNames={'page-transition'}
                timeout={PAGE_TRANSITION_DURATION}
              >
                <div ref={nodeRef} className="page-transition">
                  {route.element}
                </div>
              </CSSTransition>
            </SwitchTransition>
          }
        />
      ))}
    </Routes>
  );
}
