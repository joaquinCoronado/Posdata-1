import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';

interface Props {
  place: any;
  route: any;
}

const RequestExchangeForm = (props: Props) => {
  let [searchTest, setSearchText] = useState('');
  const {route} = props;
  const {params: place} = route;

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
          onChangeText={setSearchText}
          value={searchTest}
          onEndEditing={() => {
            console.log('text', searchTest);
          }}
        />
      </View>
      <View style={styles.buttonsContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightgrey',
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
    backgroundColor: 'transparent',
    width: '100%',
    padding: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  //BUTTONS
  buttonsContainer: {backgroundColor: 'grey', height: 70, width: '100%'},
});

export default RequestExchangeForm;
