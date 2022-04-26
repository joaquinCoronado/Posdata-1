import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Image from 'react-native-fast-image';
import PosdataButton from '../components/PosdataButton';
import {getUserInfo, getPlacesByOwnerId} from '../api';

import {useSettings} from '../context/settings';
import {useAuth} from '../context/auth';

const Profile = ({navigation}: any) => {
  const [isLoading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  const {theme} = useSettings();
  const {user, setUser} = useAuth();
  const {
    picture,
    id,
    name,
    country = '',
    city = '',
  } = user?.userInfo ? user?.userInfo : {};

  useEffect(() => {
    getPlacesOfTheUser();
  }, []);

  const getPlacesOfTheUser = async () => {
    setLoading(true);
    const placesFromDB = await getPlacesByOwnerId(id);
    setPlaces(placesFromDB);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const userInfo = await getUserInfo(id);
    console.log('userInfo', userInfo);
    setUser({...user, userInfo});
    getPlacesOfTheUser();
    setLoading(false);
  };

  interface renderItemProps {
    item: any;
  }

  const UserData = () => {
    return (
      <View style={styles.userDataContainer}>
        <Image
          resizeMode="cover"
          source={{uri: picture}}
          style={styles.image}
        />
        <Text style={[styles.userNameText, {color: theme.colors.text}]}>
          {name}
        </Text>
        <Text style={[styles.userAdressText, {color: theme.colors.text}]}>
          {`${city}, ${country}`}
        </Text>
      </View>
    );
  };

  const Buttons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <PosdataButton
          containerStyles={styles.blackButton}
          textStyles={[styles.blackButtonText, styles.buttonText]}
          title="INFORMATION"
          onPress={() => {
            navigation.navigate('UserInformation');
          }}
        />
        <PosdataButton
          textStyles={styles.buttonText}
          title="CONFIGURATION"
          onPress={() => navigation.navigate('Configuration')}
        />
      </View>
    );
  };

  const ListFooter = (onPres: any) => (
    <View style={styles.listFooter}>
      <PosdataButton
        onPress={() => {
          onPres();
        }}
        title="SEE MORE"
      />
    </View>
  );

  return (
    <View style={styles.placesContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={places}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        renderItem={(props: renderItemProps) => {
          const {item} = props;
          return (
            <TouchableOpacity
              disabled={isLoading}
              activeOpacity={0.88}
              onPress={() => {
                navigation.navigate('Place', {
                  place: item,
                  options: {mode: 'request'},
                });
              }}
              style={styles.itemContainer}>
              <Image
                source={{uri: item.picture}}
                resizeMode="cover"
                style={styles.placeImage}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={place => place.id}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <UserData />
            <Buttons />
          </View>
        }
        ListFooterComponent={ListFooter(getPlacesOfTheUser)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  // DATA USER
  userDataContainer: {
    marginTop: 65,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 160,
    height: 160,
    backgroundColor: 'lightgrey',
    borderRadius: 80,
    marginBottom: 25,
  },
  userNameText: {
    fontWeight: '200',
    fontSize: 40,
    marginBottom: 15,
  },
  userAdressText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },

  //BUTTONS
  buttonsContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  blackButton: {
    backgroundColor: 'black',
  },
  blackButtonText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 14,
  },

  //PLACES
  placesContainer: {
    flex: 1,
    paddingHorizontal: 8,
    width: '100%',
  },
  itemContainer: {
    height: 250,
    width: '50%',
    marginBottom: 5,
    marginRight: 5,
  },
  placeImage: {
    flex: 1,
    justifyContent: 'center',
  },
  listHeader: {
    marginBottom: 25,
  },
  listFooter: {
    marginBottom: 125,
  },
});

export default Profile;
