import { connect } from 'react-redux';
import SubDredditIndex from './subdreddit_index';
//will need actions to follow and unfollow a sub

// const mapStateToProps = state => {
//   return {
//     currentUserId = state.session.user.id || state.session.user._id
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     followSub: subId => dispatch(followSub(subId)),
//     unfollowSub: subId => dispatch(unfollowSub(subId))
//   };
// };

export default connect(
  null,
  null
)(SubDredditIndex);


