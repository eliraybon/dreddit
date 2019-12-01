import * as APIUtil from '../util/sub_dreddit_util';

export const RECEIVE_SUBDREDDIT = 'RECEIVE_SUBDREDDIT';
export const RECEIVE_ALL_SUBDREDDITS = 'RECEIVE_ALL_SUBDREDDITS';
export const RECEIVE_NEW_SUBDREDDIT = "CREATE_SUBDREDDIT";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const RECEIVE_UNFOLLOW = "RECEIVE_UNFOLLOW";


const receiveSubdreddit = payload => {
  return {
    type: RECEIVE_SUBDREDDIT,
    payload
  }
}

const receiveNewSubDreddit = payload => {
  return {
    type: RECEIVE_NEW_SUBDREDDIT,
    payload
  };
};

const receiveAllSubdreddits = (subs) => {
  return {
    type: RECEIVE_ALL_SUBDREDDITS,
    subs
  };
};

const receiveFollow = payload => {
  return {
    type: RECEIVE_FOLLOW,
    payload
  };
};

const receiveUnfollow = payload => {
  return {
    type: RECEIVE_UNFOLLOW,
    payload
  };
};


export const fetchSubDreddit = (subId) => dispatch => {
  return APIUtil.fetchSubDreddit(subId)
    .then( (res) => dispatch(receiveSubdreddit(res.data)));
}

export const fetchSubDreddits = () => dispatch => {
  return APIUtil.fetchSubDreddits()
    .then( (subs) => dispatch(receiveAllSubdreddits(subs)));
}

export const createSubDreddit = (sub) => dispatch => {
  return APIUtil.createSubDreddit(sub)
    .then( (res => dispatch(receiveNewSubDreddit(res.data))))
}

export const followSub = followInfo => dispatch => {
  return APIUtil.followSub(followInfo)
    .then(res => dispatch(receiveFollow(res.data)));
};

export const unfollowSub = followInfo => dispatch => {
  return APIUtil.unfollowSub(followInfo)
    .then(res => dispatch(receiveUnfollow(res.data)));
};