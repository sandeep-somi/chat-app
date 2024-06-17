import Messages from "../Messages"
import UserInfo from "../Sidebar/user-info"

const MessageContainer = () => {
  return (
    <>
      <UserInfo is_header />
      <Messages />
    </>
  )
}

export default MessageContainer