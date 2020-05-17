import React, { useState, Suspense } from 'react';
import ChatBoat from './components/ChatBoat';
import { ToastProvider } from './components/ToastMsg';

const Editor = React.lazy(() => import('./components/Editor/'));

const App = () => {
  const [loadEditor, handleLoadEditor] = useState(true);
  return (
    <ToastProvider value={[]}>
      <ChatBoat
        chatHeadTitle="TCS"
        chatHeadMsg="Need Help?"
        chatHeadIcon={require('./logo.svg')} />
      {
        loadEditor ? (
          <Suspense fallback={<div>Loading Editor...</div>}>
            <Editor />
          </Suspense>
        ) : (
            <button className="btn btn-link" onClick={handleLoadEditor}>Load Editor</button>
          )
      }
    </ToastProvider>
  )
}

export default App;
