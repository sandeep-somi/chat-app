import { useState } from 'react'
import toast from 'react-hot-toast';

export type TSignupData = {
  full_name: string;
  user_name: string;
  password: string;
  confirm_password: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({ full_name, user_name, password, confirm_password, gender }: TSignupData) => {
    if (!full_name || !user_name || !password || !confirm_password) return toast.error('All fields are required!');
    if (password !== confirm_password) return toast.error('Passwords do not match!');
    if (password.length < 6) return toast.error('Password must be at least 6 characters!');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name,
          user_name,
          password,
          confirm_password,
          gender
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
    signup,
    loading,
  }
}

export default useSignup