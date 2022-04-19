import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import Search from '../screens/Search';
import Exchange from '../screens/Exchange';
import Places from './places';
import Profile from '../screens/Profile';
import NewPlace from '../screens/NewPlace';
import {useSettings} from '../context/settings';

export type RootTabsParams = {
  Places: undefined;
  Search: undefined;
  Profile: undefined;
  Exchange: undefined;
  NewPlace: undefined;
};

const Tab = createBottomTabNavigator<RootTabsParams>();

const getWidth = () => {
  let width = Dimensions.get('window').width;
  width = width - 50;
  return width / 5;
};

interface Props extends BottomTabScreenProps<RootTabsParams, 'Places'> {}

const Tabs = ({navigation}: Props) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const {theme} = useSettings();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            position: 'absolute',
            marginBottom: 35,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 15,
            borderTopColor: theme.colors.background,
          },
        }}>
        <Tab.Screen
          name="Places"
          component={Places}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? '#FF4D00' : theme.colors.text}
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
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? '#FF4D00' : theme.colors.text}
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
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
          options={{
            tabBarIcon: () => (
              <LinearGradient
                colors={['#FF00D6', '#FF4D00']}
                style={styles.mainIconContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NewPlace')}
                  style={styles.touchableIcon}>
                  <Icon color={'white'} size={28} name={'add-outline'} />
                </TouchableOpacity>
              </LinearGradient>
            ),
          }}
        />
        <Tab.Screen
          name="Exchange"
          component={Exchange}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? '#FF4D00' : theme.colors.text}
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
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <Icon
                  color={focused ? '#FF4D00' : theme.colors.text}
                  size={20}
                  name="person-outline"
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          ...styles.tabIndicator,
          transform: [{translateX: tabOffsetValue}],
          backgroundColor: '#FF4D00',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 50,
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIconContainer: {
    width: 55,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  tabIndicator: {
    width: getWidth(),
    height: 3,
    position: 'absolute',
    bottom: 95,
    left: 25,
    borderRadius: 50,
  },
  touchableIcon: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default Tabs;
