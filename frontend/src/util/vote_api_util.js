import axios from 'axios';

export const fetchPostVotes = postId => {
  return axios.get(`/api/posts/${postId}/votes`);
};

export const fetchCommentVotes = commentId => {
  return axios.get(`/api/comments/${commentId}/votes`);
}

