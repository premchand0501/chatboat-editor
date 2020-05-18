import React from 'react';
import { ChatBubble } from './ChatBubble';

export const ChatList = ({ chatList, replay, setContactUs }) => {
  return (
    <ul className="list-group chatList">
      {
        chatList && chatList.length ? chatList.map(que => (
          <ChatBubble
            {...que}
            key={'chat_id_' + que.chat_id + '_' + (Math.random() * Date.now())}
            replay={replay}
            setContactUs={setContactUs} />
        )) : null
      }
    </ul>
  )
}