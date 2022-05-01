import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Image from 'react-native-fast-image';
import PosdataButton from '../../components/PosdataButton';
import GradientText from '../../components/GradientText';
import {useSettings} from '../../context/settings';
import {createNewExchange} from '../../api';
import {useAuth} from '../../context/auth';
import LoadingModal from '../../components/LoadingModal';
import moment from 'moment';

interface Props {
  place: any;
  route: any;
  navigation: any;
}

const RequestExchangeForm = (props: Props) => {
  let [deliveriDate, setDeliveriDate] = useState(new Date());
  let [isKeyboardOpen, setKeyboardOpen] = useState(false);
  let [textNote, setTextNote] = useState('');
  let [isLoading, setLoading] = useState(false);
  let [isDeliveryDatePickerActive, setDeliveryDatePickerActive] =
    useState(false);

  let {theme} = useSettings();
  let {dividerColor} = theme;
  let {text} = theme.colors;

  const {user} = useAuth();
  const {route, navigation} = props;
  const {params: place} = route;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const toLocalDate = (date: Date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const handleSendRequest = async () => {
    const exchange = {
      senderId: user?.id,
      receiverId: place.ownerId,
      textNote: textNote,
      requestedPlaceId: place.id,
      releaseDate: deliveriDate,
    };

    try {
      setLoading(true);
      await createNewExchange(exchange);
      navigation.navigate('SuccesExchangeRequest', {});
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Image
            style={styles.image}
            source={{uri: place.picture}}
            resizeMode="cover"
          />
          <View style={styles.placeDataContainer}>
            <GradientText style={styles.placeName}>{place.name}</GradientText>
            <Text style={[styles.placeLocation, {color: text}]}>
              {place.city + ', ' + place.country}
            </Text>
          </View>
        </View>
        {/* FORM */}
        <View style={styles.formContainer}>
          <Text style={[styles.labelTextForImput, {color: text}]}>
            DELIVERI DATE
          </Text>
          <PosdataButton
            containerStyles={[styles.input, {borderColor: text, color: text}]}
            title={toLocalDate(deliveriDate)}
            onPress={() => setDeliveryDatePickerActive(prev => !prev)}
          />
          <DatePicker
            modal
            mode="date"
            textColor={theme.dark ? '#fff' : '#000'}
            open={isDeliveryDatePickerActive}
            date={deliveriDate}
            onConfirm={setDeliveriDate}
            onCancel={() => {
              setDeliveryDatePickerActive(false);
            }}
          />
          <Text style={[styles.labelTextForImput, {color: text}]}>
            TEXT NOTE
          </Text>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            style={[
              styles.input,
              styles.textArea,
              {borderColor: dividerColor, color: text},
            ]}
            onChangeText={setTextNote}
            value={textNote}
          />
        </View>
        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          {!isKeyboardOpen ? (
            <>
              <PosdataButton
                width="48%"
                title="SEND REQUEST"
                onPress={handleSendRequest}
                gradient
              />
              <PosdataButton
                width="48%"
                title="CANCEL"
                onPress={() => {
                  navigation.pop();
                }}
              />
            </>
          ) : null}
        </View>
        <LoadingModal visible={isLoading} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  // HEADER
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 25,
  },
  image: {marginRight: 15, height: 70, width: 70, borderRadius: 35},
  placeDataContainer: {},
  placeName: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
    color: 'black',
  },
  placeLocation: {
    color: 'black',
    fontWeight: '300',
    textTransform: 'capitalize',
    fontSize: 16,
  },
  //FORM
  formContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    padding: 15,
  },
  input: {
    height: 45,
    borderWidth: 1.5,
    padding: 10,
    marginBottom: 25,
    marginTop: 0,
    borderRadius: 0,
  },
  textArea: {
    height: 150,
  },
  labelTextForImput: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  //BUTTONS
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 15,
    marginBottom: 15,
  },
});

export default RequestExchangeForm;
