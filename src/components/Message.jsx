import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { InComingMessage } from "./InComingMessage";
import { OutGoingMessage } from "./OutGoingMessage";
import { SendMessage } from "./SendMessage";

export const Message = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div id="mensajes" className="msg_history">
        {chatState.msg.map((message, index) => {
          return message.to === auth.uid ? (
            <InComingMessage key={message._id || index} msg={message} />
          ) : (
            <OutGoingMessage key={message._id || index} msg={message} />
          );
        })}
      </div>

      <SendMessage />
    </div>
  );
};