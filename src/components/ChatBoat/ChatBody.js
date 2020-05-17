import React from 'react';
import { ChatList } from './ChatList';
import { ContactUsForm } from './ContactUsForm';

export const ChatBody = ({ chatHeadIcon, chatHeadTitle, toggleChatBody, message, email, handleOnChange, chatList, replay, contactUs, setContactUs, handleSubmit, attachment }) => {
  return (
    <div className={`chatBody`}>
      <header className={`chatHeader`}>
        <span className="title">
          <img src={chatHeadIcon} className="img-fluid" alt="Chat Head" />
          {chatHeadTitle &&
            <span>{chatHeadTitle}</span>
          }
        </span>
        <button className="btn btn-outline-light close-btn" onClick={() => toggleChatBody(false)}>&times;</button>
      </header>
      <ChatList
        chatList={chatList}
        replay={replay}
        setContactUs={setContactUs} />
      <ContactUsForm
        attachment={attachment}
        message={message}
        email={email}
        contactUs={contactUs}
        setContactUs={setContactUs}
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange} />

    </div>
  )
}
