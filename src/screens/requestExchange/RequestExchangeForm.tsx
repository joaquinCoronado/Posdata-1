import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';

import FlatButton from '../../components/FlatButton';

interface Props {
  place: any;
  route: any;
  navigation: any;
}

const RequestExchangeForm = (props: Props) => {
  let [deliveriDate, setDeliveriDate] = useState('');
  let [textNote, setTextNote] = useState('');
  const {route, navigation} = props;
  const {params: place} = route;

  console.log('navigation', navigation);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={{uri: place.picture}}
          resizeMode="cover"
        />
        <View style={styles.placeDataContainer}>
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.placeLocation}>
            {place.city + ', ' + place.country}
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text>DELIVERI DATE</Text>
        <TextInput
          style={[styles.input]}
          onChangeText={setDeliveriDate}
          value={deliveriDate}
        />
        <Text>TEXT NOTE</Text>
        <TextInput
          multiline={true}
          style={[styles.input, styles.textArea]}
          onChangeText={setTextNote}
          value={textNote}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <FlatButton
          width="48%"
          title="SEND REQUEST"
          onPress={() => {
            navigation.navigate('SuccesExchangeRequest', {});
          }}
        />
        <FlatButton
          width="48%"
          title="CANCEL"
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    </SafeAreaView>
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
    fontSize: 14,
    textTransform: 'capitalize',
    color: 'black',
  },
  placeLocation: {
    color: 'black',
    textTransform: 'capitalize',
  },
  //FORM
  formContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    padding: 15,
  },
  input: {
    height: 40,
    borderWidth: 1.5,
    padding: 10,
    paddingTop: 15,
    marginBottom: 25,
  },
  textArea: {
    height: 150,
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
