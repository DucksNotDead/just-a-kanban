import { Button, Progress } from 'antd';
import { IBoardWithUsers } from 'entities/board';
import { UserAvatarsPanel } from 'entities/user/ui/UserAvatarsPanel';
import { OctagonX } from 'lucide-react';
import { useMemo } from 'react';
import { Card } from 'shared/ui';

import Styles from './BoardEnterCard.module.scss';

interface IProps {
  isAdmin?: boolean;
  board: IBoardWithUsers;
  onClick: (boardSlug: string) => void;
  onDelete: (boardSlug: string) => void;
}

export function BoardEnterCard({ board, onClick, isAdmin, onDelete }: IProps) {
  const allTasksCount = useMemo(
    () => board.doneTasksCount + board.undoneTasksCount,
    [board.doneTasksCount, board.undoneTasksCount],
  );

  return (
    <div className={Styles.BoardCardContainer}>
      <Card onClick={() => onClick(board.slug)} style={{ cursor: 'pointer' }}>
        <div className={Styles.BoardCardHeader}>
          <div>
            <h3>{board.name}</h3>
          </div>
          <UserAvatarsPanel users={board.users} />
        </div>
        <Progress
          format={() => `${board.doneTasksCount} / ${allTasksCount}`}
          percent={(board.doneTasksCount / allTasksCount) * 100}
          status={allTasksCount ? 'active' : 'exception'}
        />
      </Card>
      {!isAdmin ? null : (
        <Button
          type={'text'}
          danger
          icon={<OctagonX />}
          onClick={() => onDelete(board.slug)}
        />
      )}
    </div>
  );
}
