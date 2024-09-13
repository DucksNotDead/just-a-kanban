import { useBoard } from 'entities/board';
import { IUser, useUsersApi, usersContext } from 'entities/user';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { usePending } from 'shared/utils';

interface IProps {
  children: ReactNode;
}

export function UsersContextProvider({ children }: IProps) {
  const usersApi = useUsersApi();
  const { board } = useBoard();
  const [usersPending, setUsersPending] = usePending()
  const [users, setUsers] = useState<IUser[]>([]);

  const getUser = useCallback(
    (id: number) => users.find((user) => user.id === id),
    [users],
  );

  useEffect(() => {
    setUsersPending(() => true);
    (board ? usersApi.getUsersInBoard(board.slug) : usersApi.adminGetUsers())
      .then((data) => {
        setUsers(() => data ?? []);
      })
      .finally(() => setUsersPending(() => false));
  }, [board]);

  return (
    <usersContext.Provider value={{ users, usersPending, getUser }}>
      {children}
    </usersContext.Provider>
  );
}
