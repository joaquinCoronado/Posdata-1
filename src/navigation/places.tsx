import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Places from '../screens/Places';
import Place from '../screens/Place.example';
import {fade} from '../utils/screenAnimations';

export type RootStackParams = {
  Places: undefined;
  Place: {name: string; id: string};
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
        name="Places"
        options={{
          cardStyleInterpolator: fade,
        }}
      />
      <Stack.Screen
        component={Place}
        name="Place"
        options={{
          cardStyleInterpolator: fade,
        }}
      />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
