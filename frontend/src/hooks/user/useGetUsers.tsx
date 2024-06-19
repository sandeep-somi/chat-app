import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getRandomEmoji } from "../../utils/emoji";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers();
  }, [])
  

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(false);
      const _data = data.map(user => {
        return {
          ...user,
          emoji: getRandomEmoji()
        }
      })
      
      setUsers(_data);
      return _data;
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return {
    loading,
    users,
    getUsers,
  }
};

export default useGetUsers;