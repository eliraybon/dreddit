import React from 'react';
import CommentIndexItem from './comment_index_item';

export default class CommentIndex extends React.Component {
  render() {
    if (this.props.context === "post") {
      return (
        <ul className="comment-index">
          {this.props.comments.map(comment => {
            if (!comment.comment) {
              return <CommentIndexItem
                comment={ comment }
                comments={ this.props.comments }
                currentUserId={ this.props.currentUserId }
                makeReply ={ this.props.makeReply }
                deleteComment={ this.props.deleteComment }
                key={ comment._id } 
              />
            } else {
              return null;
            }
          })}
        </ul>
      )
    } else if (this.props.context === "comment") {
      return (
        <ul className="comment-index">
          {this.props.comments.map(comment => {
            if (comment.comment === this.props.commentId) {
              return <CommentIndexItem
                comment={ comment }
                comments={ this.props.comments }
                currentUserId={ this.props.currentUserId }
                makeReply={ this.props.makeReply }
                key={ comment._id }
              />
            } else {
              return null;
            }
          })}
        </ul>
      )
    }
  }
}