import { App, Button } from 'antd';
import { BoardCard, IBoardWithUsers, useBoardsApi } from 'entities/board';
import { useCurrentUser } from 'entities/user';
import { BoardCreateDialog } from 'features/BoardCreateDialog';
import { DiamondPlus, LogOut, RotateCcw, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appMessages, appRoutes } from 'shared/const';
import { IModalRef } from 'shared/types';
import { UsersList } from 'widgets/UsersList';

import Styles from './HomePage.module.scss';

export function HomePage() {
  const { user, logout } = useCurrentUser();
  const boardsApi = useBoardsApi();
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const [boards, setBoards] = useState<IBoardWithUsers[]>([]);
  const [key, setKey] = useState(Math.random);
  const boardCreateModalRef = useRef<IModalRef>(null);
  const usersListRef = useRef<IModalRef>(null);

  const handleBoardClick = useCallback((boardSlug: string) => {
    navigate(appRoutes.board(boardSlug));
  }, []);

  const handleBoardDelete = useCallback(
    (boardSlug: string) => {
      modal.confirm({
        title: `Удалить доску ${boards.find((b) => b.slug === boardSlug)?.name}?`,
        content: appMessages.confirm.delete,
        onOk: () =>
          boardsApi.delete(boardSlug).then(() => {
            setBoards((prevState) =>
              prevState.filter((b) => b.slug !== boardSlug),
            );
          }),
      });
    },
    [boards],
  );

  const handleCreateBoardClick = useCallback(() => {
    boardCreateModalRef.current?.open();
  }, []);

  const handleUpdateClick = useCallback(() => {
    setKey(() => Math.random());
  }, []);

  const handleBoardCreated = useCallback((board: IBoardWithUsers) => {
    setBoards((prevState) => [...prevState, board]);
  }, []);

  const handleUserDelete = useCallback((userId: number) => {
    setBoards((prevState) => {
      return [
        ...prevState.map((board) => {
          return {
            ...board,
            users: board.users.filter((user) => user.id !== userId),
          };
        }),
      ];
    });
  }, []);

  useEffect(() => {
    boardsApi.getAll().then((data) => {
      if (data) {
        setBoards(() => data);
      }
    });
  }, [key]);

  return (
    <div className={Styles.HomePage}>
      <div className={Styles.AccountPanel}>
        <Button type={'text'} onClick={logout}>
          <LogOut />
        </Button>
        {!user?.isAdmin ? null : (
          <Button type={'text'} onClick={() => usersListRef.current?.open()}>
            <Users />
          </Button>
        )}
      </div>
      <div className={Styles.HomePageHeader}>
        <h1>доски</h1>
        {!user?.isAdmin || !boards.length ? null : (
          <Button type={'text'} onClick={handleCreateBoardClick}>
            <DiamondPlus />
          </Button>
        )}
        <Button type={'text'} onClick={handleUpdateClick}>
          <RotateCcw />
        </Button>
      </div>
      <div className={Styles.BoardsList}>
        {boards.length ? (
          boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onClick={handleBoardClick}
              onDelete={handleBoardDelete}
              isAdmin={user?.isAdmin}
            />
          ))
        ) : !user?.isAdmin ? null : (
          <Button onClick={handleCreateBoardClick}>
            <DiamondPlus />
            добавить
          </Button>
        )}
      </div>
      {!user?.isAdmin ? null : (
        <>
          <BoardCreateDialog
            ref={boardCreateModalRef}
            onCreated={handleBoardCreated}
          />
          <UsersList ref={usersListRef} onDelete={handleUserDelete} />
        </>
      )}
    </div>
  );
}
