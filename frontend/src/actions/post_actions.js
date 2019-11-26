import * as PostAPIUtil from "./../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";

const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

export const fetchPosts = () => dispatch => {
  return PostAPIUtil.fetchPosts()
    .then(res => dispatch(receivePosts(res.data)));
};

