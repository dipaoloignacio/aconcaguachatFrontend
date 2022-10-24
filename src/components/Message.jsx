import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { InComingMessage } from './InComingMessage'
import { OutGoingMessage } from './OutGoingMessage'
import { SendMessage } from './SendMessage'

export const Message = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    return (
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div id="mensajes" className="msg_history">
                {
                    chatState.msg.map(message => {
                        return (
                            message.to === auth.uid
                                ? <InComingMessage key={message.uid} msg={message} />
                                : <OutGoingMessage key={message.uid} msg={message} />
                        )
                    })
                }
            </div>
            {/* <!-- Historia Fin --> */}

            <SendMessage />

        </div>
    )
}
