import { Avatar } from 'antd';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';
import { getMedia } from 'shared/utils';

interface IProps {
  avatar: number|undefined;
  size?: AvatarSize;
}

export function UserAvatar({ avatar, size }: IProps) {
  return (
    <Avatar src={getMedia(avatar)} size={size} style={{ flexShrink: 0, backgroundColor: 'transparent' }}>
      <img src="/duck.png" alt="duck" />
    </Avatar>
  );
}
