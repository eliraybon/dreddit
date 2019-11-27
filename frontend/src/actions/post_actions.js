import * as PostAPIUtil from "./../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";
export const RECEIVE_UPVOTE_POST = "UPVOTE_POST";

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

const receiveUpvotePost = payload => {
  return {
    type: RECEIVE_UPVOTE_POST,
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

export const upvotePost = upvoteInfo => dispatch => {
  return PostAPIUtil.upvotePost(upvoteInfo)
    .then(res => dispatch(receiveUpvotePost(res.data)));
};





