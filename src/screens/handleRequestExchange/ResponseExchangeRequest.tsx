import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Image from 'react-native-fast-image';
import PosdataButton from '../../components/PosdataButton';
import {useSettings} from '../../context/settings';
import {useExchangeContext} from '../../context/exchange';
import LoadingModal from '../../components/LoadingModal';
import GradientText from '../../components/GradientText';
import {handleExchangeRequest} from '../../api';
const userProfile = require('../../assets/profile.png');

interface Props {
  navigation: any;
}

const ResponseExchangeRequest = (props: Props) => {
  const [isLoading, setLoading] = useState(false);
  const {theme} = useSettings();

  const {navigation} = props;
  const {selectedExchange: exchange, setExchanges} = useExchangeContext();

  const {senderUser, sender} = exchange;

  const hanldeRejectExchange = async () => {
    setLoading(true);
    try {
      await handleExchangeRequest(false, exchange.id, {});

      setExchanges((prev: any) => {
        //Remove the selectedExchange from exchangesActive
        const newExchangesPenddingToAccept =
          prev.exchangesPenddingToAccept.filter(
            (item: any) => item.id !== exchange.id,
          );
        return {
          ...prev,
          exchangesPenddingToAccept: newExchangesPenddingToAccept,
        };
      });

      navigation.pop();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const hanldeSelectPlaceToAcept = () => {
    navigation.navigate('SenderPlaces', exchange);
  };

  const userImage = senderUser?.picture
    ? {uri: senderUser?.picture}
    : userProfile;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER IMAGES */}
      <View style={styles.imagesContainer}>
        <View style={[styles.individualImageContainer, {zIndex: 1, left: 1}]}>
          <Image
            source={userImage}
            resizeMode="cover"
            style={[styles.image, styles.userImage]}
          />
        </View>
        <View style={[styles.individualImageContainer, {right: 1}]}>
          <Image
            source={{uri: sender?.place?.picture}}
            resizeMode="cover"
            style={[styles.image, styles.placeImage]}
          />
        </View>
      </View>
      {/* EXCHANGE INFO */}
      <View style={styles.dataContainer}>
        <Text style={[styles.userNameText, {color: theme.colors.text}]}>
          {senderUser?.name}
        </Text>
        <Text style={[styles.requestToText, {color: theme.colors.text}]}>
          REQUEST TO
        </Text>
        <GradientText style={styles.placeNameText}>
          {sender?.place?.name}
        </GradientText>
      </View>
      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        <PosdataButton
          gradient
          height={'100%'}
          gradientHeight={60}
          title="SELECT PLACE TO ACCEPT"
          onPress={hanldeSelectPlaceToAcept}
        />
        <PosdataButton title="REJECT" onPress={hanldeRejectExchange} />
      </View>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  //IMAGES
  imagesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 75,
    marginTop: 65,
  },

  individualImageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 190,
    height: 190,
    borderRadius: 95,
  },
  image: {
    width: 190,
    height: 190,
    borderRadius: 95,
    elevation: 13,
  },
  userImage: {
    left: 15,
  },
  placeImage: {
    right: 15,
  },

  //DATAs
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 35,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 15,
  },
  requestToText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 15,
  },
  placeNameText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  //BUTTONS
  buttonsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
});

export default ResponseExchangeRequest;
