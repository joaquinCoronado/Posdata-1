import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {fade} from '../utils/screenAnimations';
import {useAuth} from '../context/auth';
import Auth from '../screens/Auth';
import ResetPassword from '../screens/ResetPassword';
import Tabs from './tabs';
import PlaceDetail from '../screens/requestExchange/PlaceDetail';
import RequestExchangeForm from '../screens/requestExchange/RequestExchangeForm';
import SuccesExchangeRequest from '../screens/requestExchange/SuccesExchangeRequest';
import Chat from '../screens/Chat';

export type RootStackParams = {
  Auth: undefined;
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
          <Stack.Screen component={Chat} name="Chat" />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
