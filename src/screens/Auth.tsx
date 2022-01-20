import React from 'react';
import {View, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useAuth} from '../context/auth';
import Input from '../components/Input';
import Button from '../components/Button';

const Auth = () => {
  const {login} = useAuth();

  const handleSubmit = () => {
    login('joaquin@posdata.io', '123');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View>
          <Input />
          {/* <Input /> */}
        </View>
        <Button title="Login" style={styles.button} onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginTop: 100,
  },
  button: {},
});

export default Auth;
