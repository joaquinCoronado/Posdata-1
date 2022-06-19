import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useForm} from '../hooks/useForm';
import {useSettings} from '../context/settings';
import {uploadImage, createNewPlace} from '../api';
import {RootTabsParams} from '../navigation/tabs';
import LoadingModal from '../components/LoadingModal';
import PosdataButton from '../components/PosdataButton';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

interface Photo {
  type: string;
  uri: string;
  name: string;
}
interface Props extends BottomTabScreenProps<RootTabsParams, 'NewPlace'> {}

const NewPlace = ({navigation}: Props) => {
  const [tempPhotos, setTempPhotos] = useState<Photo[]>([]);
  const [step, setStep] = useState<'1' | '2' | '3'>('1');
  const [isLoading, setLoading] = useState<true | false>(false);
  const [showWarning, setShowWarning] = useState<true | false>(false);
  const {form, onChange} = useForm({
    country: '',
    state: '',
    city: '',
    placeName: '',
  });

  let width = Dimensions.get('window').width;
  const {theme} = useSettings();

  const getPhotos = () => {
    Alert.alert('Subir Foto', 'Selecciona una opcion', [
      {
        text: 'Tomar Foto',
        onPress: () => {
          launchCamera(
            {
              quality: 0.5,
              mediaType: 'photo',
            },
            res => {
              if (res.didCancel || !res.assets?.[0].uri) {
                return;
              }

              setTempPhotos(s =>
                s.concat({
                  // @ts-ignore
                  uri: res?.assets?.[0]?.uri,
                  type: res?.assets?.[0]?.type,
                  name: res?.assets?.[0]?.fileName,
                  // @ts-ignore
                  size: res.assets[0].fileSize,
                }),
              );
            },
          );
        },
      },
      {
        text: 'Seleccionar de mi Galeria',
        onPress: () => {
          launchImageLibrary(
            {
              quality: 0.5,
              mediaType: 'photo',
            },
            res => {
              if (res.didCancel || !res.assets?.[0].uri) {
                return;
              }
              setTempPhotos([]);

              setTempPhotos(s =>
                s.concat({
                  // @ts-ignore
                  uri: res?.assets?.[0]?.uri,
                  type: res?.assets?.[0]?.type,
                  name: res.assets?.[0].fileName,
                  // @ts-ignore
                  size: res.assets[0].fileSize,
                }),
              );
            },
          );
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const onSubmit = async () => {
    if (!form.city || !form.country || !form.placeName || !form.state) {
      Alert.alert('Faltan datos por llenar');
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    try {
      setLoading(true);
      const res = await uploadImage(tempPhotos[0]);

      if (res?.data?.image) {
        await createNewPlace({
          ...form,
          name: form.placeName,
          picture: res?.data?.image,
        });
        // @ts-ignore
        onChange('clean', null);
        setTempPhotos([]);
        setLoading(false);
        // @ts-ignore
        setStep(s => `${Number(s) + 1}`);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error: ', error);
    }
  };

  switch (step) {
    case '1': {
      return (
        <View style={styles.container}>
          <Swiper
            activeDot={<View />}
            dot={<View />}
            loop
            style={styles.swiperContainer}
            showsButtons={false}>
            {tempPhotos.length === 0 ? (
              // BLANCK STATE
              <View style={styles.slideIcon}>
                <View style={styles.textBlankStateContainer}>
                  <Text
                    style={[styles.textBlanckSate, {color: theme.colors.text}]}>
                    To start
                  </Text>
                  <Text
                    style={[styles.textBlanckSate, {color: theme.colors.text}]}>
                    pick your image
                  </Text>
                </View>
              </View>
            ) : (
              tempPhotos.map((photo, index) => (
                <View style={styles.slide}>
                  <View style={styles.image}>
                    <ReactNativeZoomableView
                      maxZoom={10}
                      minZoom={1}
                      contentWidth={width}
                      contentHeight={150}
                      bindToBorders={true}
                      movementSensibility={1.9}
                      doubleTapZoomToCenter={true}>
                      <Image
                        resizeMode="contain"
                        source={{uri: photo.uri}}
                        style={styles.image}
                      />
                    </ReactNativeZoomableView>
                  </View>

                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => {
                      const images = [...tempPhotos];
                      images.splice(index, 1);
                      setTempPhotos(images);
                    }}>
                    <Icon name="close-sharp" size={30} color="white" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </Swiper>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              // @ts-ignore
              navigation.pop();
            }}>
            <Icon color={'white'} size={34} name="arrow-back-sharp" />
          </TouchableOpacity>
          {/* BUTTONS */}
          <View style={styles.buttons}>
            <PosdataButton
              title="PICK IMAGE"
              containerStyles={styles.buttonContainer}
              textStyles={styles.blackButtonText}
              onPress={getPhotos}
            />
            <PosdataButton
              title="NEXT"
              onPress={() => {
                if (tempPhotos.length <= 0) {
                  Alert.alert('Ups...', 'Pick an image to countinue', [
                    {
                      text: 'ok',
                      onPress: () => {},
                    },
                  ]);
                  return;
                }
                // @ts-ignore
                setStep(s => `${Number(s) + 1}`);
              }}
            />
          </View>
        </View>
      );
    }
    case '2': {
      return (
        <SafeAreaView style={styles.formMainContainer}>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.formContainer}>
              <Text style={[styles.titleForm, {color: theme.colors.text}]}>
                PLACE INFORMATION
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'country')}
                value={form.country}
                placeholder="Country"
                placeholderTextColor={theme.colors.text}
              />

              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'state')}
                value={form.state}
                placeholder="State"
                placeholderTextColor={theme.colors.text}
              />

              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'city')}
                value={form.city}
                placeholder="City"
                placeholderTextColor={theme.colors.text}
              />

              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'placeName')}
                value={form.placeName}
                placeholder="Name place"
                placeholderTextColor={theme.colors.text}
              />
              {showWarning ? (
                <View style={styles.warningContainer}>
                  <Text style={styles.warningMessage}>
                    * Faltan datos por llenar
                  </Text>
                </View>
              ) : null}
              <LoadingModal visible={isLoading} text="Saving place..." />
            </View>
          </ScrollView>
          <View style={styles.formButtonContainer}>
            <PosdataButton title="SAVE PLACE" onPress={onSubmit} gradient />
            <PosdataButton
              title="BACK"
              // @ts-ignore
              onPress={() => setStep(s => `${Number(s) - 1}`)}
            />
          </View>
        </SafeAreaView>
      );
    }
    default:
      return (
        <View style={[styles.container]}>
          <View style={styles.congratTextContainer}>
            <Text style={[styles.title, {color: theme.colors.text}]}>
              SAVED PLACE
            </Text>
            <Text style={[styles.subtitle, {color: theme.colors.text}]}>
              CONGRATULATIONS !!
            </Text>
          </View>
          <View style={styles.congratButtonContainer}>
            <PosdataButton
              title="GO"
              onPress={() => {
                navigation.navigate('Places');
                setStep('1');
              }}
              gradient
            />
            <PosdataButton
              title="MY PLACES"
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  slide: {
    height: '100%',
    overflow: 'hidden',
  },
  slideIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
    padding: 15,
    paddingTop: 5,
    marginBottom: 25,
    borderTopWidth: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    padding: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    height: 55,
    borderWidth: 1.5,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 10,
  },
  inputContainer: {
    padding: 15,
    marginBottom: 0,
  },
  titleForm: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 15,
  },
  loadingContainerModal: {},
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFiles: {},
  textBlankStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlanckSate: {
    fontWeight: '300',
    fontSize: 18,
  },
  buttonContainer: {
    backgroundColor: 'black',
  },
  blackButtonText: {color: 'white'},
  swiperContainer: {height: '100%', width: '100%'},
  formContainer: {
    height: '100%',
    width: '100%',
    padding: 15,
  },
  formButtonContainer: {width: '100%', padding: 15, marginBottom: 25},
  scrollViewContainer: {height: '100%'},
  formMainContainer: {backgroundColor: 'transparent', flex: 1},
  congratTextContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  congratButtonContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5,
  },
  warningContainer: {
    margin: 20,
  },
  warningMessage: {
    color: '#FF4D00',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default NewPlace;
