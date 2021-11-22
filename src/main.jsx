import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    (<button onClick={updateSW()}>Refresh</button>), (<button>Cancel</button>);
  },
  onOfflineReady() {
    (<p>Ready to work offline</p>), (<button>Ok</button>);
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
