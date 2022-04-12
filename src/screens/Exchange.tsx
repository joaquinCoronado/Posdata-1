import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSettings} from '../context/settings';
import PosdataButton from '../components/PosdataButton';
import GradientText from '../components/GradientText';

const exchangesToAccept = [
  {
    id: 7,
    releaseDate: '2022-01-16',
    senderId: 1,
    receiverId: 2,
    receiverUser: {
      name: 'Joaquin Coronado',
    },
    senderUser: {
      name: 'Jessy',
    },
    sender: {
      id: 6,
      placeId: 'xxxxxx',
      place: {
        id: '61cd66b031d3397e0e27ee83',
        picture:
          'https://100cosas.guadalajara.gob.mx/storage/images/gallery/minerva-3.jpg',
        name: 'la minerva',
        country: 'mexico',
        city: 'guadalajara',
        ownerId: 2,
        createdAt: '2021-12-30',
      },
      textNote: 'xxxxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxx',
      itemStatus: 'WAITING_NOTE',
      ownerId: 1,
    },
    receiver: {
      id: 9,
      placeId: 'xxxxxx',
      pictureNote:
        'https://res.cloudinary.com/posdata/image/upload/v1644387732/posdata/1644387731359-Screenshot at May 10 17-24-10.png',
      textNote: 'texto de la nota asignada por la aceptacion del intercambio',
      itemStatus: 'ACCEPTED',
      ownerId: 2,
    },
    requestStatus: 'ACCEPTED',
    createdAt: '2022-01-16T22:44:14Z',
    updatedAt: '2022-01-18T19:40:23Z',
  },
];

const exchangesWaitingResponse = [
  {
    id: 7,
    releaseDate: '2022-01-16',
    senderId: 1,
    receiverId: 2,
    receiverUser: {
      name: 'Joaquin Coronado',
    },
    senderUser: {
      name: 'Nathalia',
    },
    sender: {
      id: 6,
      placeId: 'xxxxxx',
      place: {
        id: '61cd66b031d3397e0e27ee83',
        picture:
          'https://media.hrs.com/media/image/de/01/d4/Riu_Plaza_Guadalajara_Hotel-Guadalajara-Aussenansicht-2-578890.jpg',
        name: 'riu',
        country: 'mexico',
        city: 'guadalajara',
        ownerId: 2,
        createdAt: '2021-12-30',
      },
      textNote: 'xxxxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxx',
      itemStatus: 'WAITING_NOTE',
      ownerId: 1,
    },
    receiver: {
      id: 9,
      placeId: 'xxxxxx',
      pictureNote:
        'https://images.squarespace-cdn.com/content/v1/58b2f9802e69cf75a41179db/1524601476663-WDL26GE6XUYV7QDRHECU/Tlaquepaque%2C+Mexico',
      textNote: 'texto de la nota asignada por la aceptacion del intercambio',
      itemStatus: 'ACCEPTED',
      ownerId: 2,
    },
    requestStatus: 'ACCEPTED',
    createdAt: '2022-01-16T22:44:14Z',
    updatedAt: '2022-01-18T19:40:23Z',
  },
  {
    id: 8,
    releaseDate: '2022-01-16',
    senderId: 1,
    receiverId: 2,
    receiverUser: {
      name: 'Joaquin Coronado',
    },
    senderUser: {
      name: 'Jessy',
    },
    sender: {
      id: 6,
      placeId: 'xxxxxx',
      place: {
        id: '61cd66b031d3397e0e27ee83',
        picture:
          'https://images.squarespace-cdn.com/content/v1/58b2f9802e69cf75a41179db/1524601476663-WDL26GE6XUYV7QDRHECU/Tlaquepaque%2C+Mexico',
        name: 'tlaquepaque',
        country: 'mexico',
        city: 'guadalajara',
        ownerId: 2,
        createdAt: '2021-12-30',
      },
      textNote: 'xxxxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxx',
      itemStatus: 'WAITING_NOTE',
      ownerId: 1,
    },
    receiver: {
      id: 9,
      placeId: 'xxxxxx',
      pictureNote:
        'https://res.cloudinary.com/posdata/image/upload/v1644387732/posdata/1644387731359-Screenshot at May 10 17-24-10.png',
      textNote: 'texto de la nota asignada por la aceptacion del intercambio',
      itemStatus: 'ACCEPTED',
      ownerId: 2,
    },
    requestStatus: 'ACCEPTED',
    createdAt: '2022-01-16T22:44:14Z',
    updatedAt: '2022-01-18T19:40:23Z',
  },
  {
    id: 9,
    releaseDate: '2022-01-16',
    senderId: 1,
    receiverId: 2,
    receiverUser: {
      name: 'Joaquin Coronado',
    },
    senderUser: {
      name: 'Monserrath',
    },
    sender: {
      id: 6,
      placeId: 'xxxxxx',
      place: {
        id: '61cd66b031d3397e0e27ee83',
        picture:
          'https://cdn1.matadornetwork.com/blogs/2/2018/03/chichen-itza-portada.jpg',
        name: 'Chichén Itzá',
        country: 'mexico',
        city: 'guadalajara',
        ownerId: 2,
        createdAt: '2021-12-30',
      },
      textNote: 'xxxxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxx',
      itemStatus: 'WAITING_NOTE',
      ownerId: 1,
    },
    receiver: {
      id: 9,
      placeId: 'xxxxxx',
      pictureNote:
        'https://res.cloudinary.com/posdata/image/upload/v1644387732/posdata/1644387731359-Screenshot at May 10 17-24-10.png',
      textNote: 'texto de la nota asignada por la aceptacion del intercambio',
      itemStatus: 'ACCEPTED',
      ownerId: 2,
    },
    requestStatus: 'ACCEPTED',
    createdAt: '2022-01-16T22:44:14Z',
    updatedAt: '2022-01-18T19:40:23Z',
  },
];

const ExchangeRow = ({exchange}) => {
  const {sender, senderUser} = exchange;
  let {theme} = useSettings();
  let {text} = theme.colors;

  return (
    <TouchableOpacity style={styles.rowContainer}>
      <Image
        source={{uri: sender?.place?.picture}}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.rowDataContainer}>
        <Text style={[styles.rowDataUserName, {color: text}]}>
          {senderUser.name}
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
  const {theme} = useSettings();
  let {text} = theme.colors;
  return (
    <>
      <View style={styles.listContainer}>
        <Text style={[styles.titleTwo, {color: text}]}>PENDIND TO ACCEPT</Text>
        {exchangesToAccept.map(exchange => (
          <ExchangeRow exchange={exchange} />
        ))}
      </View>
      <View style={styles.listContainer}>
        <Text style={[styles.titleTwo, {color: text}]}>WAITING RESPONSE</Text>
        {exchangesWaitingResponse.map(exchange => (
          <ExchangeRow exchange={exchange} />
        ))}
      </View>
    </>
  );
};

const CompledExchamgeList = () => {
  const {theme} = useSettings();
  let {text} = theme.colors;
  return (
    <View style={styles.listContainer}>
      <Text style={[styles.titleTwo, {color: text}]}>ALL COMPLETED</Text>
      {exchangesWaitingResponse.map(exchange => (
        <ExchangeRow key={exchange.id} exchange={exchange} />
      ))}
    </View>
  );
};

const Exchange = () => {
  let [isLoading, setLoading] = useState(false);
  let [showActiveView, setShowActiveView] = useState(true);
  const {theme} = useSettings();
  let {text} = theme.colors;

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
