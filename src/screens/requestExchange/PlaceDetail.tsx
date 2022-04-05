import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import OptionsButton from '../../components/OptionsButton';
import PopupMenu from '../../components/PopupMenu';
import FlatButton from '../../components/FlatButton';

interface Props {
  place: any;
}

const PlaceDetail = (props: Props) => {
  let [isModalOpen, setModalOpen] = useState(false);

  const {
    place = {
      id: '1',
      picture:
        'https://elviajerofeliz.com/wp-content/uploads/2015/09/paisajes-de-Canada.jpg',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
  } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={{uri: place.picture}}
        resizeMode="cover"
      />
      <View style={styles.menuContainer}>
        <View style={styles.placeInfoContainer}>
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.placeLocation}>
            {place.city + ', ' + place.country}
          </Text>
        </View>
        <OptionsButton
          title="hola mundo"
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </View>
      <PopupMenu visible={isModalOpen}>
        <FlatButton title="REQUEST FOR EXCHANGE" onPress={() => {}} />
        <FlatButton
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
