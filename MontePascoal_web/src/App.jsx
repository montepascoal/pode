import React from 'react';

import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/global';
import Routes from './routes';

export default function App() {
  return (
    <>
      <GlobalStyles/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Routes />
    </>
  );
}
