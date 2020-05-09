import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/';
import Questions from './components/Questions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      editQuestion: null,
      jsonValue: '',
      errorMsg: [],
      searchText: ''
    };
  }
  componentDidMount() {
    const localQues = localStorage.getItem('questions');
    const localJson = localStorage.getItem('jsonValue');
    let parsedLocalQs = null;
    if (localQues) {
      try {
        parsedLocalQs = JSON.parse(localQues);
      }
      catch (e) {
        console.log(e);
      }
    }
    if (parsedLocalQs && localJson) {
      this.setState({
        questions: parsedLocalQs,
        jsonValue: localJson,
      })
    }
    else if (parsedLocalQs) {
      this.setState({
        questions: parsedLocalQs,
      })
    }
    else if (localJson) {
      this.setState({
        jsonValue: localJson,
      })
    }
  }
  setEditQuestion(question) {
    if (question) {
      this.setState({
        editQuestion: question,
      });
    }
  }
  handleSaveQuestion(question) {
    if (question) {
      const { questions } = this.state;
      const found = questions.filter((q) => q.chat_id === question.chat_id);
      let newQues = [];
      if (found.length) {
        newQues = questions.map((q) => {
          if (q.chat_id === question.chat_id) {
            return question;
          }
          return q;
        });
      } else {
        newQues = [...questions, question];
      }
      this.saveQuestions(newQues);
    } else {
      this.setState({
        editQuestion: null,
      });
    }
  }
  saveQuestions(newQues) {
    this.setState({
      questions: newQues,
      editQuestion: null,
    });
    localStorage.setItem('questions', JSON.stringify(newQues));
    this.showError('Questions updated successfully')
  }
  removeErr(timeout, timestamp) {
    const { errorMsg } = this.state;
    const filtered = errorMsg.filter(m => m.timestamp !== timestamp);
    this.setState({
      errorMsg: [...filtered],
    });
    clearTimeout(timeout);
  }
  showError(msg, timer) {
    const { errorMsg } = this.state;
    const timestamp = Date.now();
    const errorObj = {
      msg, timer: () => {
        const timeout = setTimeout(() => {
          this.removeErr(timeout, timestamp);
        }, timer || 5000);
        return timeout;
      },
      timestamp
    }
    this.setState(
      {
        errorMsg: [...errorMsg, errorObj],
      },
      () => {
        const r = errorObj.timer();
        console.log('tmr', r);
      }
    );
  }
  downloadJSON() {
    const download = (filename, text) => {
      var element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
      );
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    };
    download('questions.json', JSON.stringify(this.state.questions));
    localStorage.setItem('questions', JSON.stringify(this.state.questions));
  }
  handleJSONchange(event) {
    const value = event.target.value;
    try {
      const json = JSON.parse(value);
      if (json && json.length) {
        const valids = json.filter(j => {
          if (j.hasOwnProperty('chat_id') && j.hasOwnProperty('chat_label') && j.hasOwnProperty('chat_options') &&
            j.hasOwnProperty('type') && j.hasOwnProperty('reply_id') && j.hasOwnProperty('chat_desc')) {
            return true;
          }
          else {
            this.showError('Following field has missing keys\n' + JSON.stringify(j), 20000)
          }
          return false;
        })
        console.log(valids)
        localStorage.setItem('jsonValue', value);
        localStorage.setItem('questions', JSON.stringify(json));
        this.setState({
          jsonValue: value,
          questions: json,
        })
      }
    }
    catch (e) {
      console.log(e);
      this.setState({
        jsonValue: value,
      })
      value !== '' && this.showError('Invalid json format')
    }
  }
  handleSearch(value) {
    this.setState({
      searchText: value,
    })
  }
  deleteQuestion(chat_id) {
    const { questions } = this.state;
    const filtered = questions.filter(q => q.chat_id !== chat_id);
    this.saveQuestions(filtered);
  }
  render() {
    const { questions, editQuestion, jsonValue, errorMsg, searchText } = this.state;
    return (
      <div className="App container-fluid">
        {errorMsg.length > 0 &&
          <div className="toast-wrapper">
            {
              errorMsg.map(m => (
                <div className="alert alert-dark my-2 p-3 toast border-0" role="alert" key={m.msg}>
                  {m.msg}
                  {m.timestamp}
                  <br></br>
                  <button className="btn btn-outline-light my-2" onClick={() => this.removeErr(m.timer(), m.timestamp)}>Done</button>
                </div>
              ))
            }
          </div>
        }
        <div className="row">
          <Sidebar
            jsonValue={jsonValue}
            handleJSONchange={this.handleJSONchange.bind(this)}
            questions={questions}
            editQuestion={editQuestion}
            saveQuestions={this.handleSaveQuestion.bind(this)}
          />
          <Questions
            searchText={searchText}
            handleSearch={this.handleSearch.bind(this)}
            downloadJSON={this.downloadJSON.bind(this)}
            questions={questions}
            editQuestion={editQuestion}
            setEditQuestion={this.setEditQuestion.bind(this)}
            deleteQuestion={this.deleteQuestion.bind(this)}
          />
        </div>

      </div>
    );
  }
}

export default App;
