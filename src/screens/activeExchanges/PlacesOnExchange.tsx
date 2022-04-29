import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Image from 'react-native-fast-image';
import GradientText from '../../components/GradientText';
import PosdataButton from '../../components/PosdataButton';
import {useAuth} from '../../context/auth';
import {useExchangeContext} from '../../context/exchange';
import Icon from 'react-native-vector-icons/Ionicons';
import {acceptNote, getExchangeById} from '../../api';
import LoadingModal from '../../components/LoadingModal';
import {useSettings} from '../../context/settings';

interface Props {
  navigation: any;
}

const PlacesOnExchange = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingList, setLoadingList] = useState(false);

  const {
    selectedExchange: exchange,
    setSelectedExchange,
    setExchanges,
    exchanges,
  } = useExchangeContext();

  const {navigation} = props;
  const {sender, receiver, receiverUser, senderUser} = exchange;

  const {theme} = useSettings();
  const {user} = useAuth();

  /*******
   * Update the list of exchanges if
   * the selected exchange is updated.
   */
  useEffect(() => {
    if (
      exchange.requestStatus === 'COMPLETED' &&
      exchanges.exchangesActives.find((item: any) => item.id === exchange.id)
    ) {
      setExchanges((prev: any) => {
        //Remove the selectedExchange from exchangesActive
        const newExchangesActives = prev.exchangesActives.filter(
          (item: any) => item.id !== exchange.id,
        );

        //Add the selectedExchange to exchangesCompleted
        const newExchangesComplited = [...prev.exchangesCompleted, exchange];

        return {
          ...prev,
          exchangesCompleted: newExchangesComplited,
          exchangesActives: newExchangesActives,
        };
      });
    } else {
      setExchanges((prev: any) => {
        const newActiveExchanges = [];
        for (let i = 0; i < prev.exchangesActives.length; i++) {
          exchange.id === prev.exchangesActives[i].id
            ? (newActiveExchanges[i] = exchange)
            : (newActiveExchanges[i] = prev.exchangesActives[i]);
        }

        return {
          ...prev,
          exchangesActives: newActiveExchanges,
        };
      });
    }
  }, [exchange]);

  const NotMyExchangeItemButtonAtRow = ({picture, itemStatus, itemId}: any) => {
    if (exchange.requestStatus === 'COMPLETED' && itemStatus === 'ACCEPTED') {
      return (
        <PosdataButton
          containerStyles={styles.buttonAtRow}
          height={26}
          gradientHeight={30}
          width={100}
          title="DOWNLOAD"
          gradient
        />
      );
    } else if (itemStatus === 'ACCEPTED') {
      return <Text style={{color: theme.colors.text}}>accepted note</Text>;
    } else if (picture) {
      return (
        <PosdataButton
          containerStyles={[styles.buttonAtRow, {backgroundColor: '#000'}]}
          textStyles={{color: '#fff'}}
          width={100}
          title="CHANGE NOTE"
          onPress={() => {
            navigation.navigate('UploadNote', {itemId, actualImage: picture});
          }}
        />
      );
    } else {
      return (
        <PosdataButton
          containerStyles={styles.buttonAtRow}
          width={100}
          onPress={() => {
            navigation.navigate('UploadNote', {itemId});
          }}
          title="UPLOAD NOTE"
        />
      );
    }
  };

  const MyExchangeItemButtonAtRow = ({picture, itemStatus}: any) => {
    if (exchange.requestStatus === 'COMPLETED' && itemStatus === 'ACCEPTED') {
      return (
        <PosdataButton
          containerStyles={styles.buttonAtRow}
          height={26}
          gradientHeight={30}
          width={100}
          title="DOWNLOAD"
          gradient
        />
      );
    } else if (itemStatus === 'ACCEPTED') {
      return <Text style={{color: theme.colors.text}}>accepted note</Text>;
    } else if (picture) {
      return (
        <PosdataButton
          containerStyles={styles.buttonAtRow}
          height={26}
          gradientHeight={30}
          width={100}
          title="VIEW NOTE"
          gradient
          onPress={() => {
            setSelectedImage(picture);
            setModalVisible(true);
          }}
        />
      );
    } else {
      return <Text style={{color: theme.colors.text}}>waiting note</Text>;
    }
  };

  //   PLACE ROW
  const PlaceRow = ({exchangeItem, isMyItemExchange, userName}: any) => {
    const place = exchangeItem?.place;
    const itemStatus = exchangeItem?.itemStatus;
    const pictureNote = exchangeItem?.pictureNote;

    console.log('exchangeItem', exchangeItem);

    return (
      <View style={[styles.placeRow, {borderColor: theme.colors.text}]}>
        {exchangeItem ? (
          <View style={styles.rowContainer}>
            {/* HEADER */}
            <View style={styles.rowHeader}>
              <GradientText style={styles.userNameAtRow}>
                {userName}
              </GradientText>
              <Text
                style={[
                  styles.normalTextAtRowHeader,
                  {color: theme.colors.text},
                ]}>
                requested to
              </Text>
            </View>
            {/* BODY */}
            <View style={styles.rowBody}>
              <Image
                source={{uri: place?.picture}}
                resizeMode="cover"
                style={styles.image}
              />
              <View style={styles.rowDataContainer}>
                <Text
                  style={[styles.placeNameAtRow, {color: theme.colors.text}]}>
                  {place?.name}
                </Text>
                <Text style={[styles.addressAtRow, {color: theme.colors.text}]}>
                  {place?.city + ', ' + place?.country}
                </Text>
              </View>
              {isMyItemExchange ? (
                <MyExchangeItemButtonAtRow
                  picture={pictureNote}
                  itemStatus={itemStatus}
                />
              ) : (
                <NotMyExchangeItemButtonAtRow
                  picture={pictureNote}
                  itemStatus={itemStatus}
                  itemId={exchangeItem.id}
                />
              )}
            </View>
            {/* FOOTER */}
            <View style={styles.rowFooter}>
              <Text style={[styles.textNoteTitle, {color: theme.colors.text}]}>
                NOTE:
              </Text>
              <Text style={[styles.textNote, {color: theme.colors.text}]}>
                {exchangeItem.textNote}
              </Text>
            </View>
          </View>
        ) : (
          <Text>The user still not accept the exchange</Text>
        )}
      </View>
    );
  };

  const getMyItemExchange = () => {
    console.log('getMyItemExchange: sender: ', sender);
    console.log('getMyItemExchange: receiver: ', receiver);
    if (sender?.ownerId === user?.id) {
      return {exchangeItem: sender, user: senderUser};
    }
    if (receiver?.ownerId === user?.id) {
      return {exchangeItem: receiver, user: receiverUser};
    }
    return {};
  };

  const getTheOtherItemExchange = () => {
    console.log('getTheOtherItemExchange: sender: ', sender);
    console.log('getTheOtherItemExchange: receiver: ', receiver);
    if (sender?.ownerId !== user?.id) {
      return {exchangeItem: sender, user: senderUser};
    }
    if (receiver?.ownerId !== user?.id) {
      return {exchangeItem: receiver, user: receiverUser};
    }
    return {};
  };

  const hanldeAcceptNote = async () => {
    setLoading(true);
    try {
      const myItemExchangeInfo = getMyItemExchange();
      await acceptNote(myItemExchangeInfo.exchangeItem.id, exchange.id);
      const updatedExchange = await getExchangeById(exchange.id);
      setSelectedExchange(updatedExchange);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const hanldeReLoad = async () => {
    setLoadingList(true);
    const updatedExchange = await getExchangeById(exchange.id);
    setSelectedExchange(updatedExchange);
    setLoadingList(false);
  };

  console.log('sender?.ownerId', sender?.ownerId);
  console.log('user?.id', user?.id);
  console.log('receiver?.ownerId', receiver?.ownerId);

  const myItemExchangeInfo = getMyItemExchange();
  const theOtherItemExchangeInfo = getTheOtherItemExchange();

  return (
    <SafeAreaView style={styles.container}>
      {/* BODY */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingList}
            onRefresh={() => {
              hanldeReLoad();
            }}
          />
        }>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}>
          <Icon color={theme.colors.text} size={34} name="arrow-back-sharp" />
        </TouchableOpacity>
        <View style={styles.placesContainer}>
          <PlaceRow
            exchangeItem={theOtherItemExchangeInfo.exchangeItem}
            isMyItemExchange={false}
            userName={theOtherItemExchangeInfo.user.name}
          />
          <PlaceRow
            exchangeItem={myItemExchangeInfo.exchangeItem}
            isMyItemExchange={true}
            userName={myItemExchangeInfo?.user?.name}
          />
        </View>
      </ScrollView>

      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        {myItemExchangeInfo?.exchangeItem?.itemStatus === 'WAITING_ACCEPT' &&
        myItemExchangeInfo?.exchangeItem?.pictureNote ? (
          <PosdataButton
            gradient
            title="ACCEPT NOTE"
            onPress={() => {
              hanldeAcceptNote();
            }}
          />
        ) : null}

        <PosdataButton
          title="COMMENTS"
          onPress={() => {
            navigation.navigate('Chat', exchange);
          }}
        />
      </View>

      {/* MODALS */}
      <Modal visible={modalVisible} animationType="slide">
        <Image
          source={{uri: selectedImage}}
          resizeMode="cover"
          style={{width: '100%', height: '100%', flex: 1}}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            setModalVisible(false);
          }}>
          <Icon name="close-sharp" size={30} color="white" />
        </TouchableOpacity>
      </Modal>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    width: '100%',
  },
  placesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  placeRow: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    //backgroundColor: 'purple',
  },
  buttonsContainer: {
    paddingHorizontal: 15,
  },
  rowDataContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  placeNameAtRow: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  addressAtRow: {
    fontWeight: '300',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  buttonAtRow: {
    height: 30,
    marginTop: 0,
  },
  rowContainer: {
    width: '100%',
    // backgroundColor: 'red',
  },
  rowBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    // borderWidth: 1.5,
    // borderRadius: 5,
    // borderColor: 'grey',
    // padding: 10,
  },
  rowFooter: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 10,
  },
  textNoteTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  textNote: {
    fontWeight: '300',
    fontSize: 16,
  },
  userNameAtRow: {
    fontWeight: '500',
    fontSize: 24,
    marginRight: 5,
    textTransform: 'capitalize',
  },
  normalTextAtRowHeader: {
    fontWeight: '300',
    fontSize: 16,
    marginTop: 6,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  iconContainer: {
    position: 'absolute',
    top: 50,
    right: 30,
    padding: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    borderRadius: 20,
    padding: 5,
  },
});

export default PlacesOnExchange;
