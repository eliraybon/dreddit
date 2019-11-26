const express = require("express");
const router = express.Router();
const Vote = require('../../models/Vote');
const passport = require('passport');
// const jwt_decode = require('jwt-decode');

router.post('/upvote', (req, res) => {
  
})

router.post('/downvote', (req, res) => {

})

router.delete('/upvote/:voteId', (req, res) => {

})

router.delete('/downvote/:voteId', (req, res) => {

})

module.exports = router;