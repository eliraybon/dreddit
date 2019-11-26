const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubdredditSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  posts: [{ type: mongoosse.Schema.Types.ObjectId, ref: 'posts' }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Subdreddit = mongoose.model('subdreddits', SubdredditSchema);