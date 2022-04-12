import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-fast-image';
import {StackScreenProps} from '@react-navigation/stack';
import {useSettings} from '../context/settings';
import PosdataButton from '../components/PosdataButton';
import {RootStackParams} from '../navigation/places';

// DOMMY DATA OF PLACES
const placesList = [
  {
    id: '61cd6b11a2df096ee18a42d9',
    picture:
      'https://100cosas.guadalajara.gob.mx/storage/images/gallery/minerva-3.jpg',
    name: 'la minerva',
    country: 'mexico',
    city: 'guadalajara',
    ownerId: 2,
    createdAt: '2021-12-30',
  },
  {
    id: '61cfab06d226d73c58119b51',
    picture:
      'https://media.hrs.com/media/image/de/01/d4/Riu_Plaza_Guadalajara_Hotel-Guadalajara-Aussenansicht-2-578890.jpg',
    name: 'riu',
    country: 'mexico',
    city: 'guadalajara',
    ownerId: 2,
    createdAt: '2021-12-31',
    updatedAt: '2022-01-02',
  },
  {
    id: '61d13ef7947cb16b8ea2fec2',
    picture:
      'https://images.squarespace-cdn.com/content/v1/58b2f9802e69cf75a41179db/1524601476663-WDL26GE6XUYV7QDRHECU/Tlaquepaque%2C+Mexico',
    name: 'letras de tlaquepaque',
    country: 'mexico',
    city: 'tlaquepaque',
    ownerId: 2,
    createdAt: '2022-01-01',
    updatedAt: '2022-01-02',
  },
  {
    id: '61cd6b11a2df096ee18a42d91',
    picture:
      'https://100cosas.guadalajara.gob.mx/storage/images/gallery/minerva-3.jpg',
    name: 'la minerva',
    country: 'mexico',
    city: 'guadalajara',
    ownerId: 2,
    createdAt: '2021-12-30',
  },
  {
    id: '61cfab06d226d73c58119b512',
    picture:
      'https://media.hrs.com/media/image/de/01/d4/Riu_Plaza_Guadalajara_Hotel-Guadalajara-Aussenansicht-2-578890.jpg',
    name: 'riu',
    country: 'mexico',
    city: 'guadalajara',
    ownerId: 2,
    createdAt: '2021-12-31',
    updatedAt: '2022-01-02',
  },
  {
    id: '61d13ef7947cb16b8ea2fec23',
    picture:
      'https://images.squarespace-cdn.com/content/v1/58b2f9802e69cf75a41179db/1524601476663-WDL26GE6XUYV7QDRHECU/Tlaquepaque%2C+Mexico',
    name: 'letras de tlaquepaque',
    country: 'mexico',
    city: 'tlaquepaque',
    ownerId: 2,
    createdAt: '2022-01-01',
    updatedAt: '2022-01-02',
  },
];

interface renderItemProps {
  item: any;
}

const listFooter = () => (
  <View style={styles.listFooterContainer}>
    <PosdataButton onPress={() => {}} title="SEE MORE" />
  </View>
);

interface Props extends StackScreenProps<RootStackParams, 'Places'> {}

const Places = ({navigation}: Props) => {
  let [isLoading, setLoading] = useState(false);
  const {theme} = useSettings();
  console.log('Navigate: ', navigation);
  return (
    <View style={styles.container}>
      <Text style={[styles.titleOne, {color: theme.colors.text}]}>Places</Text>
      <View style={styles.listPalcesContainer}>
        <Text style={[styles.titleTwo, {color: theme.colors.text}]}>
          BROWS ALL
        </Text>
        <SafeAreaView style={styles.safeAreaContainer}>
          <FlatList
            refreshing={isLoading}
            onRefresh={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
            numColumns={2}
            data={placesList}
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
            ListFooterComponent={listFooter}
            keyExtractor={item => item.id}
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
  listFooterContainer: {marginBottom: 255},
});

export default Places;
