const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'comments'
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  date: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;