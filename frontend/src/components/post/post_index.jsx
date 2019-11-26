import React from 'react';
import PostIndexItem from './post_index_item';

export default class PostIndex extends React.Component {
  render() {
    const { posts } = this.props;
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