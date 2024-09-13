import { App, Button } from 'antd';
import { IBoardWithUsers, useBoardsApi } from 'entities/board';
import { useCurrentUser } from 'entities/user';
import { DiamondPlus, LogOut, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appMessages, appRoutes } from 'shared/const';
import { IModalRef } from 'shared/types';
import { UsersList } from 'widgets/UsersList';

import { BoardEnterCard } from './BoardEnterCard';
import { BoardUpdateDialog } from './BoardUpdateDialog';

import Styles from './HomePage.module.scss';

export function HomePage() {
  const boardsApi = useBoardsApi();
  const navigate = useNavigate();
  const { user, logout } = useCurrentUser();
  const { modal } = App.useApp();
  const [boards, setBoards] = useState<IBoardWithUsers[]>([]);
  const [boardToUpdate, setBoardToUpdate] = useState<IBoardWithUsers | null>(
    null,
  );

  const boardUpdateModalRef = useRef<IModalRef>(null);
  const usersListRef = useRef<IModalRef>(null);

  const getBoard = useCallback(
    (boardSlug: string) => {
      return boards.find((b) => b.slug === boardSlug);
    },
    [boards],
  );

  const handleBoardClick = useCallback((boardSlug: string) => {
    navigate(appRoutes.board(boardSlug));
  }, []);

  const handleBoardChangeClick = useCallback(
    (boardSlug: string) => {
      const board = getBoard(boardSlug);
      if (board) {
        setBoardToUpdate(() => ({
          ...board,
          users: board.users.filter((u) => u.id !== user?.id),
          managers: board.managers.filter((mId) => mId !== user?.id),
        }));
      }
    },
    [getBoard, user],
  );

  const handleBoardDeleteClick = useCallback(
    (boardSlug: string) => {
      modal.warning({
        title: `Удалить доску ${getBoard?.name}?`,
        content: appMessages.confirm.delete,
        okText: 'Удалить',
        okButtonProps: { danger: true },
        onOk: () =>
          boardsApi.delete(boardSlug).then(() => {
            setBoards((prevState) =>
              prevState.filter((b) => b.slug !== boardSlug),
            );
          }),
      });
    },
    [getBoard],
  );

  const handleCreateBoardClick = useCallback(() => {
    boardUpdateModalRef.current?.open();
  }, []);

  const handleBoardCreated = useCallback((board: IBoardWithUsers) => {
    setBoards((prevState) => [...prevState, board]);
  }, []);

  const handleBoardUpdated = useCallback(
    (board: IBoardWithUsers) => {
      if (!user) {
        return;
      }
      setBoards((prevState) => {
        const index = prevState.findIndex((b) => b.id === board.id);
        return [
          ...prevState.slice(0, index),
          {
            ...board,
            users: [...board.users, user],
            managers: [...board.managers, user.id],
          },
          ...prevState.slice(index + 1),
        ];
      });
    },
    [user],
  );

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

  const handleLogout = useCallback(() => {
    modal.confirm({
      title: 'Вы уверены, что хотите выйти?',
      onOk: logout,
      okText: 'Выйти',
    });
  }, []);

  useEffect(() => {
    boardsApi
      .getAll()
      .then((data) => {
        if (data) {
          setBoards(() => data);
        }
      })
  }, []);

  useEffect(() => {
    if (boardToUpdate) {
      boardUpdateModalRef.current?.open();
    }
  }, [boardToUpdate]);

  return (
    <div className={Styles.HomePage}>
      <div className={Styles.AccountPanel}>
        <Button type={'text'} onClick={handleLogout}>
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
      </div>
      <div className={Styles.BoardsList}>
        {boards.length ? (
          boards.map((board) => (
            <BoardEnterCard
              key={board.id}
              board={board}
              onClick={handleBoardClick}
              onDelete={handleBoardDeleteClick}
              onChange={handleBoardChangeClick}
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
          <BoardUpdateDialog
            ref={boardUpdateModalRef}
            data={boardToUpdate}
            onCreated={handleBoardCreated}
            onUpdated={handleBoardUpdated}
            onClose={() => setBoardToUpdate(() => null)}
          />
          <UsersList ref={usersListRef} onDelete={handleUserDelete} />
        </>
      )}
    </div>
  );
}
