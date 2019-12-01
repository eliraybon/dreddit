import React from 'react';
import CommentIndex from './comment_index_container';
import CommentForm from './create_comment_form_container';

export default class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyForm: false
    };

    this.openReplyForm = this.openReplyForm.bind(this);
    this.closeReplyForm = this.closeReplyForm.bind(this);
    this.renderReplyForm = this.renderReplyForm.bind(this);
  }

  openReplyForm() {
    this.setState({ replyForm: true });
  }

  closeReplyForm() {
    this.setState({ replyForm: false });
  }

  renderReplyForm() {
    const { comment } = this.props; 
    const commentId = comment._id;
    const closeReplyForm = this.closeReplyForm;

    if (this.state.replyForm) {
      return (
        <CommentForm 
          postId={ comment.post } 
          commentId={ commentId } 
          closeReplyForm={ closeReplyForm }
        />
      )
    } else {
      return null;
    }
  } 

  render() {
    const { comment } = this.props; 

    return (
      <li>
        {comment.text}
        <CommentIndex 
          comments={ this.props.comments } 
          commentId={ comment._id }
          context="comment"
        />
        <button onClick={ this.openReplyForm }>Reply</button>
        {this.renderReplyForm()}
        <br></br>
      </li>
    )
  }
}