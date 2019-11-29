import React from 'react';
import PostIndexItem from './post_index_item';

export default class PostIndex extends React.Component {
  render() {
    const { 
      posts, 
      voteOnPost,
      removeVote,
      updateVote, 
      fetchPostVotes, 
      currentUserId,
      deletePost 
    } = this.props;
    
    if (!posts.length) return null;

    return (
      <ul className="post-index">
        {posts.map(post => {
          return <PostIndexItem 
            post={ post } 
            currentUserId={ currentUserId }
            voteOnPost={ voteOnPost }
            removeVote={ removeVote }
            updateVote={ updateVote }
            fetchPostVotes={ fetchPostVotes }
            deletePost={ deletePost }
            key={ post._id } 
          />
        })}
      </ul>
    )
  }
}