import { useEffect } from "react";
import { useSocketContext } from "../../context/socket-context"
import useConversation from "../../zustand/useConversation";
import { TMessage } from "../../types/messages";
import notification_sound from "../../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selected_conversation } = useConversation();
  
  useEffect(() => {
    socket?.on('NEW_MESSAGE', (message: TMessage) => {

      console.log(selected_conversation, 'why multiple times here');
      console.log(message, 'why multiple times here');

      if(selected_conversation?.id === message?.sender_id) {
        const notification = new Audio(notification_sound);
        notification.play();
        setMessages([...messages, message]);
      }

      return () => {
        console.log('unsubscribed')
        socket?.off('NEW_MESSAGE');
      }
    });
    console.log(selected_conversation, 'selected_conversation');
  }, [socket, messages, selected_conversation, setMessages]);
}

export default useListenMessages