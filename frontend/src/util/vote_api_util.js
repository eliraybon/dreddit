import axios from 'axios';

export const fetchPostVotes = postId => {
  return axios.get(`/api/posts/${postId}/votes`);
};


