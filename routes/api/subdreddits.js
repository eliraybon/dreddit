const express = require('express');
const router = express.Router();
const Subdreddit = require('../../models/Subdreddit');
const Post = require('../../models/Post');
const passport = require('passport');

// router.get("/:id", (req, res) => {
//   Subdreddit.findById(req.params.id)
//     .then(subdreddit => res.json(subdreddit))
//     .catch(err => res.status(404).json({ missing: 'No SubDreddit found'}))
// })

router.get("/:id", (req, res) => {
  const postsObj = {};
  const subsObj = {};

  Subdreddit.findById(req.params.id)
    .then(sub => {
      subsObj[sub._id] = sub;
      Post.find({ subDreddit: sub._id })
        .then(posts => {
          posts.forEach(post => postsObj[post._id] = post);
          return res.send({ subs: subsObj, posts: postsObj });
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
  debugger;
  const newSub = new Subdreddit({
    title: req.body.title,
    description: req.body.description
  })

  newSub.save()
    .then(sub => res.send(sub))
})

module.exports = router;