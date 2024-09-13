import { App, Input, List, Switch } from 'antd';
import { IBoardWithUsers, useBoardsApi } from 'entities/board';
import { IUser, UserAvatar, UserSelect, useCurrentUser } from 'entities/user';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { appMessages } from 'shared/const';
import { IModalRef } from 'shared/types';
import { CreateDialog } from 'shared/ui';

import Styles from './BoardCreateDialog.module.scss';

interface IProps {
  data: IBoardWithUsers | null;
  onCreated: (board: IBoardWithUsers) => void;
  onUpdated: (board: IBoardWithUsers) => void;
  onClose: () => void;
}

export const BoardUpdateDialog = forwardRef<IModalRef, IProps>(
  ({ data, onCreated, onUpdated, onClose }, ref) => {
    const boardsApi = useBoardsApi();
    const { message } = App.useApp();
    const { user } = useCurrentUser();
    const [isReady, setIsReady] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [managers, setManagers] = useState<number[]>([]);
    const [name, setName] = useState('');
    const [pending, setPending] = useState(false);
    const dialog = useRef<IModalRef>(null);

    const nameIsChanged = useMemo(() => {
      return data?.name !== name;
    }, [data, name]);

    const usersIsChanged = useMemo(() => {
      return (
        data?.managers.join() !== managers.join() ||
        data?.users.map((u) => u.id).join() !== users.map((u) => u.id).join()
      );
    }, [data, users, managers]);

    const handleClose = useCallback(() => {
      onClose();
      setName(() => '');
      setUsers(() => []);
      setManagers(() => []);
    }, [onClose]);

    const handleCreateClick = useCallback(() => {
      if (!user || data) {
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

    const handleUpdateClick = useCallback(async () => {
      if (!data || !user) {
        return;
      }

      setPending(() => true);
      try {
        if (usersIsChanged) {
          await boardsApi.changeUsers(data.slug, {
            managers: [...managers, user.id],
            users: [...users.map((u) => u.id), user.id],
          });
        }

        let slug = data.slug;
        if (nameIsChanged) {
          const updated = await boardsApi.changeName(data.slug, name);
          if (updated) {
            slug = updated.slug;
          }
        }

        onUpdated({ ...data, users, managers, name, slug });
      } catch {
        message.error(appMessages.toasts.update.error);
      } finally {
        setPending(() => false);
        dialog.current?.close();
      }
    }, [user, data, users, managers, name, nameIsChanged, usersIsChanged]);

    const handleUsersSet = useCallback((data: IUser[]) => {
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
      setName(() => data?.name ?? '');
      setUsers(() => data?.users ?? []);
      setManagers(() => data?.managers ?? []);
    }, [data]);

    useEffect(() => {
      setIsReady(() => {
        let updateReady = true;
        if (data) {
          updateReady = nameIsChanged || usersIsChanged;
        }
        return !!name.length && updateReady;
      });
    }, [name, nameIsChanged, usersIsChanged]);

    useImperativeHandle(ref, () => ({
      open: () => dialog.current?.open(),
      close: () => dialog.current?.close(),
      isOpen: !!dialog.current?.isOpen,
    }));

    return (
      <CreateDialog
        ref={dialog}
        onConfirm={data ? handleUpdateClick : handleCreateClick}
        action={data ? 'Изменить' : undefined}
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
          <UserSelect
            value={users.map((u) => u.id)}
            onChange={handleUsersSet}
            multiple
          />
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
                checked={!!managers.find((mId) => mId === user.id)}
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
