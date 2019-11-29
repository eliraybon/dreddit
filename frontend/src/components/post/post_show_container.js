import { connect } from 'react-redux';
import PostShow from './post_show';
import { fetchPost } from '../../actions/post_actions';
import { makeComment } from '../../actions/comment_actions';

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.postId;

  return { 
    postId,
    post: state.entities.posts[postId],
    comments: Object.values(state.entities.comments)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: postId => dispatch(fetchPost(postId)),
    makeComment: comment => dispatch(makeComment(comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShow);