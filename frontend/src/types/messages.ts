export type TMessage = {
  sender_id: string;
  receiver_id: string;
  message: string;
  id: string;
  created_at: string;
  is_sender: boolean;
}