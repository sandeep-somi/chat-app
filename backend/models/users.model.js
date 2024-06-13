import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  avatar: {
      type: String,
      default: '',
  },
})

const Users = mongoose.model('Users', userSchema);

export default Users;
