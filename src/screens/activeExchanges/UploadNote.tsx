import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import PosdataButton from '../../components/PosdataButton';
import LoadingModal from '../../components/LoadingModal';

import {uploadImage, addNoteToRequest, deleteImage} from '../../api';
import {useSettings} from '../../context/settings';

interface Photo {
  type: string;
  uri: string;
  name: string;
}

const UploadNote = ({navigation, route}: any) => {
  const [tempPhotos, setTempPhotos] = useState<Photo[]>([]);
  const [isLoading, setLoading] = useState(false);

  const {params} = route;
  const {actualImage, itemId} = params;
  console.log('params', params);

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
                  uri: res?.assets?.[0]?.uri,
                  type: res?.assets?.[0]?.type,
                  name: res?.assets?.[0]?.fileName,
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
                  uri: res?.assets?.[0]?.uri,
                  type: res?.assets?.[0]?.type,
                  name: res.assets[0].fileName,
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

  const handleUpdateProfileImage = async () => {
    if (tempPhotos.length <= 0) {
      Alert.alert('Ups...', 'Pick an image to countinue', [
        {
          text: 'ok',
          onPress: () => {},
        },
      ]);
      return;
    }
    setLoading(true);

    let newImage = '';
    try {
      const res = await uploadImage(tempPhotos[0]);

      if (res?.data?.image) {
        newImage = res.data.image;
        await addNoteToRequest(itemId, newImage);
        navigation.pop();
      }
    } catch (e) {
      if (newImage !== '') {
        await deleteImage(newImage);
      }
      console.log(e);
    }

    setLoading(false);
  };

  const ImageBlanckState = () => (
    <View style={styles.blanckImageContainer}>
      <Text style={[styles.textBlanckSate, {color: theme.colors.text}]}>
        To start
      </Text>
      <Text style={[styles.textBlanckSate, {color: theme.colors.text}]}>
        pick your image
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* IMAGE */}
      <View style={styles.imageContainer}>
        {tempPhotos.length <= 0 && !actualImage ? (
          <ImageBlanckState />
        ) : (
          <View style={styles.selectedImageContainer}>
            <Image
              resizeMode="cover"
              source={{uri: tempPhotos[0] ? tempPhotos[0].uri : actualImage}}
              style={styles.selectedImage}
            />
            {tempPhotos.length > 0 ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setTempPhotos([]);
                }}>
                <Icon name="close-sharp" size={30} color="white" />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        <PosdataButton
          title="PICK IMAGE"
          containerStyles={styles.blackButton}
          textStyles={styles.blackButtonText}
          onPress={getPhotos}
        />
        <PosdataButton title="SAVE" onPress={handleUpdateProfileImage} />
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.pop()}>
        <Icon color={'white'} size={34} name="arrow-back-sharp" />
      </TouchableOpacity>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 35,
  },

  //Image
  imageContainer: {
    flex: 1,
    width: '100%',
  },
  blanckImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlanckSate: {
    fontWeight: '300',
    fontSize: 18,
  },
  selectedImage: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-start',
  },
  selectedImageContainer: {
    height: '100%',
    overflow: 'hidden',
  },
  slideIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    padding: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  //ButtonsContainer
  buttonsContainer: {
    width: '100%',
    padding: 15,
    paddingTop: 5,
    marginBottom: 25,
    borderTopWidth: 1,
  },
  blackButton: {
    backgroundColor: 'black',
  },
  blackButtonText: {
    color: 'white',
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

export default UploadNote;
