import React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {useSettings} from '../../context/settings';
import PosdataButton from '../../components/PosdataButton';

interface Props {
  navigation: any;
}

const SuccesExchangeRequest = (props: Props) => {
  const {navigation} = props;

  let {theme} = useSettings();
  let {text} = theme.colors;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, {color: text}]}>SENT REQUEST</Text>
        <Text style={[styles.subtitle, {color: text}]}>CONGRATULATIONS!!</Text>
        <PosdataButton
          title="RETURN"
          containerStyles={styles.primaryButton}
          textStyles={styles.primaryButtonText}
          onPress={() => {
            navigation.navigate('Places', {});
          }}
          gradient
        />
        <PosdataButton
          title="MY EXCHANGES"
          onPress={() => {
            navigation.navigate('Exchange', {});
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
    marginBottom: 100,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    padding: 25,
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  primaryButtonText: {
    color: '#fff',
  },
});

export default SuccesExchangeRequest;
