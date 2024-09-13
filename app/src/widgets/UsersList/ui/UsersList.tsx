import { App, Button, Drawer, List } from 'antd';
import { IUser, UserAvatar, useUsersApi } from 'entities/user';
import { BadgeMinus } from 'lucide-react';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { appMessages } from 'shared/const';
import { IModalRef } from 'shared/types';
import { usePending } from 'shared/utils';

import { UserCreateDialog } from './UserCreateDialog';

import Styles from './UsersList.module.scss';

interface IProps {
  onDelete: (id: number) => void;
}

export const UsersList = forwardRef<IModalRef, IProps>(({ onDelete }, ref) => {
  const usersApi = useUsersApi();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [pending, setPending] = usePending()
  const createDialogRef = useRef<IModalRef>(null);
  const { message, modal } = App.useApp();

  const open = useCallback(() => {
    setPending(() => true);
    usersApi
      .adminGetUsers()
      .then((data) => {
        if (data) {
          setUsers(() => data);
          setIsOpen(() => true);
        } else {
          void message.error(appMessages.toasts.usersList.error);
        }
      })
      .finally(() => setPending(() => false));
  }, []);

  const onCreateClick = useCallback(() => {
    createDialogRef.current?.open();
  }, []);

  const onDeleteClick = useCallback(
    (userId: number) => {
      modal.confirm({
        title: `Удалить пользователя ${users.find((u) => u.id === userId)?.name ?? ''}?`,
        content: appMessages.confirm.delete,
        okButtonProps: { danger: true },
        okText: 'Удалить',
        onOk: () => {
          setPending(() => true);
          usersApi
            .delete(userId)
            .then((data) => {
              if (data) {
                setUsers((prevState) =>
                  prevState.filter((u) => u.id !== userId),
                );
                onDelete(userId);
              } else {
                void message.error(appMessages.toasts.delete.error);
              }
            })
            .finally(() => setPending(() => false));
        },
      });
    },
    [users],
  );

  const handleCreated = useCallback((data: IUser) => {
    setUsers((prevState) => [...prevState, data]);
  }, []);

  useImperativeHandle(ref, () => ({
    open,
    close: () => setIsOpen(() => false),
    isOpen,
  }));

  return (
    <Drawer
      placement={'left'}
      title={'Пользователи'}
      open={isOpen}
      destroyOnClose={true}
      onClose={() => setIsOpen(() => false)}
      loading={pending}
      className={Styles.Modal}
      extra={
        <Button type={'primary'} onClick={onCreateClick}>
          Создать
        </Button>
      }
    >
      <List
        loading={pending}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<UserAvatar avatar={user.avatar} />}
              title={user.name}
            />
            <Button
              icon={<BadgeMinus />}
              danger
              type={'text'}
              onClick={() => onDeleteClick(user.id)}
            />
          </List.Item>
        )}
      />
      <UserCreateDialog onCreated={handleCreated} ref={createDialogRef} />
    </Drawer>
  );
});
