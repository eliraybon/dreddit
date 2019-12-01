import * as CommentApiUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

//this will be responded to by the post and user reducers 
const receiveComment = payload => {
  return {
    type: RECEIVE_COMMENT,
    payload
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








