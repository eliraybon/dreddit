const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true 
  },
  date: {
    type: Date, 
    default: Date.now
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
