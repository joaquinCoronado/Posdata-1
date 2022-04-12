import React from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSettings} from '../context/settings';
import {RootStackParams} from '../navigation/index';

interface Props extends StackScreenProps<RootStackParams, 'Chat'> {}

const Exchange = ({navigation}: Props) => {
  const {theme} = useSettings();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.titleOne, {color: theme.colors.text}]}>
        Exchanges
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Text>Ir a Chat</Text>
      </TouchableOpacity>
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
