import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Image from 'react-native-fast-image';
import {useSettings} from '../context/settings';
import FlatButton from '../components/FlatButton';

const Search = () => {
  let [searchTest, setSearchText] = useState('');
  let [isLoading, setLoading] = useState(false);
  const {theme} = useSettings();
  const {text} = theme.colors;

  // DOMMY DATA OF PLACES
  const placesList = [
    {
      id: '1',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '2',
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
      id: '3',
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
      id: '4',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '5',
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
      id: '6',
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
      id: '7',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '8',
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
      id: '9',
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
      id: '10',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '11',
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
      id: '12',
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
      id: '13',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '14',
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
      id: '15',
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
      id: '16',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '17',
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
      id: '18',
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
      id: '19',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '20',
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
      id: '21',
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
      id: '22',
      picture:
        'https://pbs.twimg.com/media/EurxiTaXUAUkXBz?format=jpg&name=large',
      name: 'la minerva',
      country: 'mexico',
      city: 'guadalajara',
      ownerId: 2,
      createdAt: '2021-12-30',
    },
    {
      id: '23',
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
      id: '24',
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
        disabled={isLoading}
        activeOpacity={0.88}
        onPress={() => {
          console.log('On press: ', item.name, item.id);
        }}
        style={styles.itemContainer}>
        <Image
          source={{uri: item.picture}}
          resizeMode="cover"
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  const listFooter = () => (
    <View style={{marginBottom: 78, color: text}}>
      <FlatButton onPress={() => {}} title="SEE MORE" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.titleOne, {color: text}]}>Search</Text>
      <View>
        <TextInput
          style={[styles.input, {borderColor: text, color: text}]}
          onChangeText={setSearchText}
          value={searchTest}
          onEndEditing={() => {
            console.log('text', searchTest);
          }}
        />
        <SafeAreaView style={styles.safeAreaContainer}>
          <FlatList
            refreshing={isLoading}
            onRefresh={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
            numColumns={3}
            data={placesList}
            renderItem={renderItem}
            ListFooterComponent={listFooter}
            ListHeaderComponent={
              <Text style={[styles.titleTwo, {color: text}]}>ALL RESULTS</Text>
            }
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
  safeAreaContainer: {
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    height: 150,
    width: '33%',
    marginBottom: 5,
    marginRight: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default Search;
