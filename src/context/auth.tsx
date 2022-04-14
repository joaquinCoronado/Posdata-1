import React, {createContext, useState, useEffect, useContext} from 'react';
import propTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Api, authConfig, getUserInfo} from '../api/index';
import {AuthContextType} from '../types';
import {LoginResponse} from '../types/auth';

type AuthContextProps = {
  user: AuthContextType;
  setUser: () => Dispatch<SetStateAction<AuthContextType>>;
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
  }, [user]);

  const login = (username: string, password: string) => {
    return new Promise<Boolean>(async (resolve, reject) => {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      params.append('grant_type', 'password');
      try {
        const ok = await Api.post<LoginResponse>(
          '/security/oauth/token',
          params,
          authConfig,
        );
        const {access_token, refresh_token, name, id, email, jti} = ok.data;
        Api.defaults.headers.common.Authorization = 'Bearer ' + access_token;
        AsyncStorage.setItem('token', access_token);
        const userInfo = await getUserInfo(id);
        setUser({access_token, refresh_token, name, id, email, jti, userInfo});
        resolve(true);
      } catch (error) {
        reject(new Error('Eror, please try again later'));
      }
    });
  };

  const signup = (body: {name: string; password: string; email: string}) => {
    return new Promise<Boolean>(async (resolve, reject) => {
      try {
        const res = await Api.post('/user/v1/signup', body);
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

  const logout = () => setUser(null);

  return (
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
