import React from 'react';
import { connect } from 'react-redux';
import PostIndex from '../post/post_index_container';
import { fetchPosts } from '../../actions/post_actions';

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <PostIndex posts={ posts } />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: Object.values(state.entities.posts)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

// export default MainPage;