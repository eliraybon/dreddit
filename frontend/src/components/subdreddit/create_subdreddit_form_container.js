import { connect } from 'react-redux';
import SubRedditForm from './subreddit_form';
import { createSubreddit } from '../../actions/sub_dreddit_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    sub: { title: '', description: '' },
    formType: 'Create'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSubreddit: sub => dispatch(createSubreddit(sub))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubRedditForm));