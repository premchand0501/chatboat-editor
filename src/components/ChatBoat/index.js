import React, { Suspense } from 'react';
import '../../assets/ChatBoat.scss';
import { ChatBody } from './ChatBody';
import { withShowToast } from '../SnackBar';

const Editor = React.lazy(() => import('../Editor'));

class ChatBoat extends React.Component {
  constructor(props) {
    super(props);
    const { chatList, questionJson, jsonPath } = props;
    this.state = {
      toggleChat: true,
      chatList: chatList || [],
      questions: questionJson || [],
      jsonPath,
      contactUs: { chat_id: 4, chat_label: "Procam Slam - General Query", chat_desc: "Kindly visit [Procam Slam Website, https://www.procam.in/procam-slam-2020, _blank]", chat_options: Array(0), type: "c" },
      email: '',
      message: '',
      attachment: null,
    }
    this.handleSubmit.bind(this);
    this.setContactUs.bind(this);
    this.toggleChatBody.bind(this);
    this.handleOnChange.bind(this);
  }
  async componentDidMount() {
    try {
      const res = await (await (fetch(this.state.jsonPath || 'questions_default.json'))).json();
      if (res) {
        if (res.length) {
          const chat_0 = res.filter(ch => ch.chat_id === 0);
          if (chat_0.length) {
            this.setState({
              questions: res,
              chatList: [...this.state.chatList, ...chat_0]
            });
            setTimeout(() => {
              if (chat_0[0].reply_id) {
                const reply = res.filter(ch => ch.chat_id === chat_0[0].reply_id);
                if (reply.length) {
                  this.setState({
                    chatList: [...this.state.chatList, ...reply]
                  });
                }
              }
            }, 300)
          }
        }
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  toggleChatBody(toggleChat) {
    this.setState({ toggleChat })
  }
  replay(chat) {
    const { reply_id } = chat;
    if (!reply_id) {
      return;
    }
    const { questions, chatList } = this.state;
    const reply = questions.filter(ch => ch.chat_id === reply_id);
    console.log(chat, reply, reply_id);
    this.setState({
      chatList: [...chatList, chat]
    }, () => {
      if (reply.length) {
        console.log(...reply);
        this.setState({
          chatList: [...this.state.chatList, ...reply]
        });
      }
    });

  }
  componentDidUpdate() {
    const chatListEl = document.querySelector('.chatList > .list-group-item:last-child');
    chatListEl && chatListEl.scrollIntoView({ behavior: 'smooth' })
  }
  setContactUs(chat) {
    this.setState({
      contactUs: chat
    })
  }
  isValidEmail(email) {
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { showToast } = this.props;
    const { contactUs, email, message } = this.state;
    if (!this.isValidEmail(email)) {
      showToast('Please provide valid email', 10000);
      return;
    }
    if (contactUs.email) {
      const _c = { ...contactUs };
      _c.message = message;
      this.setState({
        contactUs: _c
      });
    }
    else {
      const _contactUs = { ...contactUs }
      _contactUs.email = email;
      console.log(email);
      this.setState({
        contactUs: _contactUs
      })
    }
  }
  handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === 'attachment') {
      const _c = { ...this.state.contactUs };
      _c.attachment = target.files[0];
      this.setState({
        contactUs: _c
      })
    }
    else {
      this.setState({
        [name]: target.value
      })
    }
  }
  render() {
    const { toggleChat, chatList, contactUs, email, message, attachment } = this.state;
    const { handleLoadEditor, chatHeadIcon, chatHeadMsg, chatHeadTitle, loadEditor } = this.props;
    return (
      <div className="ChatBoat">
        <button className="btn btn-link" onClick={handleLoadEditor}>Load Editor</button>
        <button className="btn btn-light chatHead" onClick={() => this.toggleChatBody(!toggleChat)}>
          <img src={chatHeadIcon} className="img-fluid" alt="Chat Head" />
          {chatHeadMsg &&
            <span>{chatHeadMsg}</span>
          }
        </button>
        {
          toggleChat && (
            <ChatBody
              handleSubmit={this.handleSubmit}
              email={email}
              attachment={attachment}
              message={message}
              contactUs={contactUs}
              setContactUs={this.setContactUs}
              replay={(reply_id) => this.replay(reply_id)}
              chatList={chatList}
              chatHeadTitle={chatHeadTitle}
              chatHeadIcon={chatHeadIcon}
              toggleChatBody={this.toggleChatBody}
              handleOnChange={this.handleOnChange} />
          )
        }
        {
          loadEditor && (
            <Suspense fallback={<div>Loading Editor...</div>}>
              <Editor />
            </Suspense>
          )
        }
      </div>
    )
  }
}

export default withShowToast(ChatBoat);