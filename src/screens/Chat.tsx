/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Image from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {RootStackParams} from '../navigation/index';
import {useAuth} from '../context/auth';
import {useSettings} from '../context/settings';

const Messages = [
  {
    id: 2,
    userName: 'Joaquin Coronado',
    userImg:
      'https://scontent.fgdl10-1.fna.fbcdn.net/v/t1.18169-9/18839084_10209408588718318_8122898460382478051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S5c9-hJ4U8oAX80O5uF&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT-782KVoFbQPtx_Oxo6rUu2bLhm-_7yUqHNxkUYi-1C6g&oe=628C2782',
    messageTime: '2 min ago',
    message: 'Hello my friend, this is great',
  },
  {
    id: 1,
    userName: 'Oscar Sandoval',
    userImg:
      'https://instagram.fgdl10-1.fna.fbcdn.net/v/t51.2885-19/277999250_988375568465317_3445012283849535506_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgdl10-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=e83QX4BNVesAX_Q7fGa&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_MHKFUCM2a5wQft6kyOKHrxWbznDquAlu_m9Idxcvlhg&oe=626CAA84&_nc_sid=7bff83',
    messageTime: '4 min ago',
    message:
      'Hey there, this is my test for a post of Posdata Chat in React Native',
  },
  {
    id: 3,
    userName: 'Joaquin Coronado',
    userImg:
      'https://scontent.fgdl10-1.fna.fbcdn.net/v/t1.18169-9/18839084_10209408588718318_8122898460382478051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S5c9-hJ4U8oAX80O5uF&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT-782KVoFbQPtx_Oxo6rUu2bLhm-_7yUqHNxkUYi-1C6g&oe=628C2782',
    messageTime: '2 min ago',
    message: 'Hello my friend, this is great',
  },
  {
    id: 4,
    userName: 'Oscar Sandoval',
    userImg:
      'https://instagram.fgdl10-1.fna.fbcdn.net/v/t51.2885-19/277999250_988375568465317_3445012283849535506_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgdl10-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=e83QX4BNVesAX_Q7fGa&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_MHKFUCM2a5wQft6kyOKHrxWbznDquAlu_m9Idxcvlhg&oe=626CAA84&_nc_sid=7bff83',
    messageTime: '4 min ago',
    message:
      'Hey there, this is my test for a post of Posdata Chat in React Native',
  },
  {
    id: 5,
    userName: 'Joaquin Coronado',
    userImg:
      'https://scontent.fgdl10-1.fna.fbcdn.net/v/t1.18169-9/18839084_10209408588718318_8122898460382478051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S5c9-hJ4U8oAX80O5uF&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT-782KVoFbQPtx_Oxo6rUu2bLhm-_7yUqHNxkUYi-1C6g&oe=628C2782',
    messageTime: '2 min ago',
    message: 'Hello my friend, this is great',
  },
  {
    id: 6,
    userName: 'Oscar Sandoval',
    userImg:
      'https://instagram.fgdl10-1.fna.fbcdn.net/v/t51.2885-19/277999250_988375568465317_3445012283849535506_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgdl10-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=e83QX4BNVesAX_Q7fGa&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_MHKFUCM2a5wQft6kyOKHrxWbznDquAlu_m9Idxcvlhg&oe=626CAA84&_nc_sid=7bff83',
    messageTime: '4 min ago',
    message:
      'Hey there, this is my test for a post of Posdata Chat in React Native',
  },
  {
    id: 7,
    userName: 'Joaquin Coronado',
    userImg:
      'https://scontent.fgdl10-1.fna.fbcdn.net/v/t1.18169-9/18839084_10209408588718318_8122898460382478051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S5c9-hJ4U8oAX80O5uF&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT-782KVoFbQPtx_Oxo6rUu2bLhm-_7yUqHNxkUYi-1C6g&oe=628C2782',
    messageTime: '2 min ago',
    message: 'Hello my friend, this is great',
  },
  {
    id: 8,
    userName: 'Oscar Sandoval',
    userImg:
      'https://instagram.fgdl10-1.fna.fbcdn.net/v/t51.2885-19/277999250_988375568465317_3445012283849535506_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgdl10-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=e83QX4BNVesAX_Q7fGa&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_MHKFUCM2a5wQft6kyOKHrxWbznDquAlu_m9Idxcvlhg&oe=626CAA84&_nc_sid=7bff83',
    messageTime: '4 min ago',
    message:
      'Hey there, this is my test for a post of Posdata Chat in React Native',
  },
  {
    id: 9,
    userName: 'Joaquin Coronado',
    userImg:
      'https://scontent.fgdl10-1.fna.fbcdn.net/v/t1.18169-9/18839084_10209408588718318_8122898460382478051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S5c9-hJ4U8oAX80O5uF&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT-782KVoFbQPtx_Oxo6rUu2bLhm-_7yUqHNxkUYi-1C6g&oe=628C2782',
    messageTime: '2 min ago',
    message: 'Hello my friend, this is great',
  },
  {
    id: 10,
    userName: 'Oscar Sandoval',
    userImg:
      'https://instagram.fgdl10-1.fna.fbcdn.net/v/t51.2885-19/277999250_988375568465317_3445012283849535506_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgdl10-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=e83QX4BNVesAX_Q7fGa&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_MHKFUCM2a5wQft6kyOKHrxWbznDquAlu_m9Idxcvlhg&oe=626CAA84&_nc_sid=7bff83',
    messageTime: '4 min ago',
    message:
      'Hey there, this is my test for a post of Posdata Chat in React Native',
  },
  {
    id: 11,
    userName: 'Joaquin Coronado',
    userImg:
      'https://scontent.fgdl10-1.fna.fbcdn.net/v/t1.18169-9/18839084_10209408588718318_8122898460382478051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S5c9-hJ4U8oAX80O5uF&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT-782KVoFbQPtx_Oxo6rUu2bLhm-_7yUqHNxkUYi-1C6g&oe=628C2782',
    messageTime: '2 min ago',
    message: 'Hello my friend, this is great',
  },
  {
    id: 12,
    userName: 'Oscar Sandoval',
    userImg:
      'https://instagram.fgdl10-1.fna.fbcdn.net/v/t51.2885-19/277999250_988375568465317_3445012283849535506_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgdl10-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=e83QX4BNVesAX_Q7fGa&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_MHKFUCM2a5wQft6kyOKHrxWbznDquAlu_m9Idxcvlhg&oe=626CAA84&_nc_sid=7bff83',
    messageTime: '4 min ago',
    message:
      'Hey there, this is my test for a post of Posdata Chat in React Native',
  },
  {
    id: 13,
    userName: 'Joaquin Coronado',
    userImg:
      'https://scontent.fgdl10-1.fna.fbcdn.net/v/t1.18169-9/18839084_10209408588718318_8122898460382478051_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S5c9-hJ4U8oAX80O5uF&_nc_ht=scontent.fgdl10-1.fna&oh=00_AT-782KVoFbQPtx_Oxo6rUu2bLhm-_7yUqHNxkUYi-1C6g&oe=628C2782',
    messageTime: '2 min ago',
    message: 'Hello my friend, this is great',
  },
  {
    id: 14,
    userName: 'Oscar Sandoval',
    userImg:
      'https://instagram.fgdl10-1.fna.fbcdn.net/v/t51.2885-19/277999250_988375568465317_3445012283849535506_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fgdl10-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=e83QX4BNVesAX_Q7fGa&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT_MHKFUCM2a5wQft6kyOKHrxWbznDquAlu_m9Idxcvlhg&oe=626CAA84&_nc_sid=7bff83',
    messageTime: '4 min ago',
    message:
      'Hey there, this is my test for a post of Posdata Chat in React Native',
  },
];
interface Props extends StackScreenProps<RootStackParams, 'Chat'> {}
interface PropsMessage {
  message: {
    id: number;
    userName: string;
    userImg: string;
    messageTime: string;
    message: string;
  };
  me: Boolean;
}
const Message = ({message, me}: PropsMessage) => {
  return (
    <View style={{...styles.card, flexDirection: me ? 'row-reverse' : 'row'}}>
      <Image
        style={{
          ...styles.userImage,
          marginRight: me ? 0 : 14,
          marginLeft: me ? 14 : 0,
        }}
        source={{uri: message.userImg}}
      />
      <LinearGradient
        colors={me ? ['#FF00D6', '#FF4D00'] : ['#312eda', '#754fd4']}
        style={[styles.message, me ? styles.me : styles.other]}>
        <Text style={styles.userInfo}>{message.message}</Text>
      </LinearGradient>
    </View>
  );
};

