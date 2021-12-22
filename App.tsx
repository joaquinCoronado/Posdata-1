import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Exchange from './src/screens/Exchange';
import Places from './src/screens/Places';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Auth from './src/screens/Auth';
import {fade} from './src/utils/screenAnimations';
import ResetPassword from './src/screens/ResetPassword';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Places" component={Places} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Exchange" component={Exchange} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          component={TabNav}
          name="Home"
          options={{
            cardStyleInterpolator: fade,
          }}
        />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
