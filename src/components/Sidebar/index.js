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
      });
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
    console.log('handlesubmit');
    const { chatOptionsQuestion, currentQuestion } = this.state;
    if (ifOption) {
      const _chatOptionsQuestion = { ...chatOptionsQuestion };
      _chatOptionsQuestion.reply_id = parseInt(_chatOptionsQuestion.reply_id);
      const _currentQuestion = { ...currentQuestion };
      const opts = _currentQuestion.chat_options;
      opts.push({ ..._chatOptionsQuestion });
      _currentQuestion.chat_options = opts;
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
    console.log('clearform');
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
    if (!this.state.ifEditing) {
      this.showError('Please save the chat in order to add options into it');
      return;
    }
    if (currQuest) {
      const { currentQuestion } = this.state;
      const found = currentQuestion.chat_options.filter(
        (q) => q.chat_id === currQuest.chat_id
      );
      if (found.length) {
        this.setState({
          chatOptionsQuestion: found[0],
        });
      } else {
        const id = currQuest.chat_id * 100 + currQuest.chat_options.length;
        const { chatOptionsQuestion } = this.state;
        chatOptionsQuestion.chat_id = id;
        this.setState({
          chatOptionsQuestion,
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
    });
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
      <div className="sidebar col-12 col-md-6 col-sm-6">
        {chatOptionsQuestion.chat_id && ifEditing ? (
          <ChatOptionQuestionEdit
            questions={questions}
            currentQuestion={currentQuestion}
            chatOptionsQuestion={chatOptionsQuestion}
            handleOnChange={(event, ifOption) =>
              this.handleOnChange(event, ifOption)
            }
            handleBack={this.handleBack.bind(this)}
            handleSubmit={(event, ifOption) =>
              this.handleSubmit(event, ifOption)
            }
          />
        ) : (
          <MainQuestionEdit
            clearForm={this.clearForm.bind(this)}
            handleAddEditChatOption={(ques) =>
              this.handleAddEditChatOption(ques)
            }
            questions={questions}
            currentQuestion={currentQuestion}
            handleOnChange={(event, ifOption) =>
              this.handleOnChange(event, ifOption)
            }
            handleSubmit={(event, ifOption) =>
              this.handleSubmit(event, ifOption)
            }
          />
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
