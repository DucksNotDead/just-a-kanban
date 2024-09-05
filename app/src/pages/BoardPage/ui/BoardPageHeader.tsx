import { Button } from 'antd';
import { useBoard } from 'entities/board';
import { SliceSelect } from 'entities/slice';
import { UserAvatar, UserSelect, useCurrentUser } from 'entities/user';
import { House, Plus } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHOSEN_BOARD_KEY, appRoutes } from 'shared/const';
import { ITaskDetailRef, TaskDetail } from 'widgets/TaskDetail';

import Styles from './BoardPageHeader.module.scss';

export function BoardPageHeader() {
  const { user } = useCurrentUser();
  const { board, hasManagerAccess } = useBoard();
  const navigate = useNavigate();
  const taskCreateDialogRef = useRef<ITaskDetailRef>(null)

  const handleBackClick = useCallback(() => {
    localStorage.removeItem(CHOSEN_BOARD_KEY);
    navigate(appRoutes.home);
  }, []);

  const handleCreateClick = useCallback(() => {
    taskCreateDialogRef.current?.open(null)
  }, []);

  return (
    <div className={Styles.BoardKanbanPageHeader}>
      <div className={Styles.Item}>
        <Button onClick={handleBackClick} type={'text'} icon={<House />} />
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
        <SliceSelect onChange={console.log} editMode filled/>
        {!hasManagerAccess ? null : <UserSelect onChange={console.log} filled/>}
        <UserAvatar avatar={user?.avatar} />
      </div>
      {!hasManagerAccess ? null : (
        <TaskDetail ref={taskCreateDialogRef} />
      )}
    </div>
  );
}
