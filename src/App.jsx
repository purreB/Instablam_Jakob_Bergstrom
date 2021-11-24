import React from 'react';
import './App.css';
import { useRegisterSW } from 'virtual:pwa-register/react';
import Navbar from './components/Navbar';
import Camera from './components/Camera';

function App() {
  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  return (
    <div className="App">
      <Navbar />
      <Camera />
    </div>
  );
}

export default App;
