import * as SearchApiUtil from '../util/search_api_util';

export const UPDATE_SEARCH = "UPDATE_SEARCH";

const updateSearch = subDreddits => {
  return {
    type: UPDATE_SEARCH,
    subDreddits
  };
};

export const updateSearchTerm = searchTerm => dispatch => {
  return SearchApiUtil.updateSearch(searchTerm)
    .then(res => dispatch(updateSearch(res.data)));
};



