import classNames from "classnames";
import { IoIosSettings, IoMdMore } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { TUser } from "../../../types/user";
import { useAuthContext } from "../../../context/auth-context";
import useLogout from "../../../hooks/auth/useLogout";

type TUserInfo = {
  should_show_recent?: boolean;
  is_user_info?: boolean;
  is_header?: boolean;
  user: TUser;
  is_active?: boolean;
  is_last?: boolean;
  emoji?: string;
  onSelect?: (id: string) => void;
};

const UserInfo: React.FC<TUserInfo> = ({
  should_show_recent = false,
  is_user_info = false,
  is_header = false,
  user = null,
  is_active = false,
  is_last = false,
  emoji = '',
  onSelect = () => null,
}) => {
  const visibility = (is_user_info || is_header);
  const { setAuthUser } = useAuthContext();
  const { loading, logout } = useLogout();

  const onClickLogout = async () => {
    if (loading) return;
    await logout();
    setAuthUser(null);
    localStorage.removeItem('chat-user');
  };

  const avatar = user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  return (
    <>
      <div
        className={classNames("flex gap-2 items-center  p-2 py-1 select-none", {
          'hover:cursor-pointer hover:bg-slate-600 h-12': !visibility,
          'mx-2 my-2': is_header,
          'active': is_active,
        })}
        onClick={() => {
          if (user?.id) onSelect?.(user.id);
        }}
      >
        <div className={classNames("avatar", {
          online: !visibility,
          offline: !visibility
        })}>
          <div className="w-8 rounded-full">
            <img src={avatar} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div>
              <p className="text-gray-200">{user?.full_name}</p>
              {should_show_recent && <span className="text-sm text-slate-400">hello there...</span>}
            </div>

            {(!visibility && emoji) && <span className="text-xl">{emoji}</span>}
            {is_user_info && <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button"><IoMdMore className="w-6 h-6 outline-none hover:cursor-pointer" /></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-sm w-52">
                <li><a onClick={onClickLogout}><IoLogOut className="w-6 h-6" /> Logout</a></li>
                <li><a><IoIosSettings className="w-6 h-6" /> Settings</a></li>
              </ul>
            </div>}
          </div>
        </div>
      </div>
      {!is_last && <div className="divider my-0 py-0 h-1"></div>}
    </>
  )
}

export default UserInfo;