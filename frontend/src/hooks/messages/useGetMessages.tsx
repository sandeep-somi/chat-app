import { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selected_conversation } = useConversation();

  useEffect(() => {
    if(selected_conversation?.id) getMessages(selected_conversation.id);
  },[selected_conversation?.id]);

  const getMessages = async (conversation_id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${conversation_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();
      if(data.error) throw new Error("");
       new Error(data.error);
      setMessages(data);
      
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return {
    getMessages,
    loading,
    messages,
  }
}

export default useGetMessages