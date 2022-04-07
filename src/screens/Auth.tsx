import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {useAuth} from '../context/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSettings} from '../context/settings';

const Auth = () => {
  const {login} = useAuth();
  const [activeScreen, setActiveScreen] = useState<
    'login' | 'signup' | 'resetPassword'
  >('login');
  const {theme} = useSettings();
  const [loading, setLoading] = useState<Boolean>(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login('oscar@posdataaasas.io', '123');
      setLoading(false);
    } catch (error: any) {
      Alert.alert(error.message);
      setLoading(false);
    }
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
          {activeScreen === 'signup' && (
            <Input placeholder="Escribe tu nombre" label="Name" />
          )}
          <Input placeholder="example@example.com" label="Email" />
          <Input placeholder="******" label="Password" />
          {/* <Input /> */}
        </View>
        <Button
          title="Login"
          style={styles.button}
          onPress={handleSubmit}
          loading={loading}
        />
        <View style={styles.createAccount}>
          <Text style={styles.textAccount}>
            {activeScreen === 'login'
              ? '  Aún no tienes cuenta Registrate'
              : '¿Ya tienes cuenta? Inicia Sesión'}
          </Text>
          <TouchableOpacity
            onPress={() =>
              activeScreen === 'signup'
                ? setActiveScreen('login')
                : setActiveScreen('signup')
            }>
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: 'bold',
                paddingTop: 9,
              }}>
              Aqui
            </Text>
          </TouchableOpacity>
        </View>
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
  createAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  textAccount: {},
});

export default Auth;
