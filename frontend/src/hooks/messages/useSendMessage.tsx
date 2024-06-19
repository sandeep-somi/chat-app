import { useState } from 'react'
import toast from 'react-hot-toast';

export type TSend = {
  message: string;
  receiver_id: string;
}

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const send = async ({ message, receiver_id }: TSend) => {
    if (!receiver_id || !message) return toast.error('All fields are required!');
    
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${receiver_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
        })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(false);
      return data;
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
    }
  };

  return {
    send,
    loading,
  }
}

export default useSendMessage;