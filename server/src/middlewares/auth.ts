import express from 'express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized access' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById((decoded as any).id);

    if (!user) {
      res.status(401).json({ message: 'Unauthorized access' });
      return;
    }   
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) { 
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized access' });
    return;
  }
}
export default authMiddleware;



