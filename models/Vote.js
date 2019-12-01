const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts',
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'comments'
  },
  upvote: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Vote = mongoose.model('votes', voteSchema);
module.exports = Vote;