import Conversations from "../models/conversations.model.js";
import Messages from "../models/messages.model.js";

export const send = async (req, res) => {
  try {
    const { receiver_id } = req.params;
    const { message } = req.body;
    const sender_id = req.user._id;

    let conversation = await Conversations.findOne({
      participants: {
        $all: [sender_id, receiver_id],
      },
    });

    if (!conversation) {
      conversation = await Conversations.create({
        participants: [sender_id, receiver_id],
      });
    }

    const new_message = new Messages({
      sender_id,
      receiver_id,
      message,
    });

    if (new_message) {
      conversation.messages.push(new_message);
    }

    await Promise.all([conversation.save(), new_message.save()]);

    res.status(201).json(new_message);

  } catch ({ message }) {
    res.status(500).json({ error: 'Internal server error!', message });
  }
};

export const get = async (req, res) => {
  try {
    const { receiver_id } = req.params;
    const sender_id = req.user._id;

    const conversation = await Conversations.findOne({
      participants: {
        $all: [sender_id, receiver_id],
      },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages.map(({ createdAt, sender_id: s_id, receiver_id: r_id, message, _id }) => ({
      id: _id,
      created_at: createdAt,
      sender_id: s_id,
      receiver_id: r_id,
      message,
      is_sender: s_id === sender_id,
    }));

    res.status(200).json(messages);
  } catch ({ message }) {
    res.status(500).json({ error: 'Internal server error!', message });
  }
}