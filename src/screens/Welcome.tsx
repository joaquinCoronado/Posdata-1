import React from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import Image from 'react-native-fast-image';
import Button from '../components/Button';
import {useSettings} from '../context/settings';

const Welcome = () => {
  const {updateSettings} = useSettings();

  const handleSubmit = () => {
    updateSettings({welcomed: true});
  };

  return (
    <View style={styles.container}>
      <Swiper
        activeDot={<View style={styles.activeDot} />}
        dot={<View style={styles.dot} />}
        loop
        showsButtons={false}>
        <View style={styles.slide}>
          <Image
            resizeMode="cover"
            source={require('../assets/welcome01.jpeg')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="cover"
            source={require('../assets/welcome02.jpeg')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="cover"
            source={require('../assets/welcome03.jpeg')}
            style={styles.image}
          />
        </View>
      </Swiper>
      <Button title="Hola Mundo" style={styles.button} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 5,
    width: 35,
    marginTop: 5,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 4,
    marginBottom: 30,
    backgroundColor: '#333',
  },
  activeDot: {
    width: 35,
    height: 5,
    marginTop: 5,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 4,
    marginBottom: 30,
    backgroundColor: 'red',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-start',
  },
  slide: {
    flex: 1,
    overflow: 'hidden',
  },
  button: {
    maxWidth: 350,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default Welcome;
