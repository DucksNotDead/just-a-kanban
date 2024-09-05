import { App, Input, List, Switch } from 'antd';
import { IBoardWithUsers, useBoardsApi } from 'entities/board';
import { IUser, UserAvatar, UserSelect, useCurrentUser } from 'entities/user';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { appMessages } from 'shared/const';
import { IModalRef } from 'shared/types';
import { CreateDialog } from 'shared/ui';

import Styles from './BoardCreateDialog.module.scss';

interface IProps {
  onCreated: (board: IBoardWithUsers) => void;
}

export const BoardCreateDialog = forwardRef<IModalRef, IProps>(
  ({ onCreated }, ref) => {
    const boardsApi = useBoardsApi();
    const { message } = App.useApp();
    const { user } = useCurrentUser();
    const [isReady, setIsReady] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [managers, setManagers] = useState<number[]>([]);
    const [name, setName] = useState('');
    const [pending, setPending] = useState(false);
    const dialog = useRef<IModalRef>(null);

    const handleClose = useCallback(() => {
      setName(() => '');
      setUsers(() => []);
      setManagers(() => []);
    }, []);

    const handleCreateClick = useCallback(() => {
      if (!user) {
        return;
      }
      setPending(() => true);
      boardsApi
        .create({
          name,
          managers: [...managers, user.id],
          users: [...users.map((u) => u.id), user.id],
        })
        .then((data) => {
          if (data) {
            onCreated(data);
            dialog.current?.close();
          } else {
            void message.error(appMessages.toasts.create.error);
          }
        })
        .finally(() => {
          setPending(() => false);
        });
    }, [user, name, managers, users]);

    const handleUsersChange = useCallback((data: IUser[]) => {
      setUsers(() => data);
    }, []);

    const handleManagerSwitchToggle = useCallback(
      (userId: number, checked: boolean) => {
        setManagers((prevState) => {
          if (!checked) {
            return prevState.filter((id) => id !== userId);
          } else {
            return [...prevState, userId];
          }
        });
      },
      [],
    );

    useEffect(() => {
      setIsReady(() => !!name.length);
    }, [name]);

    useImperativeHandle(
      ref,
      () => ({
        open: () => dialog.current?.open(),
        close: () => dialog.current?.close(),
        isOpen: !!dialog.current?.isOpen,
      }),
    );

    return (
      <CreateDialog
        ref={dialog}
        onConfirm={handleCreateClick}
        entity={'доску'}
        classname={Styles.Dialog}
        onClose={handleClose}
        loading={pending}
        disabled={!isReady}
      >
        <div className={Styles.Inputs}>
          <Input
            placeholder={'название доски...'}
            required
            value={name}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              setName(() => target.value);
            }}
          />
          <UserSelect onChange={handleUsersChange} multiple />
        </div>
        {!users.length ? (
          <p>В этой доске будете только вы</p>
        ) : (
          <div className={Styles.UserDescription}>
            <div>Пользователи</div>
            <div>Доступ менеджера</div>
          </div>
        )}
        <List
          itemLayout={'horizontal'}
          dataSource={users}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={<UserAvatar avatar={user.avatar} />}
                title={user.name}
                description={null}
              />
              <Switch
                onChange={(checked) =>
                  handleManagerSwitchToggle(user.id, checked)
                }
              />
            </List.Item>
          )}
        />
      </CreateDialog>
    );
  },
);
