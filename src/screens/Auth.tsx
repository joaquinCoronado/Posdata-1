import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useAuth} from '../context/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSettings} from '../context/settings';
import PosdataButton from '../components/PosdataButton';
import LoadingModal from '../components/LoadingModal';

interface Props {
  route: any;
  navigation: any;
}

const Auth = ({navigation, route}: Props) => {
  //PROPS
  console.log('details', route);
  const {mode} = route.params;

  //STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // AUTENTICATION
  const {login, signup} = useAuth();

  // THEME
  const {theme} = useSettings();
  const {text} = theme.colors;

  const hanldeBack = () => {
    navigation.pop();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup({name, password, email});
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        {/* BACK */}
        <TouchableOpacity style={styles.backButton} onPress={hanldeBack}>
          <Icon color={text} size={24} name="return-up-back-outline" />
        </TouchableOpacity>

        {/* HEADER */}
        <Text style={[styles.title, {color: text}]}>
          {mode === 'login'
            ? 'Log in'
            : mode === 'signup'
            ? 'Register'
            : 'Reset Password'}
        </Text>
        {/* FORM */}
        <View style={styles.inputContainer}>
          {mode === 'signup' && (
            <TextInput
              style={[styles.input, {borderColor: text, color: text}]}
              placeholder="Escribe tu nombre"
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            style={[styles.input, {borderColor: text, color: text}]}
            value={email}
            placeholder="example@example.com"
            onChangeText={setEmail}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            clearButtonMode="while-editing"
            style={[styles.input, {borderColor: text, color: text}]}
            value={password}
            placeholder="*************"
            onChangeText={setPassword}
            secureTextEntry
          />
          <PosdataButton
            title={mode === 'login' ? 'LOGIN' : 'SIGNUP'}
            onPress={handleSubmit}
            containerStyles={styles.buttonStyles}
            textStyles={styles.buttonTextStyle}
          />
        </View>
      </View>
      <LoadingModal visible={loading} activitiIndicatorColor="#fff" />
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
  title: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 35,
  },
  createAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  textAccount: {},
  buttonStyles: {
    backgroundColor: 'black',
    marginTop: 0,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    marginBottom: 25,
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    padding: 10,
    paddingTop: 15,
    marginBottom: 25,
  },
});

export default Auth;
