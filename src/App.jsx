import { useState } from 'react';
import './App.css';
import { useRegisterSW } from 'virtual:pwa-register/react';
import Navbar from './components/Navbar';
import Camera from './components/Camera';

function App() {
  const [count, setCount] = useState(0);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="App">
      <Navbar />
      <Camera />
      {(offlineReady || needRefresh) && (
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-message">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <button
              className="ReloadPrompt-toast-button"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button className="ReloadPrompt-toast-button" onClick={() => close()}>
            Close
          </button>
        </div>
      )}
      <div className="ReloadPrompt-date">{Date.now()}</div>
    </div>
  );
}

export default App;
