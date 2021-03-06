const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const SubDreddit = require('../../models/Subdreddit');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    if (!user) {
      errors.username = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get('/:userId', (req, res) => {
  let subsObj = {};
  let postsObj = {};
  let commentsObj = {};

  User.findById(req.params.userId)
    .then(user => {
      SubDreddit.find({ user: user._id.toJSON() })
        .then(subs => {
          Post.find({ user: user._id.toJSON() })
            .populate('user')
            .populate('subDreddit')
            .then(posts => {
              Comment.find({ user: user._id.toJSON() })
                .then(comments => {
                  subs.forEach(sub => subsObj[sub._id] = sub);
                  posts.forEach(post => postsObj[post._id] = post);
                  comments.forEach(comment => commentsObj[comment._id] = comment);

                  return res.send({ 
                    user, 
                    subs: subsObj, 
                    posts: postsObj, 
                    comments: commentsObj
                  })
                })
            })
        })
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
  });
})

module.exports = router;

