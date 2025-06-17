import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be between 6 and 12 characters'],
    maxlength:[12, 'Password must be between 6 and 12 characters'],
    select: false,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User',userSchema)
export default User
