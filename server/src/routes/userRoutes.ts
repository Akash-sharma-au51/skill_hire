import {registerUser,loginUser,logoutUser} from '../controllers/userController.js';
import express, { RequestHandler } from 'express';
import authMiddleware from '../middlewares/auth.js';


const router = express.Router();

function asyncHandler(fn: any): RequestHandler {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// User registration route
router.post('/register', asyncHandler(registerUser));
// User login route
router.post('/login', asyncHandler(loginUser));
// User logout route
router.post('/logout', authMiddleware, logoutUser);


// Export the router
export default router;
