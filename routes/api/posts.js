const express = require("express");
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const SubDreddit = require('../../models/Subdreddit');
const Comment = require('../../models/Comment');
const passport = require('passport');
const jwt_decode = require('jwt-decode');
const validatePostInput = require('../../validation/posts');

//for file uploads 
const upload = require('../../services/file_upload');
const singleUpload = upload.single('content');


//create new post
router.post('/', (req, res) => {
  // const { errors, isValid } = validatePostInput(req.body);

  // if (!isValid) {
  //   return res.status(422).json(errors);
  // }
  debugger;
  const newPost = new Post({
    user: req.body.user,
    title: req.body.title,
    text: req.body.text,
    imgUrl: req.body.imgUrl,
    videoUrl: req.body.videoUrl,
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
  let commentsObj = {};

  Post.findById(req.params.id)
    .then(post => {
      Comment.find({ post: post._id })
        .then(comments => {
          comments.forEach(comment => commentsObj[comment._id] = comment);
          return res.send({ post, comments: commentsObj })
        })
    })
    .catch(err => res.status(404).json({ missing: 'No post found' }));
})

// delete's a post. This also needs to delete all of a posts comments and those comments' replies 
router.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      SubDreddit.findById(post.subDreddit)
        .then(sub => {
          const subJSON = sub.toJSON();
          const postIdx = subJSON.posts.findIndex(ele => ele.toJSON() === post._id.toJSON());
          delete subJSON.posts[postIdx];
          const newPosts = subJSON.posts.filter(ele => ele !== undefined);
          sub.posts = newPosts;
          sub.save()
            .then(sub => {
              User.findById(post.user)
                .then(user => {
                  const userJSON = user.toJSON();
                  const postIdx = userJSON.posts.findIndex(ele => ele.toJSON() === post._id.toJSON());
                  delete userJSON.posts[postIdx];
                  const newPosts = userJSON.posts.filter(ele => ele !== undefined);
                  user.posts = newPosts;
                  user.save()
                    .then(user => {
                      Post.deleteOne({ _id: req.params.id})
                        .then(post => {
                          return res.send({ user, sub, postId: req.params.id })
                        })
                    })
                })
            })
        })
    })
})


router.post('/vote', (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

  Post.findOne({ _id: postId })
    .then(post => {
      User.findOne({ _id: userId })
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

router.patch('/vote', (req, res) => {
  const { postId, userId } = req.body;

  Vote.findOne({ user: userId, post: postId })
    .then(vote => {
      vote.upvote = req.body.upvote;
      vote.save()
        .then(vote => {
          Post.findById(vote.post)
            .then(post => {
              return res.send(post)
            })
        })
    })

})


//this is one of the most confoluded methods I've ever written.
//Whoever is reading this... I am sincerely sorry 
router.delete('/vote', (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

  Vote.findOne({ user: userId, post: postId })
    .then(vote => {

      User.findById(userId)
        .then(user => {

          const userJSON = user.toJSON();
          const voteIdx = userJSON.votes.findIndex(ele => ele.toJSON() === vote._id.toJSON());
          delete userJSON.votes[voteIdx];
          const newVotes = userJSON.votes.filter(ele => ele !== undefined);
          user.votes = newVotes;
          delete userJSON['password'];
          delete userJSON['date'];
          user.save()
            .then(user => {
              Post.findById(postId)
                .then(post => {
        
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