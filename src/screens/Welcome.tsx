import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import PosdataButton from '../components/PosdataButton';

interface Props {
  navigation: any;
}

const Welcome = ({navigation}: Props) => {
  const {width} = useWindowDimensions();
  const handleSubmit = (mode: string) => {
    navigation.navigate('Auth', {mode});
  };

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <FastImage
          style={[styles.image, {width: width}]}
          source={{
            uri: 'https://res.cloudinary.com/posdata/image/upload/v1649739899/posdata/received_10156796002215955_shwjfc.jpg',
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.logoContainer}>
          <FastImage
            style={styles.imageLogo}
            source={{
              uri: 'https://res.cloudinary.com/posdata/image/upload/v1649741414/posdata/Group_3_j53coj.png',
            }}
            resizeMode={FastImage.resizeMode.center}
          />

          <Text style={styles.posdataText}>Posdata</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <FastImage
            style={styles.imageUser}
            source={{
              uri: 'https://res.cloudinary.com/posdata/image/upload/v1649742459/posdata/28b84532e9ce48861fe9d4d84910e40b_dcvilr.jpg',
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View>
            <Text style={styles.userNameText}>Jesica Cervantes</Text>
            <Text style={styles.placeNameText}>Guadalajara, Jalisco</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <PosdataButton
          width="48%"
          title="LOG IN"
          onPress={() => handleSubmit('login')}
        />
        <PosdataButton
          containerStyles={styles.registerButton}
          textStyles={styles.registerButtonText}
          width="48%"
          title="REGISTER"
          onPress={() => handleSubmit('signup')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -50,
    opacity: 0.3,
  },
  bodyImageContainer: {
    height: '100%',
    width: '100%',
  },
  posdataText: {
    fontWeight: '300',
    fontSize: 40,
    marginBottom: 10,
    marginLeft: 10,
    color: '#fff',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: '#fff',
    textShadowRadius: 1,
  },
  slide: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    maxWidth: 350,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 45,
  },
  registerButton: {
    backgroundColor: '#000',
  },
  registerButtonText: {color: 'white'},
  logoContainer: {
    flexDirection: 'row',
    bottom: 350,
  },
  imageLogo: {
    width: 50,
    height: 50,
  },
  imageUser: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 70,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
    color: '#fff',
  },
  placeNameText: {
    fontWeight: '300',
    fontSize: 12,
    marginLeft: 10,
    color: '#fff',
  },
});

export default Welcome;
