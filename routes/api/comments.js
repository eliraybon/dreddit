const express = require("express");
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const Vote = require('../../models/Vote');
const passport = require('passport');
const jwt_decode = require('jwt-decode');

//maybe handle creating a post comment and a comment comment in different routes
//make sure to relax when you're typing. It's better.
router.post('/', (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;


})

router.post('/reply', (req, res) => {
  const userId = req.body.userId;
  const commentId = req.body.commentId;


})

router.delete('/:commentId', (req, res) => {
  
})