import React, {createContext, useContext, useState, useCallback} from 'react';
import propTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SettingsContextType, PosdataTheme} from '../types';

type SettingsContextProps = {
  settings: SettingsContextType;
  theme: PosdataTheme;
  updateSettings: Function;
};

const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps,
);

const SettingsProvider = ({children}: any) => {
  const [settings, setSettings] = useState<SettingsContextType>({
    appLoading: true,
    welcomed: false,
    theme: null,
  });
  React.useEffect(() => {
    AsyncStorage.getItem('@settings')
      .then(res => {
        if (res) {
          return setSettings(JSON.parse(res));
        }
        return;
      })
      .catch();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem('@settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback(params => {
    setSettings(s => ({...s, ...params}));
  }, []);

  return (
    <SettingsContext.Provider
      value={{settings, theme: settings?.theme ?? null, updateSettings}}>
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
