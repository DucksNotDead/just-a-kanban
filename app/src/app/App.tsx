import './theme/index.css';

import { BrowserRouter } from 'react-router-dom';

import { AntDConfigProvider } from './providers/AntDConfigProvider';
import { AppRouter } from './providers/AppRouter';
import { BoardContextProvider } from './providers/BoardContextProvider';
import { UserContextProvider } from './providers/UserContextProvider';

export function App() {
  return (
    <AntDConfigProvider>
      <BrowserRouter>
        <UserContextProvider>
          <BoardContextProvider>
            <AppRouter />
          </BoardContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </AntDConfigProvider>
  );
}