const Chat = (props: Props) => {
  const [textInput, setTextInput] = useState('');
  const {user} = useAuth();
  const {theme} = useSettings();
  const {bottom} = useSafeAreaInsets();
  const list = useRef<FlatList>(null);
  console.log('List: ', list, props);
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (list.current && Messages.length > 0) {
        list.current.scrollToEnd({animated: true});
      }
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 45 : 0;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={styles.wrapper}>
        <FlatList
          data={Messages}
          ref={list}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={() => <View style={{marginTop: 14}} />}
          renderItem={({item}) => (
            <Message message={item} me={user?.id === item.id} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <View style={{...styles.inputContainer, marginBottom: bottom}}>
          <TextInput
            placeholder="Escribe algo"
            style={[
              styles.input,
              {borderColor: theme.colors.text, color: theme.colors.text},
            ]}
            onChangeText={setTextInput}
            value={textInput}
          />
          <LinearGradient
            style={styles.sendButton}
            colors={['#FF00D6', '#FF4D00']}>
            <TouchableOpacity>
              <Icon name="ios-send-outline" color={'white'} size={20} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  // listMessage: {
  //   flex: 1,
  // },
  inputContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {flexDirection: 'row', alignItems: 'flex-start', flex: 1},
  message: {
    maxWidth: '85%',

    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 9,
  },
  userImage: {
    width: 38,
    height: 38,
    borderRadius: 100,
    resizeMode: 'contain',
    marginRight: 14,
    position: 'relative',
    top: -8,
  },
  userInfo: {
    color: 'white',
  },
  separator: {
    marginVertical: 8,
  },
  me: {
    borderTopRightRadius: 1,
  },
  other: {
    borderTopLeftRadius: 0,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 1,
    borderRadius: 15,
    padding: 10,
  },
  sendButton: {
    padding: 12,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default Chat;
