import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSettings} from '../context/settings';
import {useAuth} from '../context/auth';

const Profile = () => {
  const {setDarkTheme, setLightTheme, theme} = useSettings();
  const {logout} = useAuth();
  return (
    <View style={styles.wrapper}>
      <Text>Profile</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.button, {backgroundColor: theme.colors.primary}]}
        onPress={() => (theme.dark ? setLightTheme() : setDarkTheme())}>
        <Text style={[styles.text, {color: theme.colors.text}]}>
          Light / Dark
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.button,
          {backgroundColor: theme.colors.primary, marginTop: 30},
        ]}
        onPress={logout}>
        <Text style={[styles.text, {color: theme.colors.text}]}>
          Cerrar sesion
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Profile;
