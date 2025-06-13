import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token)
    if (!token) {
      return res.status(401).json({ success: false, error: 'Token not provided' });
    }
    // console.log('Headers:', req.headers);
    // console.log('Extracted token:', token);

    // console.log('Extracted token:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    const user = await UserModel.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ success: false, error: 'Authentication failed' });
  }
};


export default verifyUser;
