import { ThemeConfig, theme } from 'antd';

export const antDThemeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,

  token: {
    fontFamily: 'Inter',
    colorPrimary: 'rgb(127, 126, 255)',
    colorBgBase: 'rgb(27, 27, 30)',
    colorBgContainer: 'rgb(44, 44, 44)',
    borderRadiusLG: 16,
    borderRadiusSM: 10,
    borderRadiusXS: 8,
    borderRadius: 12,
    paddingMD: 16,
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
    },
    DatePicker: {
      controlHeight: 36
    },
    ColorPicker: {
    },
    Tooltip: {
      colorBgSpotlight: 'rgb(197, 199, 209)',
      colorTextLightSolid: 'rgb(44, 44, 44)',
    }
  }
}