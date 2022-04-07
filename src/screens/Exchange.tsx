import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {useSettings} from '../context/settings';

const Exchange = () => {
  const {theme} = useSettings();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.titleOne, {color: theme.colors.text}]}>
        Exchanges
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleOne: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 10,
  },
  titleTwo: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Exchange;
