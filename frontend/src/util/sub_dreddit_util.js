import axios from 'axios';

export const fetchSubDreddit = (subId) => {
  return axios.get(`/api/subDreddits/${subId}`);
};

export const fetchSubDreddits = () => {
  return axios.get('/api/subDreddits');
};

export const createSubDreddit = data => {
  return axios.post('/api/subDreddits', data);
};

export const followSub = followInfo => {
  return axios.post('/api/subDreddits/follow', followInfo);
};

export const unfollowSub = followInfo => {
  return axios.delete('/api/subDreddits/unfollow', { data: followInfo });
};

// export const fetchUserSubs = userId => {
//   return axios.get(`/api/subDreddits/user/${userId}`);
// };