import React from 'react';
import '../../assets/ChatBoat.scss';
import { ChatList } from './ChatList';
import { FaPlus, FaRegSurprise, FaMicrophone } from 'react-icons/fa';

export const ChatBody = ({ chatHeadIcon, chatHeadTitle, toggleChatBody, message, handleOnChange, chatList, replay, contactUs }) => {
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
      <ChatList chatList={chatList} replay={replay} contactUs={contactUs} />
      <footer className="chatFooter">
        <button className="btn btn-link text-dark addAttachmentBtn">
          <FaPlus />
        </button>
        <form className="input-group">
          <input type="text" className="form-control" placeholder="Write something here.." name="message" value={message} onChange={handleOnChange} />
          <div className="input-group-append">
            <button className="btn btn-link text-dark addAttachmentBtn">
              <FaRegSurprise />
            </button>
          </div>
        </form>
        <button className="btn btn-link text-dark addAttachmentBtn">
          <FaMicrophone />
        </button>
      </footer>
    </div>
  )
}
