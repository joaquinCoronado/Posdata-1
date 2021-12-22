/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/auth';
import {SettingsProvider} from './src/context/settings';

const Posdata = () => {
  return (
    <SettingsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SettingsProvider>
  );
};

AppRegistry.registerComponent(appName, () => Posdata);
