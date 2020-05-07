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
    };
  }
  async componentDidMount() {
    try {
      const res = await (
        await fetch(
          'http://beta-tcsworld10k.sportz.io/static-assets/scripts/questions_default.json?v=1588664282512'
        )
      ).json();
      this.setState({
        questions: res,
      });
    } catch (e) {
      console.log(e);
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
      this.setState({
        questions: newQues,
        editQuestion: null,
      });
    } else {
      this.setState({
        editQuestion: null,
      });
    }
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
  }
  render() {
    const { questions, editQuestion } = this.state;
    return (
      <div className="App container">
        <div className="row">
          <Sidebar
            questions={questions}
            editQuestion={editQuestion}
            saveQuestions={this.handleSaveQuestion.bind(this)}
          />
          <Questions
            downloadJSON={this.downloadJSON.bind(this)}
            questions={questions}
            setEditQuestion={this.setEditQuestion.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
