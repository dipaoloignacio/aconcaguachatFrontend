import React from 'react'
import { date } from '../helpers/horaMes'

export const OutGoingMessage = ({msg}) => {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{msg.message}</p>
                <span className="time_date">{date(msg.createdAt)}</span>
            </div>
        </div>
    )
}
