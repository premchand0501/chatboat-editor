import React, { Suspense, useState } from 'react';
import './assets/App.scss';
import ChatBoat from './components/ChatBoat/';
import { ToastProvider } from './components/SnackBar';
const App = () => {
  const [loadEditor, handleLoadEditor] = useState(false);
  return (<ToastProvider value={[]}>
    <ChatBoat
      loadEditor={loadEditor}
      handleLoadEditor={() => handleLoadEditor(!loadEditor)}
      chatHeadTitle="TCS"
      chatHeadMsg="Need Help?"
      chatHeadIcon={require('./logo.svg')} />
  </ToastProvider>)
}

export default App;
