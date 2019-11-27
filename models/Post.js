const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  imgUrl: {
    type: String
  },
  subDreddit: {
    type: Schema.Types.ObjectId,
    ref: "subDreddits",
    required: true
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "votes"}],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;