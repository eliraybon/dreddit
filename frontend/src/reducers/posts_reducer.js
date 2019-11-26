import { 
  RECEIVE_POSTS,
  RECEIVE_POST 
} from '../actions/post_actions';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      return Object.assign({}, state, { [action.post._id]: action.post });
    default: 
      return state;
  }
};

export default postsReducer;