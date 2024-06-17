import { useAuthContext } from "../../../context/auth-context";
import Recipients from "./recipients"
import Search from "./search"
import UserInfo from "./user-info"

const Sidebar = () => {
  const { auth_user } = useAuthContext();

  return (
    <>
      <div className="m-2">
        <UserInfo is_user_info user={auth_user} />
      </div>
      <Search />
      <div className="divider p-0 m-0"></div>
      <Recipients />
    </>
  )
}

export default Sidebar