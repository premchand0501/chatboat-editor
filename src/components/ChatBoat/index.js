import React from 'react';
import './ChatBoat.scss';
import { ChatBody } from './ChatBody';
import { withShowToast, ToastProvider } from '../ToastMsg';

class ChatBoat extends React.Component {
  constructor(props) {
    super(props);
    const { chatList, jsonpath } = props;
    this.state = {
      toggleChat: false,
      chatList: chatList || [],
      questions: [],
      jsonPath: jsonpath,
      contactUs: null,//{ chat_id: 4, chat_label: "Procam Slam - General Query", chat_desc: "Kindly visit [Procam Slam Website, https://www.procam.in/procam-slam-2020, _blank]", chat_options: Array(0), type: "c" },
      email: '',
      message: '',
      attachment: null,
      copyMe: false
    }
  }
  async componentDidMount() {
    const { jsonpath } = this.props;
    if (jsonpath) {
      try {
        const res = await (await (fetch(this.state.jsonPath))).json();
        console.log(res)
        if (res) {
          if (res.length) {
            const chat_0 = res.filter(ch => ch.chat_id === 0);
            if (chat_0.length) {
              this.setState({
                questions: res,
                chatList: [...this.state.chatList, ...chat_0]
              });
              // setTimeout(() => {
              //   if (chat_0[0].reply_id) {
              //     const reply = res.filter(ch => ch.chat_id === chat_0[0].reply_id);
              //     if (reply.length) {
              //       this.setState({
              //         chatList: [...this.state.chatList, ...reply]
              //       });
              //     }
              //   }
              // }, 300)
            }
          }
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  toggleChatBody(toggleChat) {
    this.setState({ toggleChat })
  }
  replay(chat) {
    const { reply_id } = chat;
    console.log(reply_id)
    if (!reply_id) {
      return;
    }
    const { questions, chatList } = this.state;
    const reply = questions.filter(ch => ch.chat_id === reply_id);
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
    const { chatList, questions } = this.state;
    const chatListEl = document.querySelector('.chatList > .list-group-item:last-child');
    chatListEl && chatListEl.scrollIntoView({ behavior: 'smooth' })
    if (chatList.length === 1 && chatList[0].reply_id) {
      const reply = questions.filter(ch => ch.chat_id === chatList[0].reply_id);
      if (reply.length) {
        this.setState({
          chatList: [...chatList, ...reply],
        });
      }
    }
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
      this.setState({
        contactUs: _contactUs
      })
    }
    if (this.isValidEmail(email) && message) {
      this.submitForm()
    }
  }
  submitForm() {
    const { clientname, clientemail, page_flag } = this.props
    const { email, message, attachment, copyMe, contactUs } = this.state;
    let payload = {
      send_mail: '1', // replace 0 with 1 to send mail
      grcaptcha: null,
      page_flag: page_flag,
      data: {
        full_name: clientname,
        state: null,
        city: null,
        subject: `${contactUs.chat_label || contactUs.chat_desc}`,
        message,
        email_id: (copyMe ? email + ',' : '') + clientemail,
        send_email_id: clientemail,
        designation: null,
        organisation: null,
        mobile: null,
        telephone: null,
        dob: null,
        gender: null,
        address: null,
        checked_user: copyMe,
        attachments: contactUs.attachmentPath,
        user_email: email,
      },
    };
    console.log(attachment, payload)

    // fetch(hostName + '/api/insertcontactuserdetails', {
    //   method: 'post',
    //   body: JSON.stringify(payload),
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     // console.log('Response: ', data)
    //     if (data === '1') {
    //       // resetting uploaded file object
    //       uploadedFile = {};
    //       // reply to user
    //       initAns(
    //         '<p>We have received your query. We will reach out to you shortly.</p>',
    //         'c'
    //       );
    //       trackEvent(full_name, 'Form Submit', `Subject: ${subjectText}, Message: ${payload.data.message}, User Email: ${email_id}, UUID: ${localStorage.getItem('uuid')}`)
    //     }
    //   })
    //   .catch((err) => {
    //     initAns(
    //       '<p>We were unable to process your request. You can try again after sometime.</p>',
    //       'c'
    //     );
    //     trackEvent(full_name, 'Form Submit Error', `Subject: ${subjectText}, Message: ${payload.data.message}, User Email: ${email_id}, UUID: ${localStorage.getItem('uuid')}`)
    //   });
  }
  handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === 'attachment') {
      this.setState({
        [name]: target.files[0]
      })
    }
    else {
      this.setState({
        [name]: target.value
      })
    }
  }
  render() {
    const { toggleChat, chatList, contactUs, email, message, attachment, copyMe } = this.state;
    const { icon, msg, title, currentTab } = this.props;
    return (
      <ToastProvider value={[]}>
        <div className={`ChatBoat ${currentTab === 'style' ? 'style col-12 col-md-9 col-sm-8' : ''}`}>
          <button className="btn btn-light chatHead" onClick={() => this.toggleChatBody(!toggleChat)}>
            <img src={icon} className="img-fluid" alt="Chat Head" />
            {msg &&
              <span>{msg}</span>
            }
          </button>
          {
            (toggleChat || currentTab === 'style') && (
              <ChatBody
                currentTab={currentTab}
                handleSubmit={(e) => this.handleSubmit(e)}
                email={email}
                copyMe={copyMe}
                attachment={attachment}
                message={message}
                contactUs={contactUs}
                setContactUs={(c) => this.setContactUs(c)}
                replay={(reply_id) => this.replay(reply_id)}
                chatList={chatList}
                chatHeadTitle={title}
                chatHeadIcon={icon}
                toggleChatBody={(c) => this.toggleChatBody(c)}
                handleOnChange={(e) => this.handleOnChange(e)} />
            )
          }
        </div>
      </ToastProvider>
    )
  }
}
const ChatWithToast = withShowToast(ChatBoat);

export default (props) => {
  return (
    <ToastProvider value={[]}>
      <ChatWithToast {...props} />
    </ToastProvider>
  )
}