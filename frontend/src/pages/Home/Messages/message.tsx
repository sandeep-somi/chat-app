import classNames from "classnames";
import { TMessage } from "../../../types/messages";
import { TUser } from "../../../types/user";

type TMessages = {
  message: TMessage;
  sender: TUser;
};

const Message: React.FC<TMessages> = ({ message, sender }) => {
  console.log(sender);
  return (
    <div className={classNames("chat", {
      'chat-end': message.is_sender,
      'chat-start': !message.is_sender
    })}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={sender?.avatar} />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">{message.message || ''}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-emerald-200 mt-1">
        {message.created_at}
      </div>
    </div>
  )
}

export default Message