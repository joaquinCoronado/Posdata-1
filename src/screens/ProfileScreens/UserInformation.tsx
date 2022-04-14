import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import Image from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import PosdataButton from '../../components/PosdataButton';
import {useSettings} from '../../context/settings';
import {useAuth} from '../../context/auth';
import {updateInfoUser} from '../../api';
import LoadingModal from '../../components/LoadingModal';

const UserInformation = ({navigation}: any) => {
  let [isEditMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {theme} = useSettings();
  const {user, setUser} = useAuth();
  let {picture = ''} = user?.userInfo ? user?.userInfo : {};

  const DataRow = ({label, data}) => {
    return (
      <View style={styles.dataRowContainer}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowData, {color: theme.colors.text}]}>{data}</Text>
      </View>
    );
  };

  const InformationList = () => (
    <>
      <DataRow label="NAME" data={user?.userInfo?.name} />
      <DataRow label="EMAIL" data={user?.userInfo?.email} />
      <DataRow label="COUNTRY" data={user?.userInfo?.country} />
      <DataRow label="CITY" data={user?.userInfo?.city} />
      <DataRow label="GENDER" data={user?.userInfo?.gender} />
      <DataRow label="BIRTHDAY" data={user?.userInfo?.birthday} />
      <View style={styles.buttonsContainer}>
        <PosdataButton
          containerStyles={styles.blackButton}
          textStyles={styles.blackButtonText}
          title="UPDATE INFO"
          onPress={() => {
            setEditMode(actual => !actual);
          }}
        />
      </View>
    </>
  );

  const UserDataForm = () => {
    let [form, setForm] = useState({
      name: user?.userInfo.name,
      country: user?.userInfo.country,
      city: user?.userInfo.city,
      gender: user?.userInfo.gender,
      birthday: user?.userInfo.birthday,
    });

    const updateUserInfo = async () => {
      setLoading(true);
      try {
        const updatedUser = await updateInfoUser({...form, id: user?.id});
        setUser({...user, userInfo: updatedUser});
        setEditMode(actual => !actual);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    return (
      <>
        <View>
          {/* NAME */}
          <Text style={[styles.rowData, {color: theme.colors.text}]}>NAME</Text>
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.colors.text, color: theme.colors.text},
            ]}
            onChangeText={value => {
              setForm(current => {
                return {...current, name: value};
              });
            }}
            value={form.name}
            placeholder="name"
          />
          {/* CONTRY */}
          <Text style={[styles.rowData, {color: theme.colors.text}]}>
            COUNTRY
          </Text>
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.colors.text, color: theme.colors.text},
            ]}
            onChangeText={value => {
              setForm(current => {
                return {...current, country: value};
              });
            }}
            value={form.country}
            placeholder="country"
          />
          {/* CITY */}
          <Text style={[styles.rowData, {color: theme.colors.text}]}>CITY</Text>
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.colors.text, color: theme.colors.text},
            ]}
            onChangeText={value => {
              setForm(current => {
                return {...current, city: value};
              });
            }}
            value={form.city}
            placeholder="city"
          />
          {/* GENDER */}
          <Text style={[styles.rowData, {color: theme.colors.text}]}>
            GENDER
          </Text>
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.colors.text, color: theme.colors.text},
            ]}
            onChangeText={value => {
              setForm(current => {
                return {...current, gender: value};
              });
            }}
            value={form.gender}
            placeholder="gender"
          />
          {/* BIRTHDAY */}
          <Text style={[styles.rowData, {color: theme.colors.text}]}>
            BIRTHDAY
          </Text>
          <TextInput
            style={[
              styles.input,
              {borderColor: theme.colors.text, color: theme.colors.text},
            ]}
            onChangeText={value => {
              setForm(current => {
                return {...current, birthday: value};
              });
            }}
            value={form.birthday}
            placeholder="birthday"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <PosdataButton
            containerStyles={styles.blackButton}
            textStyles={styles.blackButtonText}
            title="SAVE CHANGES"
            onPress={updateUserInfo}
          />
          <PosdataButton
            title="CANCELAR"
            onPress={() => {
              setEditMode(actual => !actual);
            }}
          />
        </View>
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {isEditMode ? (
            <Pressable
              style={[styles.changeImageContainer, styles.imageBackground]}
              onPressOut={() => {
                console.log('change image');
              }}>
              <Icon color={'white'} size={34} name="camera-outline" />
              <Text style={{color: 'white', fontWeight: 'bold'}}>CHANCGE</Text>
              <Text style={{color: 'white', fontWeight: 'bold'}}>PHOTO</Text>
            </Pressable>
          ) : null}

          <Pressable
            disabled={!isEditMode}
            onPress={() => {
              console.log('change image');
            }}>
            <Image
              resizeMode="cover"
              source={{uri: picture}}
              style={[styles.image, {opacity: isEditMode ? 0.3 : 1}]}
            />
          </Pressable>
        </View>
        <View style={styles.dataContainer}>
          {isEditMode ? <UserDataForm /> : <InformationList />}
        </View>
      </View>
      <LoadingModal visible={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
    // backgroundColor: 'grey',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 35,
  },
  //IMAGE
  imageContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image: {
    width: 145,
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.3,
    borderRadius: 80,
  },
  imageBackground: {
    position: 'absolute',
    width: 145,
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 80,
  },
  changeImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //DATA
  dataContainer: {
    flex: 1,
    paddingHorizontal: 5,
    marginBottom: 25,
    // backgroundColor: 'purple',
  },
  dataRowContainer: {
    marginBottom: 25,
  },
  rowLabel: {
    color: '#A8A8A8',
    fontWeight: '500',
    fontSize: 11,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  rowData: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  input: {
    height: 45,
    borderWidth: 1.5,
    padding: 10,
    marginBottom: 10,
  },
  //BUTTONS
  buttonsContainer: {
    height: 130,
    justifyContent: 'flex-end',
    marginBottom: 290,
    marginTop: 30,
    // backgroundColor: 'blue',
  },
  blackButton: {
    backgroundColor: 'black',
  },
  blackButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default UserInformation;
