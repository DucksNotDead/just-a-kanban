import { useBoard } from 'entities/board';
import { UserAvatar, UserSelect, useCurrentUser } from 'entities/user';
import { House } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHOSEN_BOARD_KEY, appRoutes } from 'shared/const';

import Styles from './BoardKanbanPageHeader.module.scss';

export function BoardKanbanPageHeader() {
  const { user } = useCurrentUser();
  const { board, pending, hasManagerAccess } = useBoard();
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    localStorage.removeItem(CHOSEN_BOARD_KEY);
    navigate(appRoutes.home);
  }, []);

  return (
    <div className={Styles.BoardKanbanPageHeader}>
      <div className={Styles.Item}>
        <House
          onClick={handleBackClick}
          style={{ cursor: 'pointer' }}
          absoluteStrokeWidth={true}
        />
      </div>
      <div className={Styles.Item}>
        <h1>{board?.name}</h1>
      </div>
      <div className={Styles.Item}>
        <UserSelect onChange={console.log} />
        <UserAvatar avatar={user?.avatar} />
      </div>
    </div>
  );
}
