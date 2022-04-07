import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import OptionsButton from '../../components/OptionsButton';
import PopupMenu from '../../components/PopupMenu';
import FlatButton from '../../components/FlatButton';

interface Props {
  place: any;
  route: any;
}

const PlaceDetail = (props: Props) => {
  let [isModalOpen, setModalOpen] = useState(false);
  console.log('details', props);
  const {route, navigation} = props;
  const {params: place} = route;

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
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </View>
      <PopupMenu visible={isModalOpen}>
        <FlatButton
          title="REQUEST FOR EXCHANGE"
          onPress={() => {
            navigation.navigate('RequestExchangeForm', {...place});
            setModalOpen(false);
          }}
        />
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
