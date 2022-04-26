import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useSettings} from '../context/settings';
import PosdataButton from '../components/PosdataButton';
import GradientText from '../components/GradientText';
import Image from 'react-native-fast-image';
import {getPenddingToAcceptExchanges, getActiveExchanges} from '../api';

interface Props {
  navigation: any;
}

const Exchange = (props: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [showActiveView, setShowActiveView] = useState(true);
  const [exchanges, setExchanges] = useState({
    exchangesPenddingToAccept: [],
    exchangesActives: [],
    exchangesCompleted: [],
  });

  const {navigation} = props;
  const {exchangesPenddingToAccept, exchangesActives, exchangesCompleted} =
    exchanges;

  const {theme} = useSettings();
  let {text} = theme.colors;

  useEffect(() => {
    getExchanges();
  }, []);

  const getExchanges = async () => {
    setLoading(true);
    const penddingExchangesFromApi = await getPenddingToAcceptExchanges();
    const exchangesActivesFromApi = await getActiveExchanges();
    setExchanges(prev => ({
      ...prev,
      exchangesPenddingToAccept: penddingExchangesFromApi,
      exchangesActives: exchangesActivesFromApi,
    }));
    setLoading(false);
  };

  const ExchangeRow = ({exchange, onPress}: any) => {
    const {sender, senderUser} = exchange;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isLoading) {
            return;
          }
          onPress(exchange);
        }}
        style={styles.rowContainer}>
        <Image
          source={{uri: sender?.place?.picture}}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.rowDataContainer}>
          <Text style={[styles.rowDataUserName, {color: text}]}>
            {senderUser?.name}
          </Text>
          <View style={styles.requestNameContainer}>
            <Text style={{color: text}}>Request to</Text>
            <GradientText numberOfLines={1} style={[styles.rowDataPlaceName]}>
              {sender?.place?.name}
            </GradientText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ActiveExchamgeList = () => {
    return (
      <>
        {exchangesPenddingToAccept.length > 0 ? (
          <View style={styles.listContainer}>
            <Text style={[styles.titleTwo, {color: text}]}>
              PENDIND TO ACCEPT
            </Text>
            {exchangesPenddingToAccept.map(exchange => (
              <ExchangeRow
                key={exchange.id}
                onPress={() => {
                  navigation.navigate('ResponseExchangeRequest', exchange);
                }}
                exchange={exchange}
              />
            ))}
          </View>
        ) : null}

        <View style={styles.listContainer}>
          <Text style={[styles.titleTwo, {color: text}]}>
            WAITTING RESPONSE
          </Text>
          {exchangesActives.map(exchange => (
            <ExchangeRow
              key={exchange.id}
              onPress={() => {
                navigation.navigate('PlacesOnExchange', exchange);
              }}
              exchange={exchange}
            />
          ))}
        </View>
      </>
    );
  };

  const CompledExchamgeList = () => {
    return (
      <View style={styles.listContainer}>
        <Text style={[styles.titleTwo, {color: text}]}>ALL COMPLETED</Text>
        {exchangesCompleted.map(exchange => (
          <ExchangeRow key={exchange.id} exchange={exchange} />
        ))}
      </View>
    );
  };

  const onRefresh = () => {
    getExchanges();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleOne, {color: text}]}>Exchanges</Text>
        </View>
        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          <PosdataButton
            width="48%"
            title="ACTIVE"
            gradient={showActiveView}
            onPress={() => {
              setShowActiveView(true);
            }}
          />
          <PosdataButton
            width="48%"
            title="COMPLETED"
            gradient={!showActiveView}
            onPress={() => {
              setShowActiveView(false);
            }}
          />
        </View>
        {/* LIST OF EXCHANGES */}
        <View style={styles.bodyContainer}>
          {showActiveView ? <ActiveExchamgeList /> : <CompledExchamgeList />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    paddingBottom: 0,
  },
  titleOne: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 10,
  },
  titleTwo: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
  },
  bodyContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  rowDataContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rowDataUserName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,
  },
  rowDataPlaceName: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
    width: 200,
  },
  listContainer: {
    marginTop: 20,
  },
  requestNameContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  loadingList: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Exchange;
