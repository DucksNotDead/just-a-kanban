import { App, Button, Form, Input } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { IUserCredits, useCurrentUser } from 'entities/user';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appMessages, appRoutes } from 'shared/const';

import { loginFormConfig } from '../config/loginFormConfig';

import Styles from './LoginPage.module.scss';

export function LoginPage() {
  const [isReady, setIsReady] = useState(false);
  const [form] = useForm<IUserCredits>();
  const credits = useWatch([], form);
  const { login, isLogin, pending } = useCurrentUser();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleSubmit = useCallback(async () => {
    const res = await login(credits);
    if (!res) {
      message.error(appMessages.toasts.login.error);
      form?.resetFields();
    }
  }, [credits, login]);

  useEffect(() => {
    form
      ?.validateFields({ validateOnly: true })
      .then(() => setIsReady(true))
      .catch(() => setIsReady(false));
  }, [credits]);

  useEffect(() => {
    if (isLogin) {
      navigate(appRoutes.home);
    }
  }, [isLogin]);

  return (
    <div className={Styles.LoginPage}>
      <h1>войти</h1>
      <Form form={form} layout={'vertical'} style={{ width: 300 }}>
        {loginFormConfig.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[
              { required: true, message: appMessages.validation.required },
            ]}
          >
            <Input type={field.name}/>
          </Form.Item>
        ))}
        <Form.Item className={Styles.SubmitButtonBox}>
          <Button
            onClick={handleSubmit}
            disabled={!isReady}
            loading={pending}
            htmlType={'submit'}
            className={`${Styles.SubmitButton} ${!isReady ? Styles.IsHidden : ''}`}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
