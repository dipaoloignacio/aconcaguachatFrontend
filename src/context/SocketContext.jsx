import React, { useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket'

import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, disconectSocket } = useSocket('https://aconcaguachat.herokuapp.com/');
    const { auth } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        if (auth.logged) {
            conectarSocket();
        }
    }, [auth, conectarSocket])

    useEffect(() => {
        if (!auth.logged) {
            disconectSocket();
        }
    }, [auth, disconectSocket])

    useEffect(() => {
        socket?.on('users-list', (users) => {
            dispatch({
                type: types.usersCargados,
                payload: users
            });
        })
    }, [socket, dispatch])

    useEffect(() => {
        socket?.on('mensaje-personal', (message) => {

            dispatch({
                type: types.nuevoMensaje,
                payload: message
            }); 

            scrollToBottomAnimated('mensajes');
        })
    }, [socket, dispatch])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}