import { create } from "zustand";

const useConversation = create(set => ({
  selected_conversation: null,
  setSelectedConversation: (selected_conversation) => set({ selected_conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set({ messages: [...messages, message] }),
  removeMessage: (message_id) => set({ messages: messages.filter(message => message.message_id!== message_id) }),
  updateMessage: (message) => set({ messages: messages.map(m => m.message_id === message.message_id? message : m) }),
}));

export default useConversation;