import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';

export const SendMessage = () => {

    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    const [message, setMessage] = useState('');

    const onChange = (ev) => {
        setMessage(ev.target.value);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (message.length === 0) { return; }
        setMessage('')

        socket.emit('mensaje-personal', {
            from: auth.uid,
            to: chatState.chatActive,
            message
        });
        socket.emit('send-notification', {
            from: auth.uid,
            to: chatState.chatActive,
            msgSinLeer: true
        });
    }

    return (
        <form
            action=""
            onSubmit={onSubmit}
        >
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={message}
                        onChange={onChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
