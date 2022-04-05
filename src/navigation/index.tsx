import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {fade} from '../utils/screenAnimations';
import {useAuth} from '../context/auth';
import Auth from '../screens/Auth';
import ResetPassword from '../screens/ResetPassword';
import Tabs from './tabs';

export type RootStackParams = {
  Auth: undefined;
  Home: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
  const {user} = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        <Stack.Screen
          component={Tabs}
          name="Home"
          options={{
            cardStyleInterpolator: fade,
          }}
        />
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
