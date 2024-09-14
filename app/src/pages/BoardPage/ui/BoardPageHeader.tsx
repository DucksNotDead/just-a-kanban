import { Button, Input } from 'antd';
import { useBoard } from 'entities/board';
import { ISlice, SliceSelect } from 'entities/slice';
import { IUser, UserAvatar, UserSelect, useCurrentUser } from 'entities/user';
import { House, Plus } from 'lucide-react';
import { Dispatch, FormEvent, RefObject, SetStateAction, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHOSEN_BOARD_KEY, appRoutes } from 'shared/const';
import { ITaskDetailRef } from 'widgets/TaskDetail';

import { IBoardPageFilters } from '../model/types/boardPageTypes';

import Styles from './BoardPageHeader.module.scss';

interface IProps {
  setFilters: Dispatch<SetStateAction<IBoardPageFilters>>;
  taskDetailDialogRef: RefObject<ITaskDetailRef>;
}

export function BoardPageHeader({ setFilters, taskDetailDialogRef }: IProps) {
  const { user } = useCurrentUser();
  const { board, hasManagerAccess } = useBoard();
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    localStorage.removeItem(CHOSEN_BOARD_KEY);
    navigate(appRoutes.home);
  }, []);

  const handleCreateClick = useCallback(() => {
    taskDetailDialogRef.current?.open(null);
  }, []);

  const handeSearch = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      setFilters((prevState) => ({
        ...prevState,
        search: target.value.trimStart().trimEnd(),
      }));
    },
    [setFilters],
  );

  const handleSliceSelect = useCallback(
    (slice: ISlice | null) => {
      setFilters((prevState) => ({ ...prevState, slice: slice?.id }));
    },
    [setFilters],
  );

  const handleUserSelect = useCallback(
    (users: IUser[]) => {
      setFilters((prevState) => ({ ...prevState, user: users[0]?.id }));
    },
    [setFilters],
  );

  return (
    <div className={Styles.BoardKanbanPageHeader}>
      <div className={Styles.Item}>
        <Button onClick={handleBackClick} type={'text'} icon={<House />} />
        <Input
          variant={'filled'}
          placeholder={'поиск...'}
          onInput={handeSearch}
        />
        {!hasManagerAccess ? null : (
          <Button type={'primary'} onClick={handleCreateClick}>
            <Plus />
            Добавить задачу
          </Button>
        )}
      </div>
      <div className={Styles.Item}>
        <h1>{board?.name}</h1>
      </div>
      <div className={Styles.Item}>
        <SliceSelect onChange={handleSliceSelect} editMode filled />
        {!hasManagerAccess ? null : (
          <UserSelect onChange={handleUserSelect} filled />
        )}
        <UserAvatar avatar={user?.avatar} />
      </div>
    </div>
  );
}
