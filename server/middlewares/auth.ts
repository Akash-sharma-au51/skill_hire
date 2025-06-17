import express from 'express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel';
dotenv.config();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById((decoded as any).id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }   
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) { 
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized access' });
  }
}
export default authMiddleware;



