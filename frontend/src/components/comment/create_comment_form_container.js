import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { makeComment, makeReply } from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    comment: { text: '', contentUrl: '' },
    currentUserId: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeComment: comment => dispatch(makeComment(comment)),
    makeReply: reply => dispatch(makeReply(reply))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm));