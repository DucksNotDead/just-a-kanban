import { UserAvatar } from 'entities/user';

import Styles from './UserItem.module.scss';

interface IProps {
  avatar?: number;
  name?: string;
}

export function UserItem({ avatar, name }: IProps) {
  return (
    <div className={Styles.UserItem}>
      <UserAvatar avatar={avatar} size={'small'} />
      {name}
    </div>
  );
}
