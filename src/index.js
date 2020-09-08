import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';


ReactDOM.render(
  <App />,

  document.getElementById('root')
);
registerServiceWorker();
