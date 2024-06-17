import useGetUsers from "../../../hooks/user/useGetUsers";
import { getRandomEmoji } from "../../../utils/emoji";
import useConversation from "../../../zustand/useConversation";
import UserInfo from "./user-info"

const Recipients = () => {
  const { users, loading } = useGetUsers();
  const { selected_conversation, setSelectedConversation } = useConversation();

  const onSelect = (id: string) => {
    console.log(id, 'on select');
    setSelectedConversation(id);
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <span className="loading loading-spinner"></span>}
      {!loading && users.length ? users.map((user, index) => {
        const is_active = selected_conversation === user.id;

        return (
          <UserInfo
            key={user.id}
            user={user}
            is_last={index === users.length - 1}
            is_active={is_active}
            emoji={getRandomEmoji()}
            onSelect={(id) => onSelect(id)}
          />
        )
      }) : null}
    </div>
  )
}

export default Recipients