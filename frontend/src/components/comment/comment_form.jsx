import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.comment.text,
      user: this.props.currentUserId,
      post: this.props.postId,
      comment: this.props.commentId || ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.commentId) {
      this.props.makeReply(this.state);
    } else { 
      this.props.makeComment(this.state);
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    let buttonText = (this.props.commentId) ? "reply" : "comment";

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea 
            value={this.state.text}
            placeholder="What are your thoughts?"
            onChange={this.update('text')}
          />
  
          <button>{buttonText}</button>
        </form>
      </div>
    )
  }
}