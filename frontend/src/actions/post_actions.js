import * as PostAPIUtil from "./../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";
export const RECEIVE_VOTE = "RECEIVE_VOTE";
export const RECEIVE_UNVOTE = "RECEIVE_UNVOTE";

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

const receivePost = post => {
  return {
    type: RECEIVE_POST,
    post
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

export const fetchPosts = () => dispatch => {
  return PostAPIUtil.fetchPosts()
    .then(res => dispatch(receivePosts(res.data)));
};

// export const fetchSubDredditPosts = subId => dispatch => {
//   return PostAPIUtil.fetchSubDredditPosts(subId)
//     .then(res => dispatch(receivePosts(res.data)));
// }

export const fetchPost = postId => dispatch => {
  return PostAPIUtil.fetchPost(postId)
    .then(res => dispatch(receivePost(res.data)));
}

export const createPost = post => dispatch => {
  return PostAPIUtil.createPost(post)
    .then(res => dispatch(receiveNewPost(res.data)));
};

export const voteOnPost = voteInfo => dispatch => {
  return PostAPIUtil.voteOnPost(voteInfo)
    .then(res => dispatch(receiveVote(res.data)));
};

export const removeVote = voteInfo => dispatch => {
  return PostAPIUtil.removeVote(voteInfo)
    .then(res => dispatch(receiveUnvote(res.data)));
}





