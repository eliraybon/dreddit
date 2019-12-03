const express = require("express");
const router = express.Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const passport = require('passport');
const jwt_decode = require('jwt-decode');

router.delete('/vote', (req, res) => {
  const { commentId, userId } = req.body;

  Vote.findOne({ user: userId, comment: commentId })
    .then(vote => {

      User.findById(userId)
        .then(user => {

          const userJSON = user.toJSON();
          const voteIdx = userJSON.votes.findIndex(ele => ele.toJSON() === vote._id.toJSON());
          delete userJSON.votes[voteIdx];
          const newVotes = userJSON.votes.filter(ele => ele !== undefined);
          user.votes = newVotes;
          user.save()
            .then(user => {
              Comment.findById(commentId)
                .then(comment => {

                  const commentJSON = comment.toJSON();
                  const voteIdx = commentJSON.votes.findIndex(ele => ele.toJSON() === vote._id.toJSON());
                  delete commentJSON.votes[voteIdx];
                  const newVotes = commentJSON.votes.filter(ele => ele !== undefined);
                  comment.votes = newVotes;
                  comment.save()
                    .then(comment => {
                      comment.populate('user').execPopulate();
                      Vote.deleteOne({ user: user._id, comment: comment._id })
                        .then(vote => {
                          return res.send({ user, comment });
                        })
                    })
                })
            })
        })
    })
})

router.post('/', (req, res) => {

  const newComment = new Comment({
    text: req.body.text,
    user: req.body.user,
    post: req.body.post,
  })

  newComment.save()
    .then(comment => {
      comment.populate('user').execPopulate();
      User.findById(comment.user.toJSON())
        .then(user => {
          user.comments.push(comment._id);
          user.save()
            .then(user => {
              const userJSON = user.toJSON();
              delete userJSON['password'];
              delete userJSON['date'];
              Post.findById(comment.post.toJSON())
                .then(post => {
                  post.comments.push(comment._id);
                  post.save()
                    .then(post => {
                      return res.send({ post, comment, user: userJSON })
                    })
                })
            })
        })
    })
})

router.post('/:commentId/reply', (req, res) => {
  const reply = new Comment({
    text: req.body.text,
    user: req.body.user,
    post: req.body.post,
    comment: req.body.comment
  })

  reply.save()
    .then(reply => {
      reply.populate('user').execPopulate();
      User.findById(reply.user.toJSON())
        .then(user => {

          user.comments.push(reply._id);
          user.save()
            .then(user => {
              const userJSON = user.toJSON();
              delete userJSON['password'];
              delete userJSON['date'];
              Post.findById(reply.post.toJSON())
                .then(post => {
   
                  post.comments.push(reply._id);
                  post.save()
                    .then(post => {

                      return res.send({ post, comment: reply, user: userJSON })
                    })
                })
            })
        })
    })
})

//this does not recursively delete all of a comment's replies 
router.delete('/:id', (req, res) => {
  debugger;
  Comment.findById(req.params.id)
    .then(comment => {
      debugger;
      Post.findById(comment.post)
        .then(post => {

          const postJSON = post.toJSON();
          const commentIdx = postJSON.comments.findIndex(ele => ele.toJSON() === comment._id.toJSON());
          delete postJSON.comments[commentIdx];
          const newComments = postJSON.comments.filter(ele => ele !== undefined);
          post.comments = newComments;
          post.save()
            .then(post => {

              User.findById(comment.user)
                .then(user => {

                  const userJSON = user.toJSON();
                  const commentIdx = userJSON.comments.findIndex(ele => ele.toJSON() === comment._id.toJSON());
                  delete userJSON.comments[commentIdx];
                  const newComments = userJSON.comments.filter(ele => ele !== undefined);
                  user.comments = newComments;
                  user.save()
                    .then(user => {

                      Comment.deleteOne({ user: user._id, post: post._id })
                        .then(comment => {
                          return res.send({ user, post, commentId: req.params.id });
                        })
                    })
                })
            })
        })
    })
})

router.post('/vote', (req, res) => {
  const { commentId, userId } = req.body;

  Comment.findOne({ _id: commentId })
    .populate('user')
    .then(comment => {
      User.findOne({ _id: userId })
        .then(user => {
          const newVote = new Vote({
            user: user._id,
            comment: comment._id,
            upvote: req.body.upvote
          });
          newVote.save()
            .then(vote => {
              user.votes.push(vote.id);
              comment.votes.push(vote.id);
              user.save()
                .then(user => {
                  const userJSON = user.toJSON();
                  delete userJSON['password'];
                  delete userJSON['date'];
                  comment.save()
                    .then(comment => {
                      return res.send({ comment, user: userJSON });
                    })
                })
            })
        })
    })
})

router.patch('/vote', (req, res) => {
  const { commentId, userId } = req.body;

  Vote.findOne({ user: userId, comment: commentId })
    .then(vote => {
      vote.upvote = req.body.upvote;
      vote.save()
        .then(vote => {
          Comment.findById(vote.comment)
            .populate('user')
            .then(comment => {
              return res.send(comment)
            })
        })
    })
})


//route that returns all the votes on a comment
router.get('/:id/votes', (req, res) => {
  Vote.find({ comment: req.params.id })
    .then(votes => {
      res.send(votes)
    });
})


module.exports = router;