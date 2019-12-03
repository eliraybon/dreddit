import * as PostAPIUtil from "./../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";
export const RECEIVE_VOTE = "RECEIVE_VOTE";
export const RECEIVE_UNVOTE = "RECEIVE_UNVOTE";
export const RECEIVE_UPDATED_VOTE = "RECEIVE_UPDATED_VOTE";
export const REMOVE_POST = "REMOVE_POST";

const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

const receiveNewPost = payload => {
  return {
    type: RECEIVE_NEW_POST,
    payload
  };
};

const receivePost = payload => {
  return {
    type: RECEIVE_POST,
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
  }
}

const removePost = payload => {
  return {
    type: REMOVE_POST,
    payload
  };
};

export const fetchPosts = () => dispatch => {
  return PostAPIUtil.fetchPosts()
    .then(res => dispatch(receivePosts(res.data)));
};

export const fetchPost = postId => dispatch => {
  return PostAPIUtil.fetchPost(postId)
    .then(res => dispatch(receivePost(res.data)));
}

export const createPost = post => dispatch => {
  return PostAPIUtil.createPost(post)
    .then(res => dispatch(receiveNewPost(res.data)));
};

export const deletePost = postId => dispatch => {
  return PostAPIUtil.deletePost(postId)
    .then(res => dispatch(removePost(res.data)));
}

export const voteOnPost = voteInfo => dispatch => {
  return PostAPIUtil.voteOnPost(voteInfo)
    .then(res => dispatch(receiveVote(res.data)));
};

export const removeVote = voteInfo => dispatch => {
  return PostAPIUtil.removeVote(voteInfo)
    .then(res => {
      dispatch(receiveUnvote(res.data))
    });
}

export const updateVote = voteInfo => dispatch => {
  return PostAPIUtil.updateVote(voteInfo)
    .then(res => dispatch(receiveUpdatedVote(res.data)));
}





