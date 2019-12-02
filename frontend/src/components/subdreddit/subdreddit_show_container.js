import { connect } from 'react-redux';
import SubDredditShow from './subdreddit_show';
import { 
  fetchSubDreddit,
  followSub,
  unfollowSub 
} from '../../actions/sub_dreddit_actions';

const mapStateToProps = (state, ownProps) => {
  const subId = ownProps.match.params.subId
  return {
    subId,
    sub: state.entities.subs[subId],
    posts: Object.values(state.entities.posts),
    currentUserId: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSubDreddit: subId => dispatch(fetchSubDreddit(subId)),
    followSub: followInfo => dispatch(followSub(followInfo)),
    unfollowSub: followInfo => dispatch(unfollowSub(followInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubDredditShow);