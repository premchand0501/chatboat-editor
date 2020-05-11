import React from 'react';
import '../../assets/ChatBoat.scss';
import { ChatBody } from './ChatBody';

class ChatBoat extends React.Component {
  constructor(props) {
    super(props);
    const { chatList, questionJson, jsonPath } = props;
    this.state = {
      toggleChat: true,
      chatList: chatList || [],
      questions: questionJson || [],
      jsonPath
    }
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
    const { questions, chatList } = this.state;
    const reply = questions.filter(ch => ch.chat_id === reply_id);
    console.log(chat, reply);
    this.setState({
      chatList: [...chatList, chat]
    }, () => {
      if (reply.length) {
        this.setState({
          chatList: [...this.state.chatList, ...reply]
        });
      }
    });

  }
  componentDidUpdate() {
    document.querySelector('.chatList > .list-group-item:last-child').scrollIntoView({ behavior: 'smooth' })
  }
  contactUs(chat) {
    console.log(chat)
  }
  render() {
    const { toggleChat, chatList } = this.state;
    const { handleLoadEditor, chatHeadIcon, chatHeadMsg, chatHeadTitle } = this.props;
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
              contactUs={this.contactUs.bind(this)}
              replay={(reply_id) => this.replay(reply_id)}
              chatList={chatList}
              chatHeadTitle={chatHeadTitle}
              chatHeadIcon={chatHeadIcon}
              toggleChatBody={this.toggleChatBody.bind(this)} />
          )
        }
      </div>
    )
  }
}

export default ChatBoat;