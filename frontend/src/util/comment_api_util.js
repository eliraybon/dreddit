import axios from 'axios';

export const makeComment = comment => {
  return axios.post('/api/comments', comment);
};

export const makeReply = reply => {
  return axios.post(`/api/comments/${reply.comment}/reply`, reply);
};