import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_SUBDREDDIT, RECEIVE_NEW_SUBDREDDIT } from '../actions/sub_dreddit_actions';
import { 
  RECEIVE_NEW_POST, 
  RECEIVE_VOTE,
  RECEIVE_UNVOTE 
} from '../actions/post_actions';


const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(
        {}, 
        state, 
        { [action.currentUser.id]: action.currentUser }
      )
    case RECEIVE_SUBDREDDIT:
      return Object.assign(
        {},
        state,
        { [action.payload.user._id]: action.payload.user }
      )
    case RECEIVE_NEW_SUBDREDDIT:
      return Object.assign(
        {},
        state,
        { [action.payload.user._id]: action.payload.user }
      )
    case RECEIVE_NEW_POST:
      return Object.assign(
        {},
        state,
        { [action.payload.user._id]: action.payload.user }
      )
    case RECEIVE_VOTE:
      return Object.assign(
        {},
        state,
        { [action.payload.user._id]: action.payload.user }
      )
    case RECEIVE_UNVOTE:
      return Object.assign(
        {},
        state,
        { [action.payload.user._id]: action.payload.user }
      )
    default: 
      return state;
  }
}

export default usersReducer;