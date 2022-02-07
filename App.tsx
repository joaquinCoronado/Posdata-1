import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Exchange from './src/screens/Exchange';
import Places from './src/screens/Places';
import Profile from './src/screens/Profile';
import Welcome from './src/screens/Welcome';
import Search from './src/screens/Search';
import Auth from './src/screens/Auth';
import {fade} from './src/utils/screenAnimations';
import ResetPassword from './src/screens/ResetPassword';
import {useSettings} from './src/context/settings';
import {useAuth} from './src/context/auth';

export type RootStackParams = {
  Auth: undefined;
  Home: undefined;
  ResetPassword: undefined;
};

export type RootTabsParams = {
  Places: undefined;
  Search: undefined;
  Profile: undefined;
  Exchange: undefined;
};

// const customTheme: Theme = {
//   dark: true,
//   colors: {
//     ...DarkTheme.colors,
//   },
// };

const Stack = createStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<RootTabsParams>();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Places"
        component={Places}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="home-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="search-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Exchange"
        component={Exchange}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="reader-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="person-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const {settings, theme} = useSettings();
  const {user} = useAuth();
  if (!settings.welcomed) {
    return <Welcome />;
  }
  return (
    <View style={{...styles.wrapper, backgroundColor: theme.colors.background}}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {user ? (
            <Stack.Screen
              component={TabNav}
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
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
