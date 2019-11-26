const express = require('express');
const router = express.Router();
const Subdreddit = require('../../models/Subdreddit');
const Post = require('../../models/Post');
const passport = require('passport');

router.get("/:id", (req, res) => {
  Subdreddit.findById(req.params.id)
    .then(subdreddit => res.json(subdreddit))
    .catch(err => res.status(404).json({ missing: 'No SubDreddit found'}))
})

router.get('/', (req, res) => {
  Subdreddit.find({})
    .then(subs => {
      let subsObj = {};
      subs.forEach(sub => subsObj[sub._id] = sub);
      return res.json(subsObj);
    })
})

module.exports = router;