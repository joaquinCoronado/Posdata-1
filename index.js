/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/auth';
import {SettingsProvider} from './src/context/settings';
import {ExchangeProvider} from './src/context/exchange';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Posdata = () => {
  return (
    <ExchangeProvider>
      <SettingsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SettingsProvider>
    </ExchangeProvider>
  );
};

AppRegistry.registerComponent(appName, () => Posdata);
