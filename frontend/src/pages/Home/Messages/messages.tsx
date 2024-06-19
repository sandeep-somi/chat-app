import { BsSend } from "react-icons/bs"
import Message from "./message"
import { TiMessages } from "react-icons/ti";
import useConversation from "../../../zustand/useConversation";
import { useAuthContext } from "../../../context/auth-context";
import useGetMessages from "../../../hooks/messages/useGetMessages";
import { SyntheticEvent, useEffect, useState } from "react";
import useSendMessage from "../../../hooks/messages/useSendMessage";

const Messages = () => {
  const { selected_conversation, messages, setMessages } = useConversation();
  const { loading } = useGetMessages();
  const [input, setInput] = useState('');
  const { send, loading: send_loading } = useSendMessage();

  useEffect(() => {
    if (!messages?.length) return;
    setTimeout(() => {
      scrollToBottom();
    }, 0);
    
  }, [messages.length])
  
  if (!selected_conversation?.id) return <ChatPlaceholder />;

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const message = await send({
      receiver_id: selected_conversation.id,
      message: input,
    });

    setMessages([...messages, { ...message, is_sender: true }]);
    setInput('');
  };

  const scrollToBottom = () => {
    var el = document.getElementById('messages-container');
    if (el) el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <div id="messages-container" className="px-4 flex-1 overflow-auto messages-container">
        {loading && <span className="loading loading-spinner"></span>}
        {!loading && messages.length? messages.map((message) => {
          return <Message key={message.id} message={message} sender={selected_conversation} />
        }) : <div className="bg-white text-slate-800 p-4 rounded-md">Send a message to start the conversation!</div>}
      </div>
      <form action="" className="px-4 my-3" onSubmit={onSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="input input-bordered text-sm rounded-full block w-full p-2/5 bg-gray-700 border-gray-600 text-white"
            placeholder="type..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={send_loading}
          />
          <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={send_loading}>
            <BsSend className="w-4 h-4 text-white"/>
          </button>
        </div>
      </form>
    </>
  )
}

export default Messages;

const ChatPlaceholder = () => {
  const { auth_user } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {auth_user.full_name} </p>
        <p>Select a chat to start messaging!</p>
        <TiMessages className="text-3x1 md-text-6x1 text-center" />
      </div>
    </div>
  )
}