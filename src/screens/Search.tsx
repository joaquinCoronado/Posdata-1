import React, {useState, useEffect, useCallback} from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {useSettings} from '../context/settings';
import PosdataButton from '../components/PosdataButton';
import {RootStackParams} from '../navigation/places';
import {searchPlaces} from '../api';

interface Props extends StackScreenProps<RootStackParams, 'Places'> {}

const Search = ({navigation}: Props) => {
  let [places, setPlaces] = useState([]);
  let [searchTest, setSearchText] = useState('');
  let [isLoading, setLoading] = useState(false);
  const {theme} = useSettings();
  const {top} = useSafeAreaInsets();
  const {text} = theme.colors;

  const getPlaces = useCallback(async () => {
    try {
      setLoading(true);
      let placesFromApi = await searchPlaces(searchTest);
      setPlaces(placesFromApi);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [searchTest]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  interface renderItemProps {
    item: any;
  }

  const listFooter = (onPres: any) => (
    <View style={styles.listFooterContainer}>
      <PosdataButton
        onPress={() => {
          onPres();
        }}
        title="SEE MORE"
      />
    </View>
  );

  return (
    <View style={{...styles.container, marginTop: top}}>
      <Text style={[styles.titleOne, {color: text}]}>Search</Text>
      <View>
        <TextInput
          style={[styles.input, {borderColor: text, color: text}]}
          onChangeText={setSearchText}
          value={searchTest}
          onEndEditing={() => {
            getPlaces();
          }}
        />
        <SafeAreaView style={styles.safeAreaContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={isLoading}
            onRefresh={() => {
              getPlaces();
            }}
            numColumns={3}
            data={places}
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
                    style={styles.image}
                  />
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={listFooter(getPlaces)}
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
    height: 145,
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
    borderWidth: 1.5,
    padding: 10,
    marginBottom: 10,
  },
  listFooterContainer: {
    marginBottom: 335,
  },
});

export default Search;
