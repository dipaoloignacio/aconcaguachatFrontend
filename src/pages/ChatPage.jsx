import React, { useContext, useEffect } from 'react'
import { ChatSelect } from '../components/ChatSelect'
import { InboxPeople } from '../components/InboxPeople'
import { Message } from '../components/Message'
import { ChatContext } from '../context/chat/ChatContext'
import '../css/chat.css'

function ChatPage() {

  const { chatState } = useContext(ChatContext);

  return (
    <div className="messaging">
      <div className="inbox_msg">

        <InboxPeople />
        {
          chatState.chatActive !== null
            ? <Message />
            : <ChatSelect />
        }

      </div>

    </div>
  )
}

export default ChatPage