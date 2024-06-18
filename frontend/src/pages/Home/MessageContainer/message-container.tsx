import useConversation from "../../../zustand/useConversation"
import Messages from "../Messages"
import UserInfo from "../Sidebar/user-info"

const MessageContainer = () => {
  const { selected_conversation = null } = useConversation();

  return (
    <>
      {selected_conversation?.id && <UserInfo is_header user={selected_conversation} />}
      <Messages />
    </>
  )
}

export default MessageContainer