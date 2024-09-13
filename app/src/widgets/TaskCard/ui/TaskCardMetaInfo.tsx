import { UserAvatar, useBoardUsers } from 'entities/user';

import Styles from './TaskCardMetaInfo.module.scss';

interface IProps {
  userId: number;
  color: string|undefined;
}

export function TaskCardMetaInfo({ userId, color }: IProps) {
  const { getUser } = useBoardUsers();

  return (
    <div className={Styles.TaskCardMetaInfo} style={{ backgroundColor: color ?? 'transparent' }}>
      <UserAvatar avatar={getUser(userId)?.avatar} size={'small'} />
    </div>
  );
}
