import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import apiProd from '../services/apiProd';
import { useEffect } from 'react';
import { useLoading } from './useLoading';

export const GeoContext = createContext({});

export const GeoProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [addressLoading, setAddressLoading] = useState(true);

  const { setGlobalLoading } = useLoading();

  const getAddressInfos = useCallback(async () => {
    try {
      setGlobalLoading(true);
      setAddressLoading(true);

      const { data: countriesData } = await apiProd.get("/api/public/countries");
      const { data: statesData } = await apiProd.get("/api/public/states");
      const { data: citiesData } = await apiProd.get("/api/public/cities");
      
      setCountries(countriesData?.resData?.map(item => ({
        value: item.id,
        label: item.couName
      })));
      setStates(statesData?.resData?.map(item => ({
        value: item.id,
        label: item.staName,
        ibgeId: item.staIbge,
        initials: item.staInitials
      })));
      setCities(citiesData?.resData?.map(item => ({
        value: item.id,
        label: item.citName,
        ibgeId: item.citIbge,
        staId: item.staId
      })));
    } catch (err) {
      console.error('ERROR API PROD [GET] AddressInfos: ' + err)
    } finally {
      setGlobalLoading(false)
      setAddressLoading(false);
    }
  }, [setGlobalLoading]);

  useEffect(() => {
    if(states.length <= 0 && cities.length <= 0 && countries.length <= 0) {
      getAddressInfos();
    }
  }, [cities, countries, getAddressInfos, states])

  return (
      <GeoContext.Provider value={{
        cities,
        countries,
        states,
        addressLoading
      }}>
        {children}
      </GeoContext.Provider>
  );
}

export function useGeo() {
  const context = useContext(GeoContext);
  return context;
}

GeoProvider.propTypes = {
  children : PropTypes.node
}