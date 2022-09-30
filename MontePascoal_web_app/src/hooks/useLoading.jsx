import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import logoName from '../assets/images/client/logo-name.svg';

export const LoadingContainer = styled.div`
  z-index: 9999;
  background: rgba(255,255,255, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  transition: .3s;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ isLoading }) => isLoading ? 1 : 0};
  pointer-events: ${({ isLoading }) => isLoading ? 'auto' : 'none'};

  img {
    transition: .3s;
    opacity: ${({ isLoading }) => isLoading ? 1 : 0};
    width: 35rem;
    transform: ${({ isLoading }) => isLoading ? 'translateY(0px)' : 'translateY(20px)'};
  }
`;

export const GlobalLoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  return (
      <GlobalLoadingContext.Provider value={{
        globalLoading,
        setGlobalLoading,
        setShowLoading
      }}>
        <LoadingContainer isLoading={globalLoading || showLoading}>
          <img src={logoName} alt="Logo Monte Pascoal"/>
        </LoadingContainer>
        {children}
      </GlobalLoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(GlobalLoadingContext);
  return context;
}

LoadingProvider.propTypes = {
  children : PropTypes.node
}