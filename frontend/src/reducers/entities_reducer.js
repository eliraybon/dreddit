import { combineReducers } from 'redux';
import postsReducer from './posts_reducer';
import subDredditReducer from './sub_dreddit_reducer';

export default combineReducers({
  posts: postsReducer,
  subs: subDredditReducer
});

