import { RECEIVE_SUBDREDDIT, RECEIVE_ALL_SUBDREDDITS } from '../actions/sub_dreddit_actions';

const subDredditReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SUBDREDDIT:
      return Object.assign({}, state, { [action.sub._id]: action.sub})
    case RECEIVE_ALL_SUBDREDDITS:
      return action.subs;
    default:
      return state;
  }
}

export default subDredditReducer;