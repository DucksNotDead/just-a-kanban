import './theme/index.css';

import { BrowserRouter } from 'react-router-dom';

import { AntDConfigProvider } from './providers/AntDConfigProvider';
import { AppRouter } from './providers/AppRouter';
import { BoardContextProvider } from './providers/BoardContextProvider';
import { SlicesContextProvider } from './providers/SlicesContextProvider';
import { SocketContextProvider } from './providers/SocketContextProvider';
import { UserContextProvider } from './providers/UserContextProvider';
import { UsersContextProvider } from './providers/UsersContextProvider';

export function App() {
  return (
    <AntDConfigProvider>
      <BrowserRouter>
        <UserContextProvider>
          <BoardContextProvider>
            <SocketContextProvider>
              <UsersContextProvider>
                <SlicesContextProvider>
                  <AppRouter />
                </SlicesContextProvider>
              </UsersContextProvider>
            </SocketContextProvider>
          </BoardContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </AntDConfigProvider>
  );
}
