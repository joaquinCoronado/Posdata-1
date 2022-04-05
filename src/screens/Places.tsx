import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSettings} from '../context/settings';
import FlatButton from '../components/FlatButton';

// DOMMY DATA OF PLACES
const placesList = [
  {
    id: '61cd6b11a2df096ee18a42d9',
    picture:
      'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
    name: 'la minerva',
    country: 'mexico',
    city: 'guadalajara',
    ownerId: 2,
    createdAt: '2021-12-30',
  },
  {
    id: '61cfab06d226d73c58119b51',
    picture:
      'https://elviajerofeliz.com/wp-content/uploads/2015/09/paisajes-de-Canada.jpg',
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
      'https://www.nippon.com/es/ncommon/contents/japan-data/1331263/1331263.jpg',
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
      'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
    name: 'la minerva',
    country: 'mexico',
    city: 'guadalajara',
    ownerId: 2,
    createdAt: '2021-12-30',
  },
  {
    id: '61cfab06d226d73c58119b512',
    picture:
      'https://elviajerofeliz.com/wp-content/uploads/2015/09/paisajes-de-Canada.jpg',
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
      'https://www.nippon.com/es/ncommon/contents/japan-data/1331263/1331263.jpg',
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

const renderItem = (props: renderItemProps) => {
  const {item} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => {
        console.log('On press: ', item.name, item.id);
      }}
      style={styles.itemContainer}>
      <ImageBackground
        source={{uri: item.picture}}
        resizeMode="cover"
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const listFooter = () => <FlatButton onPress={() => {}} title="SEE MORE" />;

const Places = () => {
  let [isLoading, setLoading] = useState(false);
  const {theme} = useSettings();

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
            renderItem={renderItem}
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
    backgroundColor: 'blue',
    height: 350,
    width: '50%',
    marginBottom: 5,
    marginRight: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Places;
