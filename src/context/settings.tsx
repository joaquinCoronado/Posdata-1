import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {Appearance, AppState} from 'react-native';
import propTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SettingsContextType, PosdataTheme} from '../types';
interface SettingsContextProps {
  settings: SettingsContextType;
  theme: PosdataTheme;
  updateSettings: Function;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps,
);

const lightTheme: PosdataTheme = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#0071BC',
    background: '#FFFF',
    card: '#FFFF',
    text: '#222222',
    border: '#0071BC',
    notification: '#0071BC',
  },
  dividerColor: 'rgba(0,0,0,0.7)',
};

const darkTheme: PosdataTheme = {
  currentTheme: 'dark',
  dark: true,
  colors: {
    primary: '#0071BC',
    background: '#263238',
    card: '#263238',
    text: '#FFFF',
    border: '#0071BC',
    notification: '#0071BC',
  },
  dividerColor: 'rgba(255,255,255,0.7)',
};

const SettingsProvider = ({children}: any) => {
  const [settings, setSettings] = useState<SettingsContextType>({
    appLoading: true,
    welcomed: false,
  });
  const [theme, setTheme] = useState<PosdataTheme>(
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    const listener = AppState.addEventListener('change', status => {
      if (status === 'active') {
        Appearance.getColorScheme() === 'light'
          ? setLightTheme()
          : setDarkTheme();
      }
    });
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@settings')
      .then(res => {
        if (res) {
          return setSettings(JSON.parse(res));
        }
        return;
      })
      .catch();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback(params => {
    setSettings(s => ({...s, ...params}));
  }, []);

  const setDarkTheme = () => setTheme(darkTheme);

  const setLightTheme = () => setTheme(lightTheme);

  return (
    <SettingsContext.Provider
      value={{settings, theme, updateSettings, setDarkTheme, setLightTheme}}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: propTypes.element,
};

const useSettings = () => {
  const context: SettingsContextProps = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('Settings context must be used within Settings Provider');
  }
  return {...context};
};

export {SettingsProvider, useSettings};
