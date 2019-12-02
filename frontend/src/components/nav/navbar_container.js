import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { fetchUserSubs } from '../../actions/session_actions';

import NavBar from './navbar';

const mapStateToProps = state => {
  let currentUserId;
  if (state.session.user) {
    currentUserId = state.session.user.id || state.session.user._id
  }

  return {
    loggedIn: state.session.isAuthenticated,
    userSubs: Object.values(state.session.userSubs),
    currentUserId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchUserSubs: userId => dispatch(fetchUserSubs(userId))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar));

// export default withRouter(connect(
//   mapStateToProps,
//   { logout }
// )(NavBar));