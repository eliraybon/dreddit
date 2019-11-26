import { connect } from 'react-redux';
import SubDredditForm from './subdreddit_form';
import { createSubDreddit } from '../../actions/sub_dreddit_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    sub: { title: '', description: '' },
    formType: 'Create'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSubDreddit: sub => dispatch(createSubDreddit(sub))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubDredditForm));