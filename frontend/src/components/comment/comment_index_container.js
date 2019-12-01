import { connect } from 'react-redux';
import CommentIndex from './comment_index';
import { makeReply, deleteComment } from '../../actions/comment_actions';  

const mapStateToProps = state => {
  return {
    currentUserId: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeReply: comment => dispatch(makeReply(comment)),
    // deleteComment: commentId => dispatch(deleteComment(commentId)) 
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentIndex);

