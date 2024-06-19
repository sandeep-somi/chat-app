import { BsSend } from "react-icons/bs"
import Message from "./message"
import { TiMessages } from "react-icons/ti";
import useConversation from "../../../zustand/useConversation";
import { useAuthContext } from "../../../context/auth-context";
import useGetMessages from "../../../hooks/messages/useGetMessages";

const Messages = () => {
  const { selected_conversation } = useConversation();
  const { messages, loading } = useGetMessages();
  console.log(messages);
  if (!selected_conversation?.id) return <ChatPlaceholder />;

  return (
    <>
      <div className="px-4 flex-1 overflow-auto">
        {loading && <span className="loading loading-spinner"></span>}
        {!loading && messages.length? messages.map((message) => {
          return <Message key={message.id} message={message} sender={selected_conversation} />
        }) : <div className="bg-white text-slate-800 p-4 rounded-md">Send a message to start the conversation!</div>}
      </div>
      <form action="" className="px-4 my-3">
        <div className="w-full relative">
          <input
            type="text"
            className="input input-bordered text-sm rounded-full block w-full p-2/5 bg-gray-700 border-gray-600 text-white"
            placeholder="type..."
          />
          <button className="absolute inset-y-0 end-0 flex items-center pe-3">
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