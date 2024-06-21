import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./auth-context";
import { io } from "socket.io-client";

export const SocketContext = createContext({});

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const { auth_user } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [online_users, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (auth_user?.id) {
      const _socket = io('https://chat-app-t8cb.onrender.com/', {
        query: {
          user_id: auth_user?.id,
        }
      });
      setSocket(_socket);

      _socket.on('GET_ONLINE_USERS', (users: []) => {
        console.log('GET_ONLINE_USERS');
        setOnlineUsers(users);
      })

      return () => {
        _socket.close();
      }
    } else {
      if (socket) {
        socket?.close();
        setSocket(null);
      }
    }
  }, [auth_user]);

  return <SocketContext.Provider value={{ socket, online_users }}>{children}</SocketContext.Provider>;
}