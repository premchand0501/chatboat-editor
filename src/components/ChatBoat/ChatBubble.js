import React, { useState } from 'react';
import moment from 'moment';

const getChatFormatted = (chat_desc, contactUs) => {
  let desc = chat_desc;
  let anchorStr = [];
  let initialStr = '',
    endStr = '';
  const ind = desc.indexOf('[');
  if (ind > -1) {
    const end = desc.indexOf(']');
    anchorStr = desc.substring(ind + 1, end).split(',');
    initialStr = desc.substring(0, ind);
    endStr = desc.substring(end + 1);
    console.log(anchorStr, initialStr, endStr);
  } else {
    initialStr = desc;
  }
  return (
    <p>
      <span>Click <span className="text-primary" onClick={(event) => {
        event.stopPropagation();
        contactUs()
      }}>here</span> to contact us</span>
      <br></br>
      <span>{initialStr}</span>
      <a href={anchorStr[1]} target={anchorStr[2]}>{anchorStr[0]}</a>
      <span>{endStr}</span>
    </p>
  );
}
export const ChatBubble = ({ chat_id, chat_label, chat_desc, chat_options, type, reply_id, timestamp, replay, contactUs }) => {
  const [calendarStyle, setDateStyle] = useState(false);
  return (
    <li className={`list-group-item ${type}`}>
      <img className="chat-icon" src={require('../../logo.svg')} alt="chat icon" />
      <div className="msg" onClick={(event) => {
        event.stopPropagation();
        replay({ chat_id, chat_label, chat_desc, chat_options, type, reply_id });
      }}>
        {
          chat_label && type !== 'c' && (
            <div>{chat_label}</div>
          )
        }
        {
          chat_desc && (
            <div>{type !== 'c' ? chat_desc : getChatFormatted(chat_desc, () => contactUs({ chat_id, chat_label, chat_desc, chat_options, type, reply_id }))}</div>
          )
        }
        {
          chat_options && chat_options.length ? (
            <ul className="list-group my-2">
              {
                chat_options.map((opt, ind) => (
                  <li className="list-group-item" key={'opt_' + ind} onClick={(event) => {
                    event.stopPropagation();
                    replay(opt);
                  }}>{opt.chat_label || opt.chat_desc}</li>
                ))
              }
            </ul>
          ) : null
        }
        {
          type !== 'i' && (
            <small onClick={(event) => {
              event.stopPropagation();
              setDateStyle(!calendarStyle)
            }}>{calendarStyle ? moment(timestamp).calendar() : moment(timestamp).fromNow()}</small>
          )
        }
      </div>
    </li>
  )
}
