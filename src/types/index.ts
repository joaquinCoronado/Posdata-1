import {Theme} from '@react-navigation/native';

export type AuthContextType = {
  access_token: string;
  refresh_token: string;
  name: string;
  id: number;
  email: string;
  jti: string;
} | null;

export interface SettingsContextType {
  appLoading: boolean;
  welcomed: boolean;
}

export interface PosdataTheme extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
}
