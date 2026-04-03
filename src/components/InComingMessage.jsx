import { useContext } from "react";
import { date } from "../helpers/horaMes";
import { AuthContext } from "../auth/AuthContext";

export const InComingMessage = ({ msg }) => {
  const { getAvatar } = useContext(AuthContext);
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src={getAvatar(msg.from)} alt="profile" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{msg.message}</p>
          <span className="time_date">{date(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};