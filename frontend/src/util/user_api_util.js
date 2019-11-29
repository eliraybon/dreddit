import axios from 'axios';

export const fetchUser = userId => {
  return axios.get(`/api/users/${userId}`);
};



