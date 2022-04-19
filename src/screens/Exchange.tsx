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

const Exchange = () => {
  const [isLoading, setLoading] = useState(false);
  const [showActiveView, setShowActiveView] = useState(true);
  const [exchanges, setExchanges] = useState({
    exchangesPenddingToAccept: [],
    exchangesActives: [],
    exchangesCompleted: [],
  });
  const {exchangesPenddingToAccept, exchangesActives, exchangesCompleted} =
    exchanges;

  const {theme} = useSettings();
  let {text} = theme.colors;

  useEffect(() => {
    getExchanges();
  }, []);

  const getExchanges = async () => {
    const penddingExchangesFromApi = await getPenddingToAcceptExchanges();
    const exchangesActivesFromApi = await getActiveExchanges();
    setExchanges(prev => ({
      ...prev,
      exchangesPenddingToAccept: penddingExchangesFromApi,
      exchangesActives: exchangesActivesFromApi,
    }));
  };

  const ExchangeRow = ({exchange}: any) => {
    const {sender, senderUser} = exchange;

    return (
      <TouchableOpacity style={styles.rowContainer}>
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
            <GradientText style={styles.rowDataPlaceName}>
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
        <View style={styles.listContainer}>
          <Text style={[styles.titleTwo, {color: text}]}>
            PENDIND TO ACCEPT
          </Text>
          {exchangesPenddingToAccept.map(exchange => (
            <ExchangeRow exchange={exchange} />
          ))}
        </View>
        <View style={styles.listContainer}>
          <Text style={[styles.titleTwo, {color: text}]}>WAITING RESPONSE</Text>
          {exchangesActives.map(exchange => (
            <ExchangeRow exchange={exchange} />
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
    setLoading(true);
    getExchanges();
    setLoading(false);
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
  },
  listContainer: {
    marginTop: 20,
  },
  requestNameContainer: {
    flexDirection: 'row',
  },
});

export default Exchange;
