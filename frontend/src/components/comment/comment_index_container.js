import { connect } from 'react-redux';
import CommentIndex from './comment_index';
import { makeReply } from '../../actions/comment_actions';  

const mapStateToProps = state => {
  return {
    currentUserId: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeReply: comment => dispatch(makeReply(comment)) 
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentIndex);

