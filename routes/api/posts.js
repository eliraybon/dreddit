const express = require("express");
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const SubDreddit = require('../../models/Subdreddit');
const passport = require('passport');
const jwt_decode = require('jwt-decode');
const validatePostInput = require('../../validation/posts');

//create new post
router.post('/', (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(422).json(errors);
  }
  const newPost = new Post({
    user: req.body.user,
    title: req.body.title,
    text: req.body.text,
    imgUrl: req.body.imgUrl,
    subDreddit: req.body.subDreddit,
  })

  newPost.save()
    .then(post => {
      User.findOne({ _id: post.user.toJSON() })
        .then(user => {
          user.posts.push(post._id);
          user.save()
            .then(user => {
              const userJSON = user.toJSON();
              delete userJSON['password'];
              delete userJSON['date'];
              SubDreddit.findById(post.subDreddit.toJSON())
                .then(sub => {
                  sub.posts.push(post._id);
                  sub.save()
                    .then(sub => res.send({ post, user: userJSON, sub }))
                  // return res.send({post, user, sub});
                })
            })
        })
    });
})

// get posts 
router.get('/', (req, res) => {
  Post.find({})
    .then(posts => {
      let postsObj = {};
      posts.forEach(post => postsObj[post._id] = post);
      return res.json(postsObj);
    })
})

// get a single post
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ missing: 'No post found' }));
})


router.post('/vote', (req, res) => {
  const postId = req.body.postId;
  const token = req.headers.authorization;
  const currentUser = jwt_decode(token);

  Post.findOne({ _id: postId })
    .then(post => {
      User.findOne({ _id: currentUser.id })
        .then(user => {
          const newVote = new Vote({
            user: user._id,
            post: post._id,
            upvote: req.body.upvote
          });
          newVote.save()
            .then(vote => {
              user.votes.push(vote.id);
              post.votes.push(vote.id);
              user.save()
                .then(user => {
                  const userJSON = user.toJSON();
                  delete userJSON['password'];
                  delete userJSON['date'];
                  post.save()
                    .then(post => {
                      return res.send({ post, user: userJSON });
                    })
                })
            })
        })
    })
})


router.delete('/vote', (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  debugger;
  Vote.findOne({ user: userId, post: postId })
    .then(vote => {
      User.findById(userId)
        .then(user => {
          debugger;
          const userJSON = user.toJSON();
          const voteIdx = userJSON.votes.findIndex(ele => ele.toJSON() === vote._id.toJSON());
          delete userJSON.votes[voteIdx];
          const newVotes = userJSON.votes.filter(ele => ele !== undefined);
          user.votes = newVotes;
          user.save()
            .then(user => {
              Post.findById(postId)
                .then(post => {
                  debugger;
                  const postJSON = post.toJSON();
                  const voteIdx = postJSON.votes.findIndex(ele => ele.toJSON() === vote._id.toJSON());
                  delete postJSON.votes[voteIdx];
                  const newVotes = postJSON.votes.filter(ele => ele !== undefined);
                  post.votes = newVotes;
                  post.save()
                    .then(post => {
                      Vote.deleteOne({ user: user._id, post: post._id })
                        .then(vote => {
                          return res.send({ user, post });
                        })
                    })
                })
            })
        })
    })
})

//route that returns all the votes on a post 
router.get('/:id/votes', (req, res) => {
  Vote.find({ post: req.params.id })
    .then(votes => {
      res.send(votes)
    });
})


module.exports = router;