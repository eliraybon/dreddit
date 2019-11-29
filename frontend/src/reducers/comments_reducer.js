import { 
  RECEIVE_POST
} from '../actions/post_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, action.payload.comments);
    case RECEIVE_COMMENT:
      return Object.assign(
        {},
        state,
        { [action.payload.comment._id]: action.payload.comment }
      )
    case RECEIVE_USER:
      return action.payload.comments;
    default: 
      return state;
  };
};

export default commentsReducer;