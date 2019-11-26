import { connect } from 'react-redux';
import SubDredditShow from './subdreddit_show';
import { fetchSubDreddit } from '../../actions/sub_dreddit_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    sub: state.entities.sub[ownProps.match.params.subId]
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