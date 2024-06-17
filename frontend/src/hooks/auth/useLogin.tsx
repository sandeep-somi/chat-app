import { useState } from 'react'
import toast from 'react-hot-toast';

export type TLoginData = {
  user_name: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async ({ user_name, password }: TLoginData) => {
    if (!user_name || !password) return toast.error('Username and Password are required!');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name,
          password,
        })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(false);
      return data;
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  }
}

export default useLogin;