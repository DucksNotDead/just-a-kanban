import { App, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { ReactNode } from 'react';

import { antDThemeConfig } from '../theme/antDThemeConfig';

interface IProps {
  children: ReactNode;
}

export function AntDConfigProvider({ children }: IProps) {
  return (
    <ConfigProvider locale={ruRU} theme={antDThemeConfig}>
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}
