import Users from "../models/users.model.js";

export const getUsers = async (req, res) => {
  try {
    const user_id = req.user._id;
    const users = await Users.find({ _id: { $ne: user_id } }).select("-password -__v");
    res.status(200).json(users.map(user => {
      const { _id, full_name, user_name, avatar } = user;
      return {
        id: _id,
        full_name,
        user_name,
        avatar,
      }
    }));
  } catch ({ message }) {
    res.status(500).json({ error: 'Internal server error!', message });
  }
};