import { create } from "zustand";
import { TUser } from "../types/user";
import { TMessage } from "../types/messages";

// Define the type for the store API
type StoreApi<T> = {
  setSelectedConversation: (selected_conversation: TUser) => void;
  setMessages: (messages: TMessage[]) => void;
  addMessage: (message: TMessage) => void;
  setSearch: (search: string) => void;
  setIsSearching: (is_searching: boolean) => void;
} & T;

// Define the type for the user conversation
type TUserConversation = {
  messages: TMessage[];
  search: string;
  selected_conversation: TUser | null;
  is_searching: boolean;
};

// Create the Zustand store with explicit types
const useConversation = create<StoreApi<TUserConversation>>(set => ({
  selected_conversation: null,
  setSelectedConversation: (selected_conversation: TUser) => set({ selected_conversation }),
  messages: [],
  setMessages: (messages: TMessage[]) => set({ messages }),
  addMessage: (message: TMessage) => set(state => ({ messages: [...state.messages, message] })),
  search: '',
  setSearch: (search: string) => set({ search }),
  is_searching: false,
  setIsSearching: (is_searching: boolean) => set({ is_searching }),
}));

export default useConversation;