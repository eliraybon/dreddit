import { 
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_NEW_POST,
  REMOVE_POST,
  RECEIVE_VOTE,
  RECEIVE_UNVOTE,
  RECEIVE_UPDATED_VOTE
} from '../actions/post_actions';
import { RECEIVE_SUBDREDDIT } from '../actions/sub_dreddit_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      return Object.assign(
        {}, 
        state,
        { [action.payload.post._id]: action.payload.post }
      );
    case RECEIVE_NEW_POST:
      return Object.assign(
        {}, 
        state, 
        { [action.payload.post._id]: action.payload.post }
      );
    case RECEIVE_SUBDREDDIT:
      return action.payload.posts;
    case RECEIVE_VOTE:
      return Object.assign(
        {}, 
        state, 
        { [action.payload.post._id]: action.payload.post }
      )
    case RECEIVE_UNVOTE:
      return Object.assign(
        {},
        state,
        { [action.payload.post._id]: action.payload.post }
      )
    case RECEIVE_UPDATED_VOTE:
      return Object.assign({}, state, { [action.post._id]: action.post })
    case REMOVE_POST:
      const newState = Object.assign({}, state);
      delete newState[action.payload.postId]
      return newState;
    case RECEIVE_COMMENT:
      return Object.assign(
        {},
        state,
        { [action.payload.post._id]: action.payload.post }
      )
    case REMOVE_COMMENT:
      return Object.assign(
        {},
        state,
        { [action.payload.post._id]: action.payload.post }
      )
    default: 
      return state;
  }
};

export default postsReducer;