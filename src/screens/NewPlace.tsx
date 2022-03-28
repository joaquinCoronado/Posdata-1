import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSettings} from '../context/settings';
import Button from '../components/Button';

const height = Dimensions.get('screen').height;

const NewPlace = () => {
  const {theme} = useSettings();
  return (
    <View style={styles.wrapper}>
      <Swiper
        activeDot={<View style={styles.activeDot} />}
        dot={<View style={styles.dot} />}
        loop
        showsButtons={false}>
        <View style={styles.slide}>
          <Icon
            name="file-tray-full-outline"
            style={styles.iconFiles}
            size={180}
          />
          <View style={styles.info}>
            <Text>title TITLE </Text>
            <Text>Subtitle subtitle</Text>
          </View>
        </View>
      </Swiper>
      <View style={styles.buttons}>
        <Button title="Subir Imagen" style={styles.button} />
        <Button title="Siguiente" style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (height / 3) * 2,
  },
  iconFiles: {},
  button: {
    maxWidth: 350,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttons: {
    height: height / 3,
    paddingTop: 20,
  },
});

export default NewPlace;
