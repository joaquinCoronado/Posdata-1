import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Places from '../screens/Places';
import {fade} from '../utils/screenAnimations';

export type RootStackParams = {
  PlacesTest: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const PlacesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        component={Places}
        name="PlacesTest"
        options={{
          cardStyleInterpolator: fade,
        }}
      />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
