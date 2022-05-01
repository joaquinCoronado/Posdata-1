import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {useSettings} from './src/context/settings';
import Navigation from './src/navigation';

const App = () => {
  const {theme} = useSettings();

  return (
    <View style={{...styles.wrapper, backgroundColor: theme.colors.background}}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
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
