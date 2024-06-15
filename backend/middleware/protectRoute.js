import jwt from 'jsonwebtoken';
import Users from '../models/users.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) return req.status(401).json({ error: 'Unauthorized - No token provided!' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return req.status(401).json({ error: 'Unauthorized - Invalid token!' });

    const user = await Users.findById(decoded.userId).select('-password');
    if(!user) return req.status(401).json({ error: 'User not found!' });

    req.user = user;
    next();

  } catch ({ message, ...error }) {
    console.log(error, 'error')
    res.status(500).json({ error: 'Internal server error!', message, error });
  }
};

export default protectRoute;