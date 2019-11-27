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
              SubDreddit.findById(post.subDreddit.toJSON())
                .then(sub => {
                  sub.posts.push(post._id);
                  sub.save()
                    .then(sub => res.send({ post, user, sub }))
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

//get a subDreddit's posts
router.get('/:subId', (req, res) => {
  SubDreddit.findById(req.params.subId)
    .then(sub => {
      let postsObj = {};
      sub.posts.forEach(post => postsObj[post._id = post]);
      return res.json(postsObj);
    })
    .catch(err => console.log(err))
})

// get a single post
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ missing: 'No post found' }));
})


router.post('/upvote', (req, res) => {
  const postId = req.body.postId;
  // debugger;
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
          // debugger;
          newVote.save()
            .then(vote => {
              // debugger;
              user.votes.push(vote.id);
              post.votes.push(vote.id);
              user.save()
                .then(user => {
                  // debugger;
                  post.save()
                    .then(post => {
                      return res.send({ post, user });
                    })
                })
            })
        })
    })
})

router.get('/:id/votes', (req, res) => {
  Vote.find({ post: req.params.id })
    .then(votes => {
      debugger;
      res.send(votes)
    });
})

module.exports = router;