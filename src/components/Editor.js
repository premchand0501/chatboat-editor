import React from 'react';
import Sidebar from './Sidebar/';
import Questions from './Questions';
import { withShowToast } from './SnackBar';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      editQuestion: null,
      jsonValue: '',
      searchText: ''
    };
    this.handleJSONchange.bind(this);
    this.handleSaveQuestion.bind(this);
    this.handleSearch.bind(this);
    this.downloadJSON.bind(this);
    this.setEditQuestion.bind(this);
    this.deleteQuestion.bind(this)
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
    const { questions, editQuestion, jsonValue, searchText } = this.state;
    return (
      <div className="Editor container-fluid">
        <div className="row">
          <Sidebar
            jsonValue={jsonValue}
            handleJSONchange={this.handleJSONchange}
            questions={questions}
            editQuestion={editQuestion}
            saveQuestions={this.handleSaveQuestion}
          />
          <Questions
            searchText={searchText}
            handleSearch={this.handleSearch}
            downloadJSON={this.downloadJSON}
            questions={questions}
            editQuestion={editQuestion}
            setEditQuestion={this.setEditQuestion}
            deleteQuestion={this.deleteQuestion}
          />
        </div>

      </div>
    );
  }
}

export default withShowToast(Editor);
