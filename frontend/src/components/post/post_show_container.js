import { connect } from 'react-redux';
import PostShow from './post_show';
import { 
  fetchPost,
  voteOnPost,
  removeVote,
  updateVote,
  deletePost 
} from '../../actions/post_actions';
import { makeComment } from '../../actions/comment_actions';
import { fetchPostVotes } from '../../util/vote_api_util';

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.postId;

  return { 
    postId,
    post: state.entities.posts[postId],
    comments: Object.values(state.entities.comments),
    currentUserId: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: postId => dispatch(fetchPost(postId)),
    makeComment: comment => dispatch(makeComment(comment)),
    voteOnPost: voteInfo => dispatch(voteOnPost(voteInfo)),
    removeVote: voteInfo => dispatch(removeVote(voteInfo)),
    updateVote: voteInfo => dispatch(updateVote(voteInfo)),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchPostVotes: postId => fetchPostVotes(postId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);