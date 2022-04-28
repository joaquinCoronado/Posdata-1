import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {fade} from '../utils/screenAnimations';
import {useAuth} from '../context/auth';
import {useSettings} from '../context//settings';
import Auth from '../screens/Auth';
import ResetPassword from '../screens/ResetPassword';
import Tabs from './tabs';
import PlaceDetail from '../screens/PlaceDetail';
import RequestExchangeForm from '../screens/requestExchange/RequestExchangeForm';
import SuccesExchangeRequest from '../screens/requestExchange/SuccesExchangeRequest';
import Chat from '../screens/activeExchanges/Chat';
import NewPlace from '../screens/NewPlace';
import Welcome from '../screens/Welcome';
import Configuration from '../screens/ProfileScreens/Configuration';
import UserInformation from '../screens/ProfileScreens/UserInformation';
import UpdateUserImage from '../screens/ProfileScreens/UpdateUserIamge';
import ResponseExchangeRequest from '../screens/handleRequestExchange/ResponseExchangeRequest';
import SenderPlaces from '../screens/handleRequestExchange/SenderPlaces';
import ResponseExchangeForm from '../screens/handleRequestExchange/ResponseExchangeForm';
import PlacesOnExchange from '../screens/activeExchanges/PlacesOnExchange';
import UploadNote from '../screens/activeExchanges/UploadNote';
import {ExchangeUser} from '../types/chat';

export type RootStackParams = {
  Auth: {mode: string};
  Home: undefined;
  Place: {
    place:
      | {
          id: string;
          picture: string;
          name: string;
          country: string;
          city: string;
          ownerId: number;
          createdAt: string;
        }
      | any;
    options: {
      mode: 'request' | 'response';
    };
  };
  RequestExchangeForm: {
    id: string;
    picture: string;
    name: string;
    country: string;
    city: string;
    ownerId: number;
    createdAt: string;
  };
  ResponseExchangeForm: any;
  SuccesExchangeRequest: undefined;
  ResetPassword: undefined;
  Chat: ExchangeUser;
  Welcome: undefined;
  NewPlace: undefined;
  Configuration: undefined;
  UserInformation: undefined;
  UpdateUserImage: undefined;
  ResponseExchangeRequest: any;
  SenderPlaces: any;
  PlacesOnExchange: any;
  UploadNote: any;
};

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
  const {user} = useAuth();
  const {
    theme: {colors},
  } = useSettings();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        <>
          <Stack.Screen
            component={Tabs}
            name="Home"
            options={{
              cardStyleInterpolator: fade,
            }}
          />
          <Stack.Screen
            component={PlaceDetail}
            name="Place"
            options={{
              cardStyleInterpolator: fade,
            }}
          />
          <Stack.Screen
            component={RequestExchangeForm}
            name="RequestExchangeForm"
          />
          <Stack.Screen
            component={SuccesExchangeRequest}
            name="SuccesExchangeRequest"
          />
          <Stack.Screen
            component={Chat}
            name="Chat"
            options={({route, navigation}) => {
              return {
                headerShown: true,
                headerTitle: route.params?.senderUser?.name,
                headerStyle: {
                  shadowOpacity: 0,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.pop();
                    }}
                    style={styles.backButtonContainer}>
                    <Icon
                      color={colors.text}
                      size={28}
                      name="arrow-back-sharp"
                    />
                  </TouchableOpacity>
                ),
              };
            }}
          />
          <Stack.Screen
            component={NewPlace}
            name="NewPlace"
            options={{
              cardStyleInterpolator: fade,
            }}
          />
          <Stack.Screen component={Configuration} name="Configuration" />
          <Stack.Screen component={UserInformation} name="UserInformation" />
          <Stack.Screen component={UpdateUserImage} name="UpdateUserImage" />
          <Stack.Screen
            component={ResponseExchangeRequest}
            name="ResponseExchangeRequest"
          />
          <Stack.Screen component={SenderPlaces} name="SenderPlaces" />
          <Stack.Screen
            component={ResponseExchangeForm}
            name="ResponseExchangeForm"
          />
          <Stack.Screen
            component={PlacesOnExchange}
            name="PlacesOnExchange"
            options={{
              cardStyleInterpolator: fade,
            }}
          />
          <Stack.Screen
            component={UploadNote}
            name="UploadNote"
            options={{
              cardStyleInterpolator: fade,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    marginHorizontal: 12,
  },
});

export default Navigation;
