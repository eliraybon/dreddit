import React from 'react';
import CommentIndex from './comment_index_container';
import CommentForm from './create_comment_form_container';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyForm: false
    };

    this.openReplyForm = this.openReplyForm.bind(this);
    this.closeReplyForm = this.closeReplyForm.bind(this);
    this.renderReplyForm = this.renderReplyForm.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
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

  renderDeleteButton() {
    const { comment, currentUserId } = this.props;
    if (comment.user !== currentUserId) return null;
    return <button
      onClick={() => this.props.deleteComment(comment._id)}>
      Delete
    </button>
  }

  render() {
    const { comment } = this.props; 

    return (
      <li>
        {comment.text}
        <button onClick={ this.openReplyForm }>Reply</button>
        {this.renderDeleteButton()}
        {this.renderReplyForm()}
        <CommentIndex 
          comments={ this.props.comments } 
          commentId={ comment._id }
          context="comment"
        />
        <br></br>
      </li>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: commentId => dispatch(deleteComment(commentId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentIndexItem);