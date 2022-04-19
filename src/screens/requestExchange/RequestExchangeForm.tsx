import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import Image from 'react-native-fast-image';
import PosdataButton from '../../components/PosdataButton';
import GradientText from '../../components/GradientText';
import {useSettings} from '../../context/settings';

interface Props {
  place: any;
  route: any;
  navigation: any;
}

const RequestExchangeForm = (props: Props) => {
  let [deliveriDate, setDeliveriDate] = useState('');
  let [textNote, setTextNote] = useState('');
  let {theme} = useSettings();
  let {dividerColor} = theme;
  let {text} = theme.colors;
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
          <GradientText style={styles.placeName}>{place.name}</GradientText>
          <Text style={[styles.placeLocation, {color: text}]}>
            {place.city + ', ' + place.country}
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.labelTextForImput, {color: text}]}>
          DELIVERI DATE
        </Text>
        <TextInput
          style={[styles.input, {borderColor: dividerColor, color: text}]}
          onChangeText={setDeliveriDate}
          value={deliveriDate}
        />
        <Text style={[styles.labelTextForImput, {color: text}]}>TEXT NOTE</Text>
        <TextInput
          multiline={true}
          style={[
            styles.input,
            styles.textArea,
            {borderColor: dividerColor, color: text},
          ]}
          onChangeText={setTextNote}
          value={textNote}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <PosdataButton
          width="48%"
          title="SEND REQUEST"
          onPress={() => {
            navigation.navigate('SuccesExchangeRequest', {});
          }}
          gradient
        />
        <PosdataButton
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
    height: 40,
    borderWidth: 1.5,
    padding: 10,
    paddingTop: 15,
    marginBottom: 25,
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
