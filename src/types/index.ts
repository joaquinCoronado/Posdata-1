import {Theme} from '@react-navigation/native';

export type AuthContextType = {
  accessToken: string;
  refresh_token: string;
  name: string;
  id: string;
  email: string;
  jti: string;
  userInfo: any;
} | null;

export interface SettingsContextType {
  appLoading: boolean;
  welcomed: boolean;
}

export interface PosdataTheme extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
}
