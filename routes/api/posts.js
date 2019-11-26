const express = require("express");
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
// const SubDreddit = require('../../models/SubDreddit');
const passport = require('passport');
// const jwt_decode = require('jwt-decode');
const validatePostInput = require('../../validation/posts');

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
          user.posts.push(post);
          user.save()
            .then(() => res.send(post))
        })
    });
})

router.get('/', (req, res) => {
  Post.find({})
    .then(posts => {
      let postsObj = {};
      posts.forEach(post => postsObj[post._id] = post);
      return res.json(postsObj);
    })
})

router.get('/:subId', (req, res) => {
  SubDreddit.findById(req.params.subId)
    .then(sub => {
      let postsObj = {};
      sub.posts.forEach(post => postsObj[post._id = post]);
      return res.json(postsObj);
    })
})

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ missing: 'No post found' }));
})

module.exports = router;