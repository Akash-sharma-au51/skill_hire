import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// Register a new user
 const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    // Check if all fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
        }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully",
        success: true,
        token,
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
        }
     });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}   

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};  

const logoutUser = async (req: Request, res: Response) => {
  try {
    // Invalidate the token by not sending it back to the client
    res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export { registerUser, loginUser, logoutUser };
