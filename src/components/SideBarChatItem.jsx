import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottomm } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const SideBarChatItem = ({ user }) => {
    const { dispatch, chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext)
    const { socket } = useContext(SocketContext)
    let notifi = localStorage.getItem('notification');
    const [noti, setNoti] = useState({
        notify: false,
        to: '',
        from: '',
    })

    useEffect(() => {
        socket?.on('getNotification', (payload) => {
            if (payload.to === auth.uid &&
                payload.from === user.uid) {

                setNoti({
                    notify: true,
                    to: payload.to,
                    from: payload.from,
                })
                localStorage.setItem('notification', true)
            }

            if (chatState.chatActive === payload.from) {
                setNoti({
                    notify: false,
                    to: '',
                    from: ''
                })
                localStorage.removeItem('notification')
            }
        })
    }, [socket, chatState.chatActive])


    const onClick = async () => {
        dispatch({
            type: types.activarChat,
            payload: user.uid
        })

        if (noti.notify) {
            localStorage.removeItem('notification')
        }

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
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo38tCnX_HjKgFyft_g7SeKWrA9IqaS3dgnNJVmwe77ceNSy04aJjtk-ik3xo0VWjXG7Y&usqp=CAU" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{user.nombre}</h5>
                    {
                        user.online
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>

                {

                    notifi &&
                        noti.to === auth.uid &&
                        noti.from === user.uid &&
                        chatState.chatActive !== noti.from ? <div className={'float-end text-light bg-danger p-1'}>nuevo mensaje</div> : ''
                }

            </div>
        </div>
    )
}
