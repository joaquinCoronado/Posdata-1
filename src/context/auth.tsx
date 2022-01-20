import React, {createContext, useState, useEffect, useContext} from 'react';
import propTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'axios';
import {AuthContextType} from '../types';

type AuthContextProps = {
  user: AuthContextType;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<AuthContextType>(null);

  useEffect(() => {
    AsyncStorage.getItem('@user')
      .then(res => {
        if (res) {
          setUser(JSON.parse(res));
        }
        return;
      })
      .catch();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@user', JSON.stringify(user));
  }, [user]);

  const login = (username: string, password: string) => {
    const data = [username, password];
    let form: any = [];
    for (const property in data) {
      const encodeKey = encodeURIComponent(property);
      const encodeValue = encodeURIComponent(data[property]);
      form.push(encodeKey + '=' + encodeValue);
    }
    form = form.join('&');
    fetch('https://posdata.io/security/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Athorization: 'Basic ' + global.btoa('frontendapp:123456'),
      },
      method: 'POST',
      body: form,
    })
      .then(res => {
        console.log('RES : ', res);
      })
      .catch(e => console.log('Ya valio verga perro ', e));
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.element,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Auth context must be used within Auth Provider');
  }
  return context;
};

export {AuthProvider, useAuth};
