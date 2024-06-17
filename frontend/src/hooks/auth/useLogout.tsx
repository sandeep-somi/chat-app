import { useState } from 'react'
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    
    setLoading(true);
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    logout,
    loading,
  }
}

export default useLogout;