import { BsSend } from "react-icons/bs"
import Message from "./message"
import { TiMessageTyping, TiMessages } from "react-icons/ti";

const Messages = () => {
  const no_chat_selected = true;
  if (no_chat_selected) return <ChatPlaceholder />;

  return (
    <>
      <div className="px-4 flex-1 overflow-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
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
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 John Doe </p>
        <p>Select a chat to start messaging!</p>
        <TiMessages className="text-3x1 md-text-6x1 text-center" />
      </div>
    </div>
  )
}