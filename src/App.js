import React, { Suspense } from 'react';
import './assets/App.scss';
import ChatBoat from './components/ChatBoat/';
const Editor = React.lazy(() => import('./components/Editor'));

class App extends React.Component {
  state = {
    loadEditor: false
  }
  handleLoadEditor() {
    this.setState({
      loadEditor: !this.state.loadEditor
    })
  }
  render() {
    const { loadEditor } = this.state;
    return (
      <>
        <ChatBoat
          handleLoadEditor={this.handleLoadEditor.bind(this)}
          chatHeadTitle="TCS"
          chatHeadMsg="Need Help?"
          chatHeadIcon={require('./logo.svg')} />
        {
          loadEditor && (
            <Suspense fallback={<div>Loading Editor...</div>}>
              <Editor />
            </Suspense>
          )
        }
      </>
    )
  }
}

export default App;
