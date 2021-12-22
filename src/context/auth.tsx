import React, {createContext, useState, useEffect, useContext} from 'react';
import propTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContextType} from '../types';

type AuthContextProps = {
  user: AuthContextType;
  login: () => void;
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

  const login = () => {};

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
