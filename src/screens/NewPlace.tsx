import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {useForm} from '../hooks/useForm';
import {useSettings} from '../context/settings';

const height = Dimensions.get('screen').height;

const NewPlace = () => {
  const [tempPhotos, setTempPhotos] = useState<string[]>([]);
  const [step, setStep] = useState<'1' | '2' | '3'>('1');
  const {form, onChange} = useForm({
    country: '',
    state: '',
    city: '',
    placeName: '',
  });
  const {theme} = useSettings();
  const {top} = useSafeAreaInsets();
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

              setTempPhotos(s => s.concat(res.assets?.[0]?.uri ?? ''));
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

              setTempPhotos(s => s.concat(res.assets?.[0]?.uri ?? ''));
            },
          );
        },
      },
      {
        text: 'Cancelar',

        style: 'cancel',
      },
    ]);
  };

  const onSubmit = () => {
    setStep(s => `${Number(s) + 1}`);
  };
  switch (step) {
    case '1': {
      return (
        <View style={styles.container}>
          <Swiper
            activeDot={<View />}
            dot={<View />}
            loop
            style={{height: height / 2}}
            showsButtons={false}>
            {tempPhotos.length === 0 ? (
              <>
                <View style={styles.slideIcon}>
                  <Icon
                    name="file-tray-full-outline"
                    style={styles.iconFiles}
                    size={180}
                  />
                  <View style={{}}>
                    <Text>title TITLE </Text>
                    <Text>Subtitle subtitle</Text>
                  </View>
                </View>
              </>
            ) : (
              tempPhotos.map((photo, index) => (
                <View style={styles.slide}>
                  <Image
                    resizeMode="cover"
                    source={{uri: photo}}
                    style={styles.image}
                  />
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
          <View style={styles.buttons}>
            <Button
              title="Subir Imagen"
              style={styles.button}
              onPress={getPhotos}
            />
            <Button
              title="Siguiente"
              style={styles.button}
              onPress={() => setStep(s => `${Number(s) + 1}`)}
              mode="white"
            />
          </View>
        </View>
      );
    }
    case '2': {
      return (
        <>
          <ScrollView style={{...styles.container, top: top + 20}}>
            <View>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={() => {}}
                value={form.country}
                onEndEditing={() => {
                  console.log('text');
                }}
                placeholder="Country"
                placeholderTextColor={'rgba(0,0,0,0.8)'}
              />
            </View>
            <View>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'country')}
                value={form.country}
                onEndEditing={() => {
                  console.log('text');
                }}
                placeholder="Pais"
                placeholderTextColor={'rgba(0,0,0,0.8)'}
              />
            </View>
            <View>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'state')}
                value={form.state}
                onEndEditing={() => {
                  console.log('text');
                }}
                placeholder="Estado"
                placeholderTextColor={'rgba(0,0,0,0.8)'}
              />
            </View>
            <View>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'city')}
                value={form.city}
                onEndEditing={() => {
                  console.log('text');
                }}
                placeholder="Ciudad"
                placeholderTextColor={'rgba(0,0,0,0.8)'}
              />
            </View>
            <View>
              <TextInput
                style={[
                  styles.input,
                  {borderColor: theme.colors.text, color: theme.colors.text},
                ]}
                onChangeText={value => onChange(value, 'placeName')}
                value={form.placeName}
                onEndEditing={() => {
                  console.log('text');
                }}
                placeholder="Nombre del lugar"
                placeholderTextColor={'rgba(0,0,0,0.8)'}
              />
            </View>
            <View
              style={{
                bottom: -height / 3 + 13,
              }}>
              <Button
                title="Save Place"
                style={styles.button}
                onPress={onSubmit}
              />
              <Button
                title="Back"
                style={styles.button}
                mode="white"
                onPress={() => setStep(s => `${Number(s) - 1}`)}
              />
            </View>
          </ScrollView>
        </>
      );
    }
    default:
      return (
        <View style={[styles.container]}>
          <View style={{...styles.center, marginTop: height / 3}}>
            <Text style={styles.title}>SAVED PLACE</Text>
            <Text style={styles.subtitle}>CONGRATULATIONS !!</Text>
          </View>
          <View
            style={{
              marginTop: height / 3 - 40,
            }}>
            <Button
              title="Save Place"
              style={styles.button}
              onPress={onSubmit}
            />
            <Button
              title="Back"
              style={styles.button}
              onPress={() => setStep(s => `${Number(s) - 1}`)}
              mode="white"
            />
          </View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  center: {
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-start',
  },
  slide: {
    height: (2 * height) / 3,
    overflow: 'hidden',
  },
  slideIcon: {
    height: (2 * height) / 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    height: height / 3,
    paddingTop: 20,
  },
  button: {
    maxWidth: 350,
    alignSelf: 'center',
    marginBottom: 20,
  },
  iconFiles: {},
  iconContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    padding: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
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
});

export default NewPlace;
