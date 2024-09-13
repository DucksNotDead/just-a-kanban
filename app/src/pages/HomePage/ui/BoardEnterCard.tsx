import { Button, Dropdown, Progress } from 'antd';
import { IBoardWithUsers } from 'entities/board';
import { UserAvatarsPanel } from 'entities/user/ui/UserAvatarsPanel';
import { Settings2 } from 'lucide-react';
import { Card } from 'shared/ui';

import Styles from './BoardEnterCard.module.scss';

interface IProps {
  isAdmin?: boolean;
  board: IBoardWithUsers;
  onClick: (boardSlug: string) => void;
  onDelete: (boardSlug: string) => void;
  onChange: (boardSlug: string) => void;
}

export function BoardEnterCard({
  board,
  onClick,
  isAdmin,
  onDelete,
  onChange,
}: IProps) {
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
          format={() => `${board.doneTasksCount} / ${board.tasksCount}`}
          percent={(board.doneTasksCount / board.tasksCount) * 100}
          status={board.tasksCount ? 'active' : 'exception'}
        />
      </Card>
      {!isAdmin ? null : (
        <Dropdown
          placement={'topLeft'}
          menu={{
            items: [
              {
                label: 'Изменить',
                key: 'change-name',
                onClick: () => onChange(board.slug),
              },
              {
                label: 'Удалить',
                danger: true,
                key: 'delete',
                onClick: () => onDelete(board.slug),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button type={'text'} icon={<Settings2 />} />
        </Dropdown>
      )}
    </div>
  );
}
