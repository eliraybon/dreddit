const express = require('express');
const router = express.Router();
const Subdreddit = require('../../models/Subdreddit');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const passport = require('passport');
const jwt_decode = require('jwt-decode');

router.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  if (!searchTerm) return res.send([]);

  Subdreddit.find({ title: { $regex: searchTerm, $options: "i" } })
    .then(subs => {
      return res.send(subs);
    })
})

router.get('/user/:userId', (req, res) => {
  let subsObj = {};

  User.findById(req.params.userId)
    .then(user => {
      Subdreddit.find({ _id: { $in: user.subs } })
        .then(subs => {
          subs.forEach(sub => subsObj[sub._id] = sub);
          return res.send(subsObj);
        })
    })
})


router.get("/:id", (req, res) => {
  const postsObj = {};

  const token = req.headers.authorization;
  const currentUser = jwt_decode(token);

  Subdreddit.findById(req.params.id)
    .then(sub => {
      Post.find({ subDreddit: sub._id })
        .populate('user')
        .populate('subDreddit')
        .then(posts => {
          posts.forEach(post => postsObj[post._id] = post);
          User.findById(currentUser.id)
            .then(user => {
              const userJSON = user.toJSON();
              delete userJSON['password'];
              delete userJSON['date'];
              return res.send({ sub, user: userJSON, posts: postsObj });
            })
        })
    })
    .catch(err => res.status(404).json({ missing: 'No SubDreddit found' }))
})


router.get('/', (req, res) => {
  Subdreddit.find({})
    .then(subs => {
      let subsObj = {};
      subs.forEach(sub => subsObj[sub._id] = sub);
      return res.json(subsObj);
    })
})

router.post('/', (req, res) => {
  const newSub = new Subdreddit({
    title: req.body.title,
    description: req.body.description,
    user: req.body.user
  })

  newSub.save()
    .then(sub => {
      User.findById(sub.user.toJSON())
        .then(user => {
          user.subs.push(sub._id);
          user.save()
            .then(user => {
              const userJSON = user.toJSON();
              delete userJSON['password'];
              delete userJSON['date'];
              return res.send({ sub, user: userJSON })
          })
        })
    })
})

router.post('/follow', (req, res) => {
  const { subId, userId } = req.body;

  Subdreddit.findById(subId)
    .then(sub => {

      User.findById(userId)
        .then(user => {
          user.subs.push(sub.id);

          if (sub.user !== userId) sub.followers.push(user.id);
          user.save()
            .then(user => {

              const userJSON = user.toJSON();
              delete userJSON['password'];
              delete userJSON['date'];
              sub.save()
                .then(sub => {
                  return res.send({ sub, user: userJSON });
                })
            })
        })
    })
})

router.delete('/unfollow', (req, res) => {
  const { subId, userId } = req.body;

  Subdreddit.findById(subId)
    .then(sub => {
      User.findById(userId)
        .then(user => {

          const userJSON = user.toJSON();
          const subIdx = userJSON.subs.findIndex(ele => ele.toJSON() === sub._id.toJSON());
          delete userJSON.subs[subIdx];
          const newSubs = userJSON.subs.filter(ele => ele !== undefined);
          user.subs = newSubs;
          delete userJSON['password'];
          delete userJSON['date'];
          user.save()
            .then(user => {
              const subJSON = sub.toJSON();
              const followerIdx = subJSON.followers.findIndex(ele => ele.toJSON() === user._id.toJSON());
              delete subJSON.followers[followerIdx];
              const newFollowers = subJSON.followers.filter(ele => ele !== undefined);
              sub.followers = newFollowers;
              sub.save()
                .then(sub => {
                  return res.send({ sub, user })
                })
            })
        })
    })
})


module.exports = router;