import { useEffect, useMemo } from "react";
import useGetUsers from "../../../hooks/user/useGetUsers";
import { TUser } from "../../../types/user";
import useConversation from "../../../zustand/useConversation";
import UserInfo from "./user-info"
import { useSocketContext } from "../../../context/socket-context";

const Recipients = () => {
  const { users, loading } = useGetUsers();
  const { search, setSearch, selected_conversation, setSelectedConversation } = useConversation();
  const { online_users } = useSocketContext();

  useEffect(() => {
    return () => setSearch('');
  }, [])

  const onSelect = (user: TUser) => {
    if (selected_conversation?.id === user?.id) return;
    setSelectedConversation(user);
  }

  const filtered_users = useMemo(() => {
    if (!search) return users;
    return users.filter(user => user?.full_name?.toLowerCase().includes(search.toLowerCase()));
  }, [search, users]);

  return (
    <div className="py-2 flex flex-col overflow-auto recipents-container">
      {loading && <span className="loading loading-spinner"></span>}
      {!loading && users.length ? filtered_users.map((user, index) => {
        const is_active = selected_conversation?.id === user.id;
        const is_online = online_users?.includes(user.id);
        return (
          <UserInfo
            key={user.id}
            user={user}
            is_last={index === users.length - 1}
            is_active={is_active}
            onSelect={(user) => onSelect(user)}
            is_online={is_online}
          />
        )
      }) : null}
    </div>
  )
}

export default Recipients