import { connect } from 'react-redux';
import SubDredditShow from './subdreddit_show';
import { fetchSubDreddit } from '../../actions/sub_dreddit_actions';

const mapStateToProps = (state, ownProps) => {
  const subId = ownProps.match.params.subId
  return {
    subId,
    sub: state.entities.subs[subId],
    posts: Object.values(state.entities.posts)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSubDreddit: subId => dispatch(fetchSubDreddit(subId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubDredditShow);