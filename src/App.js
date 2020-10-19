import React, { useState, Suspense } from 'react';
import ChatBoat from './components/ChatBoat';
import { ToastProvider } from './components/ToastMsg';

const Editor = React.lazy(() => import('./components/Editor/'));

const App = (props) => {
  const [loadEditor, handleLoadEditor] = useState(true);
  const [currentTab, changeTab] = useState('');
  const [chatList, setQuests] = useState('');
  return (
    <div className="container-fluid">
      <div className="row">
        <ToastProvider value={[]}>
          {
            loadEditor ? (
              <Suspense fallback={<div>Loading Editor...</div>}>
                <Editor setQuests={(qs) => setQuests(qs)} changeTab={changeTab} />
              </Suspense>
            ) : (
                <button className="btn btn-link" onClick={handleLoadEditor}>Load Editor</button>
              )
          }
        </ToastProvider>
        <ChatBoat chatList={chatList} currentTab={currentTab}  {...props} />
      </div>
    </div>
  )
}

export default App;
