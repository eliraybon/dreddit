import axios from 'axios';

export const fetchSubDreddit = (subId) => {
  return axios.get(`/api/subDreddit/${subId}`);
};

export const fetchSubDreddits = () => {
  return axios.get('/api/subDreddits');
}

export const createSubDreddit = data => {
  return axios.post('/api/subDreddits', data);
}