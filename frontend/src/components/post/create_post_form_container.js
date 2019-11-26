import { connect } from 'react-redux';
import PostForm from './post_form';
import { createPost } from '../../actions/post_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    post: { title: '', text: '' },
    formType: 'Create',
    currentUserId: state.session.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: post => dispatch(createPost(post))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm));



