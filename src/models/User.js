import mongoose from 'mongoose';

const roles = [
  'admin',
  'user'
];

const User = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, 'Please enter a first name'],
      index: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please enter a last name'],
      index: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: String,
    //salt: String,
    role: {
      type: String,
      enum: roles,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', User);
