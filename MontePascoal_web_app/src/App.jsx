import React, { useEffect } from 'react';

import { AuthProvider } from './hooks/useAuth';

import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/global';
import Routes from './routes';
import { LoadingProvider } from './hooks/useLoading';
import { GeoProvider } from './hooks/useGeo';

export default function App() {
  useEffect(() => {
    if (window.jspdf) {
      window.jsPDF = window.jspdf.jsPDF;
    }
  }, []);

  return (
    <LoadingProvider>
      <AuthProvider>
        <GeoProvider>
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
        </GeoProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}
