import { Avatar } from 'antd';
import { IUser, UserAvatar } from 'entities/user';

interface IProps {
  users: IUser[];
}

export function UserAvatarsPanel({ users }: IProps) {
  return (
   <Avatar.Group max={{ count: 3 }}>
     {users.map((user) => (
       <UserAvatar key={user.id} avatar={user.avatar}/>
     ))}
   </Avatar.Group>
  );
}
