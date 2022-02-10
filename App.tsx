import 'react-native-gesture-handler';
import React, {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
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
import NewPlace from './src/screens/NewPlace';
import {fade} from './src/utils/screenAnimations';
import ResetPassword from './src/screens/ResetPassword';
import {useSettings} from './src/context/settings';
import {useAuth} from './src/context/auth';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

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
  NewPlace: undefined;
};

interface Props extends BottomTabScreenProps<any, any> {}

// const customTheme: Theme = {
//   dark: true,
//   colors: {
//     ...DarkTheme.colors,
//   },
// };

const Stack = createStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<RootTabsParams>();

const getWidth = () => {
  let width = Dimensions.get('window').width;
  width = width - 40;
  return width / 5;
};

const TabNav = ({navigation}: Props) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      console.log('e: ', e.target);
      Animated.spring(tabOffsetValue, {
        useNativeDriver: true,
        toValue: getWidth() * 4,
      }).start();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            marginBottom: 35,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
        }}>
        <Tab.Screen
          name="Places"
          component={Places}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? 'red' : 'gray'}
                  size={20}
                  name="home-outline"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? 'red' : 'gray'}
                  size={20}
                  name="search-outline"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="NewPlace"
          component={NewPlace}
          options={{
            tabBarIcon: ({focused}) => (
              <TouchableOpacity style={styles.mainIconContainer}>
                <Icon color={'white'} size={30} name={'add-outline'} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Exchange"
          component={Exchange}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? 'red' : 'gray'}
                  size={20}
                  name="reader-outline"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? 'red' : 'gray'}
                  size={20}
                  name="person-outline"
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <View style={styles.tabIndicator}></View>
    </>
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
  iconContainer: {position: 'absolute', top: '50%'},
  mainIconContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  tabIndicator: {
    width: getWidth(),
    height: 2,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 99,
    left: 45,
    borderRadius: 50,
  },
});

export default App;
