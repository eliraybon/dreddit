import React from 'react';
import CommentIndexItem from './comment_index_item';

export default class CommentIndex extends React.Component {
  render() {
    return (
      <ul className="comment-index">
        {this.props.comments.map(comment => {
          return <CommentIndexItem 
            comment={ comment }
            key={ comment._id }
          />
        })}
      </ul>
    )
  }
}