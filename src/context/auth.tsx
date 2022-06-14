import React, {createContext, useState, useEffect, useContext} from 'react';
import {Platform} from 'react-native';
import propTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Api, getUserInfo, addEvent} from '../api/index';
import {AuthContextType} from '../types';
import {LoginResponse} from '../types/auth';

type AuthContextProps = {
  user: AuthContextType;
  setUser: (data: AuthContextType) => () => void;
  login: (email: string, password: string) => Promise<Boolean>;
  logout: () => void;
  signup: (body: {
    name: string;
    password: string;
    email: string;
  }) => Promise<Boolean>;
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
    if (user) {
      addEvent({
        name: 'open_app',
        userId: user.id,
        user_os: Platform.OS,
      })
        .then(response => {
          console.log('Response: ', response);
        })
        .catch();
    }
  }, [user]);

  const login = (username: string, password: string) => {
    return new Promise<Boolean>(async (resolve, reject) => {
      try {
        const ok = await Api.post<LoginResponse>('auth/v1/login', {
          email: username,
          password,
        });

        const {accessToken, refresh_token, name, id, email, jti} = ok.data;
        Api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
        AsyncStorage.setItem('token', accessToken);
        const userInfo = await getUserInfo(id);
        setUser({accessToken, refresh_token, name, id, email, jti, userInfo});
        resolve(true);
      } catch (error) {
        reject(new Error('Eror, please try again later ' + error));
      }
    });
  };

  const signup = (body: {name: string; password: string; email: string}) => {
    return new Promise<Boolean>(async (resolve, reject) => {
      try {
        const res = await Api.post('/auth/v1/signup', body);
        if (res.status !== 200) {
          reject(new Error(''));
        }
        await login(body.email, body.password);
        resolve(true);
      } catch (error: any) {
        reject(new Error('Error, plase try again later'));
      }
    });
  };

  const logout = async () => {
    try {
      const response = await addEvent({
        // @ts-ignore
        userId: user?.id || '',
        name: 'close_app',
        user_os: Platform.OS,
      });
      console.log('response : ', response);
    } catch (error) {
      console.log('Error: ', error);
    }
    setUser(null);
  };

  return (
    // @ts-ignore
    <AuthContext.Provider value={{user, setUser, login, logout, signup}}>
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
