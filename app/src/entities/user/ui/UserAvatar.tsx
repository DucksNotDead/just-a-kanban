import { Avatar } from 'antd';
import { getMedia } from 'shared/utils';

interface IProps {
  avatar?: number
}

export function UserAvatar({ avatar }: IProps) {
  return <Avatar src={getMedia(avatar)}><img src="/duck.png" alt="duck" /></Avatar>
}
