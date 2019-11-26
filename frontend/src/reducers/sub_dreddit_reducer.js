import { RECEIVE_SUBDREDDIT, RECEIVE_ALL_SUBDREDDITS } from '../actions/sub_dreddit_actions';

const subDredditReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SUBDREDDIT:
      return action.subs
    case RECEIVE_ALL_SUBDREDDITS:
      return Object.assign({}, state, { [action.sub._id]: action.sub});
    default:
      return state;
  }
}

export default subDredditReducer;