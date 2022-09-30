import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import { useLoading } from '../hooks/useLoading';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {

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
      <AppContext.Provider value={{
        user
      }}>
          {children}
      </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children : PropTypes.node
}