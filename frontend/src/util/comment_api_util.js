import axios from 'axios';

export const makeComment = comment => {
  return axios.post('/api/comments', comment);
};

export const makeReply = reply => {
  return axios.post(`/api/comments/${reply.comment}/reply`, reply);
};

export const deleteComment = commentId => {
  return axios.delete(`/api/comments/${commentId}`);
};

export const voteOnComment = voteInfo => {
  return axios.post('/api/comments/vote', voteInfo);
};

export const removeVote = voteInfo => {
  return axios.delete('/api/comments/vote', { data: voteInfo });
}

export const updateVote = voteInfo => {
  return axios.patch('/api/comments/vote', voteInfo);
}


