import React from 'react';
import { MainQuestionEdit } from './MainQuestionEdit';
import { ChatOptionQuestionEdit } from './ChatOptionQuestionEdit';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    const { questions, editQuestion } = props;
    const currentQuestion = {
      chat_id: (questions && questions.length) || 0,
      chat_label: '',
      chat_desc: '',
      chat_options: [],
      type: '',
      reply_id: '',
    };
    let ifEditing = false;
    if (editQuestion) {
      currentQuestion.chat_id = editQuestion.chat_id;
      currentQuestion.chat_label = editQuestion.chat_label;
      currentQuestion.chat_desc = editQuestion.chat_desc;
      currentQuestion.chat_options = editQuestion.chat_options;
      currentQuestion.type = editQuestion.type;
      currentQuestion.reply_id = editQuestion.reply_id;
      ifEditing = true;
    }
    const chatOptionsQuestion = { ...currentQuestion };
    this.state = {
      questions: questions || [],
      currentQuestion,
      chatOptionsQuestion,
      ifEditing,
      errors: {},
    };
  }
  componentDidUpdate() {
    const { editQuestion, questions } = this.props;
    const { currentQuestion, questions: _questions } = this.state;
    if (editQuestion && currentQuestion.chat_id !== editQuestion.chat_id) {
      currentQuestion.chat_id = editQuestion.chat_id;
      currentQuestion.chat_label = editQuestion.chat_label;
      currentQuestion.chat_desc = editQuestion.chat_desc;
      currentQuestion.chat_options = editQuestion.chat_options;
      currentQuestion.type = editQuestion.type;
      currentQuestion.reply_id = editQuestion.reply_id || '';
      this.setState({
        currentQuestion,
        ifEditing: true,
        questions,
      });
      this.handleBack();
    }
    if (_questions.length !== questions.length) {
      currentQuestion.chat_id = questions.length;
      this.setState({
        questions,
        currentQuestion,
      });
    }
  }
  handleOnChange(event, ifOption) {
    const _currentQuestion = this.state[
      ifOption ? 'chatOptionsQuestion' : 'currentQuestion'
    ];
    _currentQuestion[event.target.name] = event.target.value;
    this.setState({
      [ifOption ? 'chatOptionsQuestion' : 'currentQuestion']: _currentQuestion,
    });
  }
  handleSubmit(event, ifOption) {
    event.preventDefault();
    const { chatOptionsQuestion, currentQuestion } = this.state;
    if (ifOption) {
      const _chatOptionsQuestion = { ...chatOptionsQuestion };
      _chatOptionsQuestion.reply_id = parseInt(_chatOptionsQuestion.reply_id);
      const _currentQuestion = { ...currentQuestion };
      if (_currentQuestion.reply_id)
        _currentQuestion.reply_id = parseInt(_currentQuestion.reply_id);
      const found = _currentQuestion.chat_options.filter(chat_op => chat_op.chat_id === chatOptionsQuestion.chat_id);
      if (found.length) {
        _currentQuestion.chat_options = _currentQuestion.chat_options.map(chat_op => {
          chat_op.chat_id = parseInt(chat_op.chat_id);
          chat_op.reply_id = parseInt(chat_op.reply_id);
          console.log(chat_op.chat_id)
          return chat_op.chat_id === chatOptionsQuestion.chat_id ? chatOptionsQuestion : chat_op
        });
      }
      else {
        _currentQuestion.chat_options = [..._currentQuestion.chat_options, _chatOptionsQuestion];
        _currentQuestion.chat_options.forEach(c => {
          c.chat_id = parseInt(c.chat_id)
          c.reply_id = parseInt(c.reply_id)
        })
      }
      _currentQuestion.type = 'ol';
      _currentQuestion.reply_id = '';
      this.setState(
        {
          currentQuestion: _currentQuestion,
        },
        () => this.handleBack()
      );
    } else {
      if (currentQuestion.chat_label || currentQuestion.chat_desc) {
        this.props.saveQuestions(currentQuestion);
        this.clearForm(currentQuestion);
      } else {
        this.showError('Please add chat label or description');
      }
    }
  }
  showError(msg) {
    this.setState(
      {
        errors: {
          '0': msg,
        },
      },
      () => {
        setTimeout(() => {
          this.setState({
            errors: {},
          });
        }, 5000);
      }
    );
  }
  clearForm() {
    this.props.saveQuestions(null);
    this.setState({
      ifEditing: false,
      currentQuestion: {
        chat_id: this.state.questions.length,
        chat_label: '',
        chat_desc: '',
        chat_options: [],
        type: '',
        reply_id: '',
      },
    });
  }
  handleAddEditChatOption(currQuest) {
    if (currQuest) {
      const { currentQuestion } = this.state;
      const found = currentQuestion.chat_options.filter(
        (q) => q.chat_id === currQuest.chat_id
      );
      if (found.length) {
        this.setState({
          chatOptionsQuestion: found[0],
          ifEditing: true
        });
      } else {
        const id = currQuest.chat_id * 100 + currQuest.chat_options.length;
        const _chatOptionsQuestion = this.state.chatOptionsQuestion;
        _chatOptionsQuestion.chat_id = id;
        this.setState({
          chatOptionsQuestion: _chatOptionsQuestion,
          ifEditing: true
        });
      }
    }
  }
  handleBack() {
    const _chatOptionsQuestion = { ...this.state.chatOptionsQuestion };
    _chatOptionsQuestion.chat_desc = '';
    _chatOptionsQuestion.chat_id = 0;
    _chatOptionsQuestion.chat_label = '';
    _chatOptionsQuestion.chat_options = [];
    _chatOptionsQuestion.reply_id = '';
    _chatOptionsQuestion.type = '';
    this.setState({
      chatOptionsQuestion: _chatOptionsQuestion,
      ifEditing: false
    });
  }
  deleteOption(chat_id) {
    const _currentQuestion = { ...this.state.currentQuestion };
    const co = _currentQuestion.chat_options.filter(c => c.chat_id !== chat_id);
    _currentQuestion.chat_options = co;
    this.setState({
      currentQuestion: _currentQuestion
    })
  }
  render() {
    const {
      questions,
      currentQuestion,
      chatOptionsQuestion,
      ifEditing,
      errors,
    } = this.state;
    return (
      <div className="sidebar col-12 col-md-3 col-sm-6">
        {chatOptionsQuestion.chat_id && ifEditing ? (
          <ChatOptionQuestionEdit
            questions={questions}
            currentQuestion={currentQuestion}
            chatOptionsQuestion={chatOptionsQuestion}
            handleOnChange={(event, ifOption) =>
              this.handleOnChange(event, ifOption)
            }
            handleBack={() => this.handleBack()}
            handleSubmit={(event, ifOption) =>
              this.handleSubmit(event, ifOption)
            }
          />
        ) : (
            <>
              <div className="form-group">
                <h3 htmlFor="jsonField">If you already have json paste here</h3>
                <textarea
                  className="form-control"
                  rows="4" id="jsonField"
                  value={this.props.jsonValue}
                  placeholder="Paste your json here..."
                  onChange={this.props.handleJSONchange}></textarea>
              </div>
              <hr></hr>
              <MainQuestionEdit
                clearForm={() => this.clearForm()}
                handleAddEditChatOption={(ques) => this.handleAddEditChatOption(ques)}
                deleteOption={(id) => this.deleteOption}
                questions={questions}
                currentQuestion={currentQuestion}
                handleOnChange={(event, ifOption) => this.handleOnChange(event, ifOption)}
                handleSubmit={(event, ifOption) => this.handleSubmit(event, ifOption)}
              />
            </>
          )}
        {Object.keys(errors).length ? (
          <div className="my-3">
            <h5>Errors:</h5>
            {Object.keys(errors).map((key) => (
              <div
                className="alert alert-danger fade-scale-up"
                role="alert"
                key={'err_' + key}
              >
                {errors[key]}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Sidebar;
