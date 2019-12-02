import * as CommentApiUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const RECEIVE_VOTE = "RECEIVE_VOTE";
export const RECEIVE_UNVOTE = "RECEIVE_UNVOTE";
export const RECEIVE_UPDATED_VOTE = "RECEIVE_UPDATED_VOTE";

//this will be responded to by the post and user reducers 
const receiveComment = payload => {
  return {
    type: RECEIVE_COMMENT,
    payload
  };
};

const receiveVote = payload => {
  return {
    type: RECEIVE_VOTE,
    payload
  };
};

const receiveUnvote = payload => {
  return {
    type: RECEIVE_UNVOTE,
    payload
  };
};

const receiveUpdatedVote = post => {
  return {
    type: RECEIVE_UPDATED_VOTE,
    post
  };
};

const removeComment = payload => {
  return {
    type: REMOVE_COMMENT,
    payload
  };
};

export const makeComment = comment => dispatch => {
  return CommentApiUtil.makeComment(comment)
    .then(res => dispatch(receiveComment(res.data)));
};

export const makeReply = reply => dispatch => {
  return CommentApiUtil.makeReply(reply)
    .then(res => dispatch(receiveComment(res.data)));
};

export const deleteComment = commentId => dispatch => {
  return CommentApiUtil.deleteComment(commentId)
    .then(res => dispatch(removeComment(res.data)));
};

export const voteOnComment = voteInfo => dispatch => {
  return CommentApiUtil.voteOnComment(voteInfo)
    .then(res => dispatch(receiveVote(res.data)));
};

export const removeVote = voteInfo => dispatch => {
  return CommentApiUtil.removeVote(voteInfo)
    .then(res => dispatch(receiveUnvote(res.data)));
}

export const updateVote = voteInfo => dispatch => {
  return CommentApiUtil.updateVote(voteInfo)
    .then(res => dispatch(receiveUpdatedVote(res.data)));
}








