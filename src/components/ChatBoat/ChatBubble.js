import React from 'react';
// import moment from 'moment';

const getChatFormatted = (chat, setContactUs) => {
  const { chat_desc } = { ...chat };
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
  } else {
    initialStr = desc;
  }
  return (
    <>
      <span>{initialStr}</span>
      <a href={anchorStr[1]} target={anchorStr[2]}>{anchorStr[0]}</a>
      <span>{endStr}</span>
      {
        anchorStr && anchorStr.length ? (
          <>
            <br></br>
            <br></br>
          </>
        ) : null
      }
      <span>Click <span className="text-primary" onClick={(event) => {
        event.stopPropagation();
        setContactUs(chat);
      }}>here</span> to contact us</span>
    </>
  );
}
export const ChatBubble = ({ chat_id, chat_label, chat_desc, chat_options, type, reply_id, timestamp, replay, setContactUs }) => {
  // const [calendarStyle, setDateStyle] = useState(false);
  const chat = { chat_id, chat_label, chat_desc, chat_options, type, reply_id };
  return (
    <li className={`list-group-item ${type}`}>
      <img className="chat-icon" src={require('../../logo.svg')} alt="chat icon" />
      <div className="msg" onClick={(event) => {
        event.stopPropagation();
        type !== 'a' &&
          replay(chat);
      }}>
        {
          type !== 'c' && chat_label && (
            <div>{chat_label}</div>
          )
        }
        {
          type !== 'c' && chat_desc && (
            <div>{chat_desc}</div>
          )
        }
        {
          type === 'c' && (
            <div>{getChatFormatted(chat, setContactUs)}</div>
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
        {/* {
          type !== 'i' && (
            <small onClick={(event) => {
              event.stopPropagation();
              setDateStyle(!calendarStyle)
            }}>{calendarStyle ? moment(timestamp).calendar() : moment(timestamp).fromNow()}</small>
          )
        } */}
      </div>
    </li >
  )
}
