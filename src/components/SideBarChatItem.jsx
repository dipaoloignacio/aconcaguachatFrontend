import React, { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottomm } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const SideBarChatItem = ({ user }) => {
    const { dispatch, chatState } = useContext(ChatContext);

    const onClick = async () => {
        dispatch({
            type: types.activarChat,
            payload: user.uid
        })

        //cargar mensajes del chat
        const resp = await fetchConToken(`message/${user.uid}`);

        dispatch({
            type: types.cargarMsg,
            payload: resp.msg
        })

        //mover scroll
        scrollToBottomm('mensajes');
    }

    return (
        <div
            className={user.uid === chatState.chatActive ? "chat_list active_chat" : 'chat_list'}
            onClick={onClick}
        >
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{user.nombre}</h5>
                    {
                        user.online
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
