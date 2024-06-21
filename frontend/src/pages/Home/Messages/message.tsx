import classNames from "classnames";
import { TMessage } from "../../../types/messages";
import { TUser } from "../../../types/user";
import { useAuthContext } from "../../../context/auth-context";
import { extractTime } from "../../../utils/common";

type TMessages = {
  message: TMessage;
  sender: TUser;
};

const Message: React.FC<TMessages> = ({ message, sender }) => {
  const { auth_user } = useAuthContext();
  const avatar = !message.is_sender ? sender.avatar : auth_user.avatar;
  const time = extractTime(message.created_at);

  return (
    <div className={classNames("chat", {
      'chat-end': message.is_sender,
      'chat-start': !message.is_sender
    })}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={avatar} />
        </div>
      </div>
      <div className={classNames("chat-bubble text-white", {
        'bg-blue-500': !message.is_sender,
        'bg-slate-500': message.is_sender
      })}>{message.message || ''}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-emerald-200 mt-1">
        {time}
      </div>
    </div>
  )
}

export default Message