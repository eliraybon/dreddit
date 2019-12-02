import axios from 'axios';

export const updateSearch = searchTerm => {
  return axios.post('/api/subDreddits/search', { searchTerm });
};

