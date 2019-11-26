import React from 'react';
import { Link } from 'react-router-dom';

export default class PostIndexItem extends React.Component {
  //you will need state to hover over upvote/downvote
  //you will need to pass multiple functions to these items 

  render() {
    const { post } = this.props;

    return (
      <li>  
        <Link to={`/posts/${post._id}`}>
          {post.title}
        </Link>
      </li>
    )
  }
}