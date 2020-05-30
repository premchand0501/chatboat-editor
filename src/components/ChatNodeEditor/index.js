import React from 'react';
import './ChatNode.scss'
const chats = [
  {
    "chat_id": 0,
    "chat_label": "Welcome to TCS world 10k",
    "chat_desc": "",
    "chat_options": [],
    "type": "i",
    "reply_id": 1
  },
  {
    "chat_id": 1,
    "chat_label": "Do you have queries about?",
    "chat_desc": "",
    "chat_options": [],
    "reply_id": ''
  }
]

class ChatNodeEditor extends React.Component {
  constructor(props) {
    super(props);
    const chatList = chats.map((c, i) => {
      c.connectPos = { x: 0, y: 0 }
      c.pos = {
        x: 160,
        y: 100 * (i + 1),
      }
      return c;
    })
    this.state = {
      moveChatId: -1,
      connect: false,
      mChats: chatList,
      windowSize: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      },
      zoom: 16
    }

    window.addEventListener('resize', () => {
      this.setState({
        windowSize: {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        }
      })
    })
  }
  async componentDidMount() {
    const res = await (await fetch('http://localhost:3000/chatboat-editor/questions.json')).json();
    if (res) {
      const mChats = res.map((c, i) => {
        c.connectPos = { x: 0, y: 0 }
        c.pos = {
          x: this.state.zoom * 10,
          y: this.state.zoom * 0.6,
        }
        return c;
      }).slice(0, 3)
      this.setState({
        mChats
      })
    }
  }
  handleMouseDown = (e, chat_id) => {
    e && e.stopPropagation();
    // console.log(chat_id);
    this.setState({
      moveChatId: chat_id
    })
  }
  handleMouseUp = (e) => {
    e && e.stopPropagation();
    this.setState({
      moveChatId: -1,
      connect: false,
    })
  }
  handleMouseMove = (e) => {
    e && e.stopPropagation();
    const { mChats, connect, moveChatId, zoom } = this.state;
    if (moveChatId > -1) {
      const c = mChats.filter(c => c.chat_id === moveChatId);
      if (c.length) {
        const chat = { ...c[0] };
        const cTarget = e.currentTarget;
        const rect = cTarget.getBoundingClientRect();
        console.log(rect);
        let x = e.clientX || e.PageX;
        let y = (e.clientY || e.PageY) - rect.y;

        if (connect) {
          chat.connectPos = { x: x - zoom * 10, y: y - zoom };
        }
        else {
          chat.pos = { x, y };
        }
        const findR = mChats.filter(c => c.reply_id === chat.chat_id);
        const updated = mChats.map(c => {
          if (c.chat_id === chat.chat_id)
            return chat;

          if (findR.length) {
            const re = { ...findR[0] };
            if (re.reply_id === chat.chat_id) {
              re.connectPos = { x, y };
            }
            return re;
          }
          return c;
        })
        this.setState({
          mChats: updated
        })
      }
    }
  }
  getReplyChatPos = (chat) => {
    const { connect, zoom } = this.state;
    const { pos, connectPos } = chat;
    const curve = connectPos.x !== 0 ?
      `
        c50 0 ${connectPos.x - pos.x} ${connectPos.y - pos.y} ${connectPos.x - pos.x} ${connectPos.y - pos.y}
        ` :
      '';
    // console.log(chat.reply_id, connect)
    return `m${chat.pos.x + zoom * 10} ${chat.pos.y + zoom} ${parseInt(chat.reply_id) || connect ? curve : ''}`
  }
  handleConnectStart = (e, chatId) => {
    e.stopPropagation();
    const { mChats } = this.state;
    let updated = [...mChats];
    const endNode = mChats.filter(c => c.chat_id === chatId);
    if (endNode.length) {
      const endChat = { ...endNode[0] };
      if (parseInt(endChat.reply_id)) {
        // console.log(endNode)
        endChat.reply_id = '';
        updated = updated.map(c => {
          if (c.chat_id === endChat.chat_id) {
            return endChat;
          }
          return c;
        })
      }
    }
    this.setState({
      connect: true,
      moveChatId: chatId,
      mChats: updated
    })
  }
  handleConnectEnd = (e, chatId) => {
    e.stopPropagation();
    const { mChats, connect, moveChatId } = this.state;
    if (connect) {
      const startNode = mChats.filter(c => c.chat_id === moveChatId);
      const endNode = mChats.filter(c => c.chat_id === chatId);
      if (startNode.length && endNode.length) {
        const endChat = { ...endNode[0] };
        const startChat = { ...startNode[0] };
        if (startChat.chat_id !== endChat.chat_id) {
          const pos = { ...endChat.pos };
          startChat.connectPos = pos;
          startChat.reply_id = endChat.chat_id
          const updated = mChats.map(c => {
            if (c.chat_id === startChat.chat_id) {
              return startChat;
            }
            return c;
          })
          // console.log(JSON.stringify(updated))
          this.setState({
            mChats: [...updated],
            connect: false,
            moveChatId: -1,
          })
        }
      }
    }
  }
  setZoom(flag) {
    this.setState(prev => ({
      zoom: prev.zoom + (1 * flag ? 1 : -1)
    }))
  }
  render() {
    const { windowSize, mChats, zoom } = this.state;
    return (
      <>
        <div className="container">
          <h1>SVG Path drawing</h1>
        </div>
        <div className="container-fluid chat-node-editor" style={{ fontSize: zoom }}>
          <svg
            viewBox={`0 0 ${windowSize.innerWidth} ${windowSize.innerHeight} `}>
            {
              mChats.map((chat, index) => (
                <path
                  stroke="#222"
                  fill="none"
                  strokeWidth="4" d={this.getReplyChatPos(chat)}
                  key={'chat_node_' + chat.chat_id + '_' + Date.now() * index} />
              ))
            }
          </svg>
          <div className="chat-wrapper"
            style={{ height: windowSize.innerHeight }}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}>
            {
              mChats.map((chat, index) => (
                <div
                  key={'chat_' + chat.chat_id + '_' + Date.now() * index}
                  className="chat"
                  onMouseEnter={(e) => this.handleConnectEnd(e, chat.chat_id)}
                  onMouseDown={(e) => this.handleMouseDown(e, chat.chat_id)}
                  style={{
                    left: chat.pos.x - zoom * 10,
                    top: chat.pos.y - zoom * 2,
                  }}>
                  <span className="d-flex align-item-center justify-content-between">
                    <p className="m-0"><small>Chat Id: {chat.chat_id}</small></p>
                    <p className="m-0 pull-right"><small>Reply Id: {chat.reply_id}</small></p>
                  </span>
                  <hr className="my-1" />
                  <h5 className="m-0">{chat.chat_label || chat.chat_desc}</h5>
                  <span
                    className={`node${parseInt(chat.reply_id) > -1 ? ' connected' : ''}`}
                    onMouseDown={(e) => this.handleConnectStart(e, chat.chat_id)}>
                    {chat.reply_id}
                  </span>
                  {
                    chat.chat_options && chat.chat_options.length ? (
                      <ul className="list-group">
                        {
                          chat.chat_options.map((opt, index) => (
                            <li
                              className="list-group-item"
                              key={'opt_' + opt.chat_id + '_' + index}>
                              {opt.chat_desc || opt.chat_label}
                              <span
                                className={`node${parseInt(chat.reply_id) > -1 ? ' connected' : ''}`}
                                onMouseDown={(e) => this.handleConnectStart(e, opt.chat_id)}>
                                {opt.reply_id}
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                    ) : null
                  }
                </div>
              ))
            }
            <div className="btn-group">
              <button
                className="btn btn-secondary"
                onClick={() => this.setZoom(false)}>-</button>
              <button
                className="btn btn-secondary"
                onClick={() => this.setZoom(true)}>+</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default ChatNodeEditor;