import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Welcome from './src/screens/Welcome';
import {useSettings} from './src/context/settings';
import Navigation from './src/navigation';

const App = () => {
  const {settings, theme} = useSettings();

  if (!settings.welcomed) {
    return <Welcome />;
  }
  return (
    <View style={{...styles.wrapper, backgroundColor: theme.colors.background}}>
      <NavigationContainer theme={theme}>
        <Navigation />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
