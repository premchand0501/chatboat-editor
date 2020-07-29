import React from 'react';
import { ChatList } from './ChatList';
import { ContactUsForm } from './ContactUsForm';

export const ChatBody = ({ copyMe, chatHeadIcon, chatHeadTitle, toggleChatBody, message, email, handleOnChange, chatList, replay, contactUs, setContactUs, handleSubmit, attachment }) => {
  return (
    <div className={`chatBody`}>
      <header className={`chatHeader`}>
        <span className="title">
          <img src={chatHeadIcon} className="img-fluid mr-2" alt="Chat Head" />
          {chatHeadTitle &&
            <span>{chatHeadTitle}</span>
          }
        </span>
        <button className="btn btn-outline-light close-btn" onClick={() => toggleChatBody(false)}>&times;</button>
      </header>
      <ChatList
        style={{ height: contactUs && contactUs.chat_id ? 'calc(100% - 8rem)' : 'calc(100% - 4rem)' }}
        chatList={chatList}
        replay={replay}
        icon={chatHeadIcon}
        setContactUs={setContactUs} />
      <ContactUsForm
        attachment={attachment}
        message={message}
        email={email}
        copyMe={copyMe}
        contactUs={contactUs}
        setContactUs={setContactUs}
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange} />

    </div>
  )
}
