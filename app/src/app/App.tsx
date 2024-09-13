import './theme/index.css';

import { BrowserRouter } from 'react-router-dom';

import { AntDConfigProvider } from './providers/AntDConfigProvider';
import { AppRouter } from './providers/AppRouter';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { BoardContextProvider } from './providers/BoardContextProvider';
import { SlicesContextProvider } from './providers/SlicesContextProvider';
import { SocketContextProvider } from './providers/SocketContextProvider';
import { StepsContextProvider } from './providers/StepsContextProvider';
import { TasksContextProvider } from './providers/TasksContextProvider';
import { UsersContextProvider } from './providers/UsersContextProvider';

export function App() {
  return (
    <AntDConfigProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <BoardContextProvider>
            <SocketContextProvider>
              <UsersContextProvider>
                <SlicesContextProvider>
                  <TasksContextProvider>
                    <StepsContextProvider>
                      <AppRouter />
                    </StepsContextProvider>
                  </TasksContextProvider>
                </SlicesContextProvider>
              </UsersContextProvider>
            </SocketContextProvider>
          </BoardContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </AntDConfigProvider>
  );
}
