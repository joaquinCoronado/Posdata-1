import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Places from '../screens/Places';
import PlaceDetail from '../screens/requestExchange/PlaceDetail';
import {fade} from '../utils/screenAnimations';

export type RootStackParams = {
  Places: undefined;
  Place: {
    id: string;
    picture: string;
    name: string;
    country: string;
    city: string;
    ownerId: number;
    createdAt: string;
  };
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
        component={PlaceDetail}
        name="Place"
        options={{
          cardStyleInterpolator: fade,
        }}
      />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
