import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import {useAuth} from '../context/auth';
import Input from '../components/Input';
import Button from '../components/Button';

const Auth = () => {
  const {login} = useAuth();
  const [activeScreen, setActiveScreen] = useState<
    'login' | 'signup' | 'resetPassword'
  >('login');
  const handleSubmit = () => {
    console.log('Hola');
    login('joaquin@posdata.io', '123');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View>
          <Text style={{...styles.title}}>
            {activeScreen === 'login'
              ? 'Log in'
              : activeScreen === 'signup'
              ? 'Register'
              : 'Reset Password'}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input placeholder="example@example.com" label="Email" />
          <Input placeholder="******" label="Password" />
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
    marginTop: 60,
  },
  inputContainer: {
    marginBottom: 10,
  },
  button: {},
  title: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 10,
  },
});

export default Auth;
