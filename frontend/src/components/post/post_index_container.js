import { connect } from 'react-redux';
import PostIndex from './post_index';
import { upvotePost } from '../../actions/post_actions';
import { fetchPostVotes } from '../../util/vote_api_util';

const mapStateToProps = state => {
  return {
    posts: Object.values(state.entities.posts),
    currentUserId: state.session.user.id || state.session.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    upvotePost: upvoteInfo => dispatch(upvotePost(upvoteInfo)),
    fetchPostVotes: postId => fetchPostVotes(postId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);