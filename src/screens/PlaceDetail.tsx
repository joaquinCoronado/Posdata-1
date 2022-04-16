import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';
import OptionsButton from '../components/OptionsButton';
import PopupMenu from '../components/PopupMenu';
import PosdataButton from '../components/PosdataButton';

import {useAuth} from '../context/auth';
import {useSettings} from '../context/settings';

interface Props {
  place: any;
  route: any;
  navigation: any;
}

const PlaceDetail = (props: Props) => {
  let [isModalOpen, setModalOpen] = useState(false);

  const {route, navigation} = props;
  const {params: place} = route;
  const {theme} = useSettings();
  const {user} = useAuth();

  console.log('place', place);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={{uri: place.picture}}
        resizeMode="cover"
      />
      <View
        style={[
          styles.menuContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <View style={styles.placeInfoContainer}>
          <Text style={[styles.placeName, {color: theme.colors.text}]}>
            {place.name}
          </Text>
          <Text style={[styles.placeLocation, {color: theme.colors.text}]}>
            {place.city + ', ' + place.country}
          </Text>
        </View>
        <OptionsButton
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </View>
      <PopupMenu visible={isModalOpen}>
        {place.ownerId !== user?.id ? (
          <PosdataButton
            title="REQUEST FOR EXCHANGE"
            onPress={() => {
              navigation.navigate('RequestExchangeForm', {...place});
              setModalOpen(false);
            }}
          />
        ) : null}

        <PosdataButton
          title="CANCEL"
          onPress={() => {
            setModalOpen(false);
          }}
        />
      </PopupMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '85%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    paddingLeft: 5,
    paddingRight: 5,
    height: '15%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  placeInfoContainer: {
    marginTop: 2,
    padding: 5,
    color: 'balck',
  },
  placeLocation: {
    color: 'black',
    textTransform: 'capitalize',
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
    color: 'black',
  },
});

export default PlaceDetail;
