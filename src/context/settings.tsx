import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import propTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SettingsContextType, PosdataTheme} from '../types';

type SettingsContextProps = {
  settings: SettingsContextType;
  theme: PosdataTheme;
  updateSettings: Function;
  updateTheme: Function;
};

const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps,
);

const SettingsProvider = ({children}: any) => {
  const [settings, setSettings] = useState<SettingsContextType>({
    appLoading: true,
    welcomed: false,
  });
  const [theme, setTheme] = useState<PosdataTheme>(null);
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

  const updateTheme = useCallback(params => {
    setTheme(params);
  }, []);

  return (
    <SettingsContext.Provider
      value={{settings, theme, updateSettings, updateTheme}}>
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
  return context;
};

export {SettingsProvider, useSettings};
