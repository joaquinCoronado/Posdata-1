import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import PosdataButton from '../../components/PosdataButton';
import LoadingModal from '../../components/LoadingModal';

import {uploadImage, updateInfoUser, deleteImage} from '../../api';
import {useSettings} from '../../context/settings';
import {useAuth} from '../../context/auth';

interface Photo {
  type: string;
  uri: string;
  name: string;
}

const UpdateUserImage = ({navigation}: any) => {
  const [tempPhotos, setTempPhotos] = useState<Photo[]>([]);

  const [isLoading, setLoading] = useState(false);

  const {user, setUser} = useAuth();
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
        const updatedUser = await updateInfoUser({
          id: user?.id,
          picture: res?.data?.image,
        });
        setUser({...user, userInfo: updatedUser});
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
        {tempPhotos.length > 0 ? (
          tempPhotos.map((photo, _index) => (
            <View style={styles.selectedImageContainer}>
              <Image
                resizeMode="cover"
                source={{uri: photo.uri}}
                style={styles.selectedImage}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setTempPhotos([]);
                }}>
                <Icon name="close-sharp" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <ImageBlanckState />
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
});

export default UpdateUserImage;
