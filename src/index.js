import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Editor from './components/Editor';
import { ToastProvider } from './components/ToastMsg';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Editor />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('ChatBoatEditor')
);
// If you want your app to work offline and load faster, you can change	
// unregister() to register() below. Note this comes with some pitfalls.	
// Learn more about service workers: https://bit.ly/CRA-PWA	
serviceWorker.unregister();