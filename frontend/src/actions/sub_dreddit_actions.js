import * as APIUtil from '../util/sub_dreddit_util';

export const RECEIVE_SUBDREDDIT = 'RECEIVE_SUBDREDDIT';
export const RECEIVE_ALL_SUBDREDDITS = 'RECEIVE_ALL_SUBDREDDITS';

const receiveSubdreddit = (sub) => {
  return {
    type: RECEIVE_SUBDREDDIT,
    sub
  }
}

const receiveAllSubdreddits = (subs) => {
  return {
    type: RECEIVE_ALL_SUBDREDDITS,
    subs
  }
}

export const fetchSubDreddit = (subId) => dispatch => {
  return APIUtil.fetchSubDreddit(subId)
    .then( (sub) => dispatch(receiveSubdreddit(sub)));
}

export const fetchSubDreddits = () => dispatch => {
  return APIUtil.fetchSubDreddits()
    .then( (subs) => dispatch(receiveAllSubdreddits(subs)));
}