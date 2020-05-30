import React, { Suspense } from 'react';
import Sidebar from './Sidebar';
import Questions from './Questions';
import { withShowToast } from '../ToastMsg';
import './Editor.scss';

const ChatBoat = React.lazy(() => import('../ChatBoat/'));
const dummyQuestion = [
  {
    "chat_id": 0,
    "chat_label": "Welcome to ChatBoat",
    "chat_desc": "",
    "chat_options": [],
    "type": "i",
    "reply_id": 1
  },
  {
    "chat_id": 0,
    "chat_label": "How are you doing?",
    "chat_desc": "",
    "chat_options": [],
    "type": "q",
    "reply_id": 1
  },
  {
    "chat_id": 0,
    "chat_label": "I am doing good",
    "chat_desc": "",
    "chat_options": [],
    "type": "a",
    "reply_id": 1
  },
  {
    "chat_id": 0,
    "chat_label": "This is a sample option list",
    "chat_desc": "",
    "chat_options": [
      {
        "chat_id": 0,
        "chat_label": "Option 1",
        "chat_desc": "",
        "chat_options": [],
        "type": "ol",
        "reply_id": 1
      },
      {
        "chat_id": 0,
        "chat_label": "Options 2",
        "chat_desc": "",
        "chat_options": [],
        "type": "ol",
        "reply_id": 1
      },
    ],
    "type": "ol",
    "reply_id": 1
  },
  {
    "chat_id": 0,
    "chat_label": "This will be subject line for contact us",
    "chat_desc": "This will be in chat content",
    "chat_options": [],
    "type": "c",
    "reply_id": 1
  }
]
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      editQuestion: null,
      jsonValue: '',
      searchText: '',
      currentTab: 'style'
    };
  }
  componentDidMount() {
    const localQues = localStorage.getItem('questions');
    const localJson = localStorage.getItem('jsonValue');
    const { setQuests } = this.props;
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
      setQuests(parsedLocalQs)
    }
    else if (parsedLocalQs) {
      this.setState({
        questions: parsedLocalQs,
      })
      setQuests(parsedLocalQs)
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
      question.chat_id = parseInt(question.chat_id);
      if (question.reply_id)
        question.reply_id = parseInt(question.reply_id);
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
      jsonValue: JSON.stringify(newQues),
    });
    localStorage.setItem('questions', JSON.stringify(newQues));
    this.showError('Questions updated successfully')
    this.props.setQuests(newQues)
  }
  showError(msg, timer) {
    const { showToast } = this.props;
    showToast(msg, timer)
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
        json.filter(j => {
          if (j.hasOwnProperty('chat_id') && j.hasOwnProperty('chat_label') && j.hasOwnProperty('chat_options') &&
            j.hasOwnProperty('type') && j.hasOwnProperty('reply_id') && j.hasOwnProperty('chat_desc')) {
            return true;
          }
          else {
            this.showError('Following field has missing keys\n' + JSON.stringify(j), 20000)
          }
          return false;
        })
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
  changeTab(tab) {
    this.props.changeTab(tab);
    this.setState({
      currentTab: tab
    })
  }
  render() {
    const { questions, editQuestion, jsonValue, searchText, currentTab } = this.state;
    return (
      <div className="Editor container-fluid">
        <div className="row">
          <Sidebar
            currentTab={currentTab}
            changeTab={tab => this.changeTab(tab)}
            jsonValue={jsonValue}
            handleJSONchange={(event) => this.handleJSONchange(event)}
            questions={questions}
            editQuestion={editQuestion}
            saveQuestions={(q) => this.handleSaveQuestion(q)}
          />
          {
            currentTab !== 'style' ? (
              <Questions
                searchText={searchText}
                handleSearch={(v) => this.handleSearch(v)}
                downloadJSON={() => this.downloadJSON()}
                questions={questions}
                editQuestion={editQuestion}
                setEditQuestion={(q) => this.setEditQuestion(q)}
                deleteQuestion={(id) => this.deleteQuestion(id)}
              />
            ) : (

                <Suspense fallback={<div>Loading ChatBoat...</div>}>
                  <ChatBoat
                    currentTab={currentTab}
                    title="TCS"
                    msg="Style bot"
                    icon={require('../../logo.svg')}
                    questionJson={dummyQuestion} />
                </Suspense>
              )

          }
        </div>

      </div>
    );
  }
}

export default withShowToast(Editor);
