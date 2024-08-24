import { IUser, UserAvatar } from 'entities/user';

import Styles from './UserAvatarsPanel.module.scss';

interface IProps {
  users: IUser[];
}

export function UserAvatarsPanel({ users }: IProps) {
  return (
    <div className={Styles.UserAvatarsPanel}>
      {users.slice(0, 6).map((user) => (
        <UserAvatar key={user.id} avatar={user.avatar}/>
      ))}
    </div>
  );
}
