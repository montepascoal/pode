import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import { useLoading } from './useLoading';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const history = useHistory();

  const { setShowLoading } = useLoading();

  useEffect(() => {
    const getUser = async () => {
      try {
        setShowLoading(true);
        const {data} = await api.get("/auth");

        setUser(data);
      } catch(error) {
        history.push('/error500');
        console.error('ERROR API [GET] /auth: ' + error)
      } finally {
        setShowLoading(false);
      }
    }
    getUser();
  }, [history, setShowLoading]);
  
  return (
      <AuthContext.Provider value={{
        user
      }}>
          {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

AuthProvider.propTypes = {
  children : PropTypes.node
}