import { connect } from 'react-redux';
import PostIndex from './post_index';
import { withRouter } from 'react-router-dom';
import { 
  voteOnPost, 
  removeVote,
  updateVote,
  deletePost 
} from '../../actions/post_actions';
import { fetchPostVotes } from '../../util/vote_api_util';

const mapStateToProps = state => {
  let currentUserId;
  if (state.session.user) {
    currentUserId = state.session.user.id || state.session.user._id
  }
  
  return {
    posts: Object.values(state.entities.posts),
    currentUserId//: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voteOnPost: voteInfo => dispatch(voteOnPost(voteInfo)),
    removeVote: voteInfo => dispatch(removeVote(voteInfo)),
    updateVote: voteInfo => dispatch(updateVote(voteInfo)),
    fetchPostVotes: postId => fetchPostVotes(postId),
    deletePost: postId => dispatch(deletePost(postId))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex));