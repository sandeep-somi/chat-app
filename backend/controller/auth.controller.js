import Users from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { user_name, full_name, password: unhashed_password, confirm_password, gender } = req.body;

    if (unhashed_password !== confirm_password) {
      return res.status(400).json({ error: "Password didn't matched!" });
    }

    const user = await Users.findOne({ user_name });

    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(unhashed_password, salt);

    const male_avatar = `https://avatar.iran.liara.run/public/boy?username=${user_name}`;
    const female_avatar = `https://avatar.iran.liara.run/public/girl?username=${user_name}`;
    const avatar = gender === 'male' ? male_avatar : female_avatar;

    const new_user = new Users({
      full_name,
      user_name,
      password,
      gender,
      avatar,
    });

    if (new_user) {
      generateTokenAndSetCookie(new_user._id, res);
      await new_user.save();

      res.status(201).json({
        id: new_user._id,
        full_name: new_user.full_name,
        user_name: new_user.user_name,
        gender: new_user.gender,
        avatar: new_user.avatar,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data!'});
    }

  } catch ({ message }) {
    res.status(500).json({ error: 'Internal server error!', message });
  }
};

export const login = async (req, res) => {
  try {
   const { user_name, password } = req.body;
   const user = await Users.findOne({ user_name });
   const is_password_correct = await bcrypt.compare(password, user?.password || '');

    if (!user || !is_password_correct) {
      return res.status(400).json({ error: 'Invalid username or password!'});
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      id: user._id,
      full_name: user.full_name,
      user_name: user.user_name,
      gender: user.gender,
      avatar: user.avatar,
    });

  } catch ({ message }) {
    res.status(500).json({ error: 'Internal server error!', message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully!'});
  } catch ({ message }) {
    res.status(500).json({ error: 'Internal server error!', message });
  }
};