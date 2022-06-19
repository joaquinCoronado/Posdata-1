import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
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
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

interface Props extends StackScreenProps<RootStackParams, 'PlaceDetail'> {
  route: any;
}

const PlaceDetail = (props: Props) => {
  let [isModalOpen, setModalOpen] = useState(false);

  const {route, navigation} = props;
  const {params} = route;
  const {place, options} = params;

  const {user} = useAuth();
  const {theme} = useSettings();

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('black');
    }

    // addEvent({
    //   name: 'see_place',
    //   // @ts-ignore
    //   userId: user?.id || '',
    //   user_os: Platform.OS,
    //   payload: {
    //     placeId: place.id,
    //     placeName: place.name,
    //   },
    // })
    //   .then(res => {
    //     console.log('Exito: ', res);
    //   })
    //   .catch();
    return () => {
      if (theme.currentTheme !== 'dark') {
        StatusBar.setBarStyle('dark-content', true);
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('white');
        }
      } else {
        StatusBar.setBackgroundColor('#263238');
      }
    };
  }, []);

  const handleBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      {/* PRINCIPAL IMAGE */}
      <View style={styles.zoomableViewContainer}>
        <ReactNativeZoomableView
          maxZoom={10}
          minZoom={1}
          contentWidth={width}
          contentHeight={height / 2}
          bindToBorders={true}
          movementSensibility={1.9}
          doubleTapZoomToCenter={true}>
          <Image
            style={styles.imageContainer}
            source={{uri: place?.picture}}
            resizeMode="contain"
          />
        </ReactNativeZoomableView>
      </View>

      {/* BACK */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon color={'white'} size={30} name="arrow-back-sharp" />
      </TouchableOpacity>

      {/* FOOTER */}
      <View style={styles.menuContainer}>
        {/* PLACE INFORMATION */}
        <View style={styles.placeInfoContainer}>
          <Text style={styles.placeName}>{place?.name}</Text>
          <Text style={[styles.placeLocation]}>
            {place?.city + ', ' + place?.country}
          </Text>
        </View>
        {/* OPTIONS MENU BUTTON*/}
        <OptionsButton
          color="white"
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </View>

      {/* OPTIONS MENU */}
      <PopupMenu visible={isModalOpen}>
        {/* REQUEST EXVHANGE */}
        {options?.mode === 'request' && place?.ownerId !== user?.id ? (
          <PosdataButton
            title="REQUEST FOR EXCHANGE"
            onPress={() => {
              navigation.navigate('RequestExchangeForm', {...place});
              setModalOpen(false);
            }}
          />
        ) : null}

        {/* SELECT PLACE BUTTON*/}
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

        {/* CANCEL BUTTON */}
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
    height: '100%',
  },
  menuContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    paddingLeft: 5,
    paddingRight: 5,
    height: '15%',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    //backgroundColor: 'transparent',
  },
  placeInfoContainer: {
    marginTop: 2,
    padding: 5,
    color: 'balck',
  },
  placeLocation: {
    color: 'white',
    textTransform: 'capitalize',
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    top: Platform.OS === 'ios' ? 40 : 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 100,
    padding: 5,
  },
  zoomableViewContainer: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
});

export default PlaceDetail;
