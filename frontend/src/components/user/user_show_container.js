import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  return {
    userId, 
    user: state.entities.users[userId],
    subs: Object.values(state.entities.subs),
    posts: Object.values(state.entities.posts),
    comments: Object.values(state.entities.comments),
    currentUserId: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);

