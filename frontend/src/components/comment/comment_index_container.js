import { connect } from 'react-redux';
import CommentIndex from './comment_index';
import { 
  makeReply, 
  voteOnComment,
  removeVote,
  updateVote 
} from '../../actions/comment_actions';  
import { fetchCommentVotes } from '../../util/vote_api_util';

const mapStateToProps = state => {
  return {
    currentUserId: state.session.user.id || state.session.user._id
  };
};

//deleteComment is now being mapped in via the CommentIndexItem container
const mapDispatchToProps = dispatch => {
  return {
    makeReply: comment => dispatch(makeReply(comment)),
    voteOnComment: voteInfo => dispatch(voteOnComment(voteInfo)),
    removeVote: voteInfo => dispatch(removeVote(voteInfo)),
    updateVote: voteInfo => dispatch(updateVote(voteInfo)),
    fetchCommentVotes: commentId => fetchCommentVotes(commentId)
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentIndex);

