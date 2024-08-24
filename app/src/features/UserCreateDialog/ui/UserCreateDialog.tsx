import { App, Form, Input, Switch } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { IUser, IUserCreateRequest, useUsersApi } from 'entities/user';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { appMessages } from 'shared/const';
import { IModalRef } from 'shared/types';
import { CreateDialog } from 'shared/ui';
import { useFormReady } from 'shared/utils';

import { userCreateDialogConfig } from '../config/userCreateDialogConfig';

interface IProps {
  onCreated: (data: IUser) => void;
}

export const UserCreateDialog = forwardRef<IModalRef, IProps>(
  ({ onCreated }, ref) => {
    const usersApi = useUsersApi();
    const dialog = useRef<IModalRef>(null);
    const [form] = useForm<IUserCreateRequest>();
    const [pending, setPending] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const dto = useWatch([], form);
    const { message, notification } = App.useApp();

    const handleConfirm = useCallback(() => {
      setPending(() => true);
      usersApi
        .create(dto)
        .then((data) => {
          if (!data) {
            void message.error(appMessages.toasts.create.error);
          } else {
            onCreated(data.user);
            dialog.current?.close();
            const notyKey = 'userPassword' + data.user.id;
            notification.info({
              key: notyKey,
              duration: null,
              closable: false,
              message: `Пароль для пользователя ${data.user.name}`,
              description: 'Нажмите чтобы скопировать',
              onClick: () => {
                window.navigator.clipboard.writeText(data.password);
                notification.destroy(notyKey);
              },
            });
          }
        })
        .finally(() => setPending(() => false));
    }, [dto, dialog.current]);

    useFormReady(form, dto, setIsReady);

    useImperativeHandle(ref, () => ({
      open: () => dialog.current?.open(),
      close: () => dialog.current?.close(),
    }));

    return (
      <CreateDialog
        ref={dialog}
        onConfirm={handleConfirm}
        entity={'пользователя'}
        loading={pending}
        disabled={!isReady}
      >
        <Form form={form} layout={'vertical'}>
          {userCreateDialogConfig.map((field) => {
            const isSwitch = field.name === 'isAdmin';
            return (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                layout={isSwitch ? 'horizontal' : undefined}
                rules={[
                  {
                    required: !isSwitch,
                    message: appMessages.validation.required,
                  },
                ]}
              >
                {isSwitch ? <Switch /> : <Input />}
              </Form.Item>
            );
          })}
        </Form>
      </CreateDialog>
    );
  },
);
