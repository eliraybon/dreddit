import React from 'react';
import PostIndexItem from './post_index_item';

export default class PostIndex extends React.Component {
  componentDidMount() {
    //I think in actuality, the post index will be passed props instead of 
    //fetching them
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    debugger;
    //get rid of this later
    if (!posts.length) return null;

    return (
      <ul className="post-index">
        {posts.map(post => {
          return <PostIndexItem post={ post } key={ post._id } />
        })}
      </ul>
    )
  }
}