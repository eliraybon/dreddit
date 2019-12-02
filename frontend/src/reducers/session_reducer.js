import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
  RECEIVE_USER_SUBS
} from '../actions/session_actions';

import { 
  RECEIVE_NEW_SUBDREDDIT,
  RECEIVE_FOLLOW, 
  RECEIVE_UNFOLLOW 
} from '../actions/sub_dreddit_actions';


const initialState = {
  isAuthenticated: false,
  user: {},
  userSubs: {}
};

export default function (state = initialState, action) {
  // debugger;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isAuthenticated: true
      }
    case RECEIVE_USER_SUBS:
      return {
        ...state,
        userSubs: action.subs
      }
    case RECEIVE_NEW_SUBDREDDIT:
      return {
        ...state, 
        subs: Object.assign(
          {},
          state.subs, 
          { [action.payload.sub._id]: action.payload.sub }
        )
      }
    case RECEIVE_FOLLOW:
      return {
        ...state,
        subs: Object.assign(
          {},
          state.subs,
          { [action.payload.sub._id]: action.payload.sub }
        )
      }
    case RECEIVE_UNFOLLOW:
      return {
        ...state,
        subs: Object.assign(
          {},
          state.subs,
          { [action.payload.sub._id]: action.payload.sub }
        )
      }
    default:
      return state;
  }
}