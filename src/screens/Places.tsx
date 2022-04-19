import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Image from 'react-native-fast-image';
import {StackScreenProps} from '@react-navigation/stack';
import {useSettings} from '../context/settings';

import {RootStackParams} from '../navigation/places';
import {searchPlaces} from '../api';

interface renderItemProps {
  item: any;
}

interface Props extends StackScreenProps<RootStackParams, 'Places'> {}

const Places = ({navigation}: Props) => {
  let [isLoading, setLoading] = useState(true);
  let [places, setPlaces] = useState([]);
  const {theme} = useSettings();

  useEffect(() => {
    isLoading ? getPlaces() : null;
  }, [isLoading]);

  async function getPlaces() {
    try {
      let placesFromApi = await searchPlaces('');
      setPlaces(placesFromApi);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.titleOne, {color: theme.colors.text}]}>Places</Text>
      <View style={styles.listPalcesContainer}>
        <Text style={[styles.titleTwo, {color: theme.colors.text}]}>
          BROWS ALL
        </Text>
        <SafeAreaView style={styles.safeAreaContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={isLoading}
            onRefresh={() => {
              setPlaces([]);
              setLoading(true);
            }}
            numColumns={2}
            data={places}
            renderItem={(props: renderItemProps) => {
              const {item} = props;
              return (
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => {
                    navigation.navigate('Place', {...item});
                  }}
                  style={styles.itemContainer}>
                  <Image
                    source={{uri: item.picture}}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() =>
              isLoading ? (
                <View style={styles.listFooterContainer}>
                  <ActivityIndicator size="large" style={styles.marginTop20} />
                </View>
              ) : (
                <View style={styles.listFooterContainer} />
              )
            }
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                title={'Loading..'}
                tintColor="rgba('0,0,0,0.5')"
                refreshing={isLoading}
                onRefresh={() => {
                  setPlaces([]);
                  setLoading(true);
                }}
              />
            }
            onEndReached={() => setLoading(true)}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginTop: 60,
  },
  titleOne: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 10,
  },
  titleTwo: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 10,
  },
  listPalcesContainer: {},
  safeAreaContainer: {
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    height: 350,
    width: '50%',
    marginBottom: 5,
    marginRight: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  listFooterContainer: {
    height: 280,
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  marginTop20: {marginTop: 20},
});

export default Places;
