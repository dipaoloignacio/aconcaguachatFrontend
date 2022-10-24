import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { SideBarChatItem } from './SideBarChatItem'

export const SideBar = () => {

    const {auth} = useContext(AuthContext)
    const { chatState } = useContext(ChatContext)

    return (
        <div className="inbox_chat">

            {
                chatState.users.filter(usuario => usuario.uid !== auth.uid).map(user => {
                    return (
                        <SideBarChatItem
                            key={user.uid}
                            user={user} />
                    )
                })
            }

            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>

        </div>
    )
}
