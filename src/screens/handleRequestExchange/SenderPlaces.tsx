import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';
import {useSettings} from '../../context/settings';
import {useExchangeContext} from '../../context/exchange';
import {getPlacesByOwnerId} from '../../api';

interface Props {
  navigation: any;
}

const SenderPlaces = (props: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const {theme} = useSettings();

  const {navigation} = props;
  const {selectedExchange: exchange} = useExchangeContext();

  useEffect(() => {
    getPlacesOfTheUser();
  }, []);

  const getPlacesOfTheUser = async () => {
    setLoading(true);
    const placesFromDB = await getPlacesByOwnerId(exchange?.senderUser?.id);
    setPlaces(placesFromDB);
    setLoading(false);
  };

  const handleRefresh = () => {
    getPlacesOfTheUser();
  };

  const UserData = () => {
    return (
      <View style={styles.userDataContainer}>
        <Image
          resizeMode="cover"
          source={{uri: exchange?.senderUser?.picture}}
          style={styles.image}
        />
        <Text style={[styles.userNameText, {color: theme.colors.text}]}>
          {exchange?.senderUser?.name}
        </Text>
      </View>
    );
  };

  interface renderItemProps {
    item: any;
  }

  return (
    <View style={styles.container}>
      <View style={styles.placesContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={places}
          refreshing={isLoading}
          onRefresh={handleRefresh}
          renderItem={(propsItem: renderItemProps) => {
            const {item} = propsItem;
            return (
              <TouchableOpacity
                disabled={isLoading}
                activeOpacity={0.88}
                onPress={() => {
                  navigation.navigate('Place', {
                    place: item,
                    exchange,
                    options: {mode: 'response'},
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
            </View>
          }
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userDataContainer: {
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  placesContainer: {
    flex: 1,
    paddingHorizontal: 8,
    width: '100%',
  },
  image: {
    width: 160,
    height: 160,
    backgroundColor: 'lightgrey',
    borderRadius: 80,
    marginBottom: 25,
  },
  listHeader: {
    marginBottom: 25,
  },
  placeImage: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    height: 250,
    width: '50%',
    marginBottom: 5,
    marginRight: 5,
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
  footer: {
    height: 50,
  },
});

export default SenderPlaces;
