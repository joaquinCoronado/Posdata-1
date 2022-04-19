import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {fade} from '../utils/screenAnimations';
import {useAuth} from '../context/auth';
import Auth from '../screens/Auth';
import ResetPassword from '../screens/ResetPassword';
import Tabs from './tabs';
import PlaceDetail from '../screens/PlaceDetail';
import RequestExchangeForm from '../screens/requestExchange/RequestExchangeForm';
import SuccesExchangeRequest from '../screens/requestExchange/SuccesExchangeRequest';
import Chat from '../screens/Chat';
import NewPlace from '../screens/NewPlace';
import Welcome from '../screens/Welcome';
import Configuration from '../screens/ProfileScreens/Configuration';
import UserInformation from '../screens/ProfileScreens/UserInformation';
import UpdateUserImage from '../screens/ProfileScreens/UpdateUserIamge';

export type RootStackParams = {
  Auth: {mode: string};
  Home: undefined;
  Place: {
    id: string;
    picture: string;
    name: string;
    country: string;
    city: string;
    ownerId: number;
    createdAt: string;
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
  SuccesExchangeRequest: undefined;
  ResetPassword: undefined;
  Chat: undefined;
  Welcome: undefined;
  NewPlace: undefined;
  Configuration: undefined;
  UserInformation: undefined;
  UpdateUserImage: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
  const {user} = useAuth();
  console.log('User: ', user);
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
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen component={NewPlace} name="NewPlace" />
          <Stack.Screen component={Configuration} name="Configuration" />
          <Stack.Screen component={UserInformation} name="UserInformation" />
          <Stack.Screen component={UpdateUserImage} name="UpdateUserImage" />
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

export default Navigation;
