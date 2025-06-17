import {registerUser,loginUser,logoutUser} from '../controllers/userController';
import express from 'express';
import authMiddleware from '../middlewares/auth';


const router = express.Router();

// User registration route
router.post('/register', registerUser);
// User login route
router.post('/login', loginUser);
// User logout route
router.post('/logout', authMiddleware, logoutUser);


// Export the router
export default router;
