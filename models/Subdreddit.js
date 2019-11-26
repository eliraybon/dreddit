const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubDredditSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Subdreddit = mongoose.model('subDreddits', SubDredditSchema);