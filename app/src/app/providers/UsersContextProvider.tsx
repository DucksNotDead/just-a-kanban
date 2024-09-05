import { useBoard } from 'entities/board';
import { IUser, useUsersApi, usersContext } from 'entities/user';
import { ReactNode, useCallback, useEffect, useState } from 'react';

interface IProps {
  children: ReactNode;
}

export function UsersContextProvider({ children }: IProps) {
  const usersApi = useUsersApi();
  const { board } = useBoard();
  const [pending, setPending] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  const getUser = useCallback(
    (id: number) => users.find((user) => user.id === id),
    [users],
  );

  useEffect(() => {
    setPending(() => true);
    (board ? usersApi.getUsersInBoard(board.slug) : usersApi.adminGetUsers())
      .then((data) => {
        data && setUsers(() => data);
      })
      .finally(() => setPending(() => false));
  }, [board]);

  return (
    <usersContext.Provider value={{ users, usersPending: pending, getUser }}>
      {children}
    </usersContext.Provider>
  );
}
