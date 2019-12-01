import { 
  RECEIVE_POST
} from '../actions/post_actions';
import { 
  RECEIVE_COMMENT, 
  REMOVE_COMMENT,
  RECEIVE_VOTE,
  RECEIVE_UNVOTE,
  RECEIVE_UPDATED_VOTE 
} from '../actions/comment_actions';

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
    case REMOVE_COMMENT:
      const newState = Object.assign({}, state);
      delete newState[action.payload.commentId]
      return newState;
    case RECEIVE_VOTE:
      if (!action.payload.comment) return state;
      return Object.assign(
        {},
        state,
        { [action.payload.comment._id]: action.payload.comment }
      )
    case RECEIVE_UNVOTE:
      if (!action.payload.comment) return state;
      return Object.assign(
        {},
        state,
        { [action.payload.comment._id]: action.payload.comment }
      )
    case RECEIVE_UPDATED_VOTE:
      if (!action.comment) return state;
      return Object.assign({}, state, { [action.comment._id]: action.comment })
    default: 
      return state;
  };
};

export default commentsReducer;