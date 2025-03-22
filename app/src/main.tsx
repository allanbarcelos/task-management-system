import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/styles.scss';
import App from './App';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);