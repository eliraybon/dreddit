import { 
  RECEIVE_SUBDREDDIT, 
  RECEIVE_ALL_SUBDREDDITS,
  RECEIVE_NEW_SUBDREDDIT 
} from '../actions/sub_dreddit_actions';

const subDredditReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SUBDREDDIT:
      return Object.assign(
        {}, 
        state,
        { [action.payload.sub._id]: action.payload.sub }
      )
    case RECEIVE_ALL_SUBDREDDITS:
      return action.subs;
    case RECEIVE_NEW_SUBDREDDIT:
      return Object.assign(
        {}, 
        state, 
        { [action.payload.sub._id]: action.payload.sub }
      )
    default:
      return state;
  }
}

export default subDredditReducer;