import useGetUsers from "../../../hooks/user/useGetUsers";
import { TUser } from "../../../types/user";
import useConversation from "../../../zustand/useConversation";
import UserInfo from "./user-info"

const Recipients = () => {
  const { users, loading } = useGetUsers();
  const { selected_conversation, setSelectedConversation } = useConversation();

  const onSelect = (user: TUser) => {
    if (selected_conversation?.id === user?.id) return;
    setSelectedConversation(user);
  }

  return (
    <div className="py-2 flex flex-col overflow-auto recipents-container">
      {loading && <span className="loading loading-spinner"></span>}
      {!loading && users.length ? users.map((user, index) => {
        const is_active = selected_conversation?.id === user.id;

        return (
          <UserInfo
            key={user.id}
            user={user}
            is_last={index === users.length - 1}
            is_active={is_active}
            onSelect={(user) => onSelect(user)}
          />
        )
      }) : null}
    </div>
  )
}

export default Recipients