import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN
} from '../actions/session_actions';

//do we need a users reducer for this?
import { RECEIVE_NEW_SUBDREDDIT } from '../actions/sub_dreddit_actions';
import { RECEIVE_NEW_POST } from '../actions/post_actions';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  let newState;
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
        // isSignedIn: true,
        isAuthenticated: true
      }
    case RECEIVE_NEW_SUBDREDDIT:
      newState = Object.assign({}, state);
      newState['user'] = action.payload.user;
      return newState;
    case RECEIVE_NEW_POST:
      newState = Object.assign({}, state);
      newState['user'] = action.payload.user;
      return newState;
    default:
      return state;
  }
}