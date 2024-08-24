import { ThemeConfig, theme } from 'antd';

export const antDThemeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,

  token: {
    fontFamily: 'Inter',
    colorPrimary: 'rgb(127, 126, 255)',
    colorBgBase: 'rgb(27, 27, 30)',
    colorBgContainer: 'rgb(44, 44, 44)',
    colorFillContent: 'rgb(44, 44, 44)'
  },
  components: {
    Progress: {
      defaultColor: 'rgb(83, 221, 108)',
    },
    Button: {
      defaultShadow: 'none',
      primaryShadow: 'none',
      controlHeight: 36
    },
    Input: {
      controlHeight: 36
    },
    Select: {
      controlHeight: 36
    }
  }
}