import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-fast-image';
import OptionsButton from '../components/OptionsButton';
import PopupMenu from '../components/PopupMenu';
import PosdataButton from '../components/PosdataButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../context/auth';
import {useSettings} from '../context/settings';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation';
import {addEvent} from '../api';
interface Props extends StackScreenProps<RootStackParams, 'PlaceDetail'> {
  route: any;
}

const PlaceDetail = (props: Props) => {
  let [isModalOpen, setModalOpen] = useState(false);

  const {route, navigation} = props;
  const {params} = route;
  const {place, options} = params;

  const {theme} = useSettings();
  const {user} = useAuth();

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    addEvent({
      name: user?.name || '',
      // @ts-ignore
      userId: user?.id || '',
      payload: {
        placeId: place.id,
        placeName: place.name,
      },
    })
      .then(res => {
        console.log('Exito: ', res);
      })
      .catch();
    return () => {
      StatusBar.setBarStyle('dark-content', true);
    };
  }, []);

  const handleBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={{uri: place?.picture}}
        resizeMode="cover"
      />
      {/* BACK */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon color={'white'} size={34} name="arrow-back-sharp" />
      </TouchableOpacity>

      <View
        style={[
          styles.menuContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <View style={styles.placeInfoContainer}>
          <Text style={[styles.placeName, {color: theme.colors.text}]}>
            {place?.name}
          </Text>
          <Text style={[styles.placeLocation, {color: theme.colors.text}]}>
            {place?.city + ', ' + place?.country}
          </Text>
        </View>
        <OptionsButton
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </View>
      <PopupMenu visible={isModalOpen}>
        {options?.mode === 'request' && place?.ownerId !== user?.id ? (
          <PosdataButton
            title="REQUEST FOR EXCHANGE"
            onPress={() => {
              navigation.navigate('RequestExchangeForm', {...place});
              setModalOpen(false);
            }}
          />
        ) : null}

        {options?.mode === 'response' ? (
          <PosdataButton
            gradient
            title="SELECT PLACE"
            onPress={() => {
              navigation.navigate('ResponseExchangeForm', {place});
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5,
  },
});

export default PlaceDetail;
