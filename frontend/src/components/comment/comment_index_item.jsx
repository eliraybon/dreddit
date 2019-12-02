import React from 'react';
import CommentIndex from './comment_index_container';
import CommentForm from './create_comment_form_container';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';
import { fetchCommentVotes } from '../../util/vote_api_util';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyForm: false,
      votes: 0,
      upvoted: false,
      downvoted: false,
      isCounted: false 
    };

    this.openReplyForm = this.openReplyForm.bind(this);
    this.closeReplyForm = this.closeReplyForm.bind(this);
    this.renderReplyForm = this.renderReplyForm.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.countVotes = this.countVotes.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.removeVote = this.removeVote.bind(this);
  }

  componentDidMount() {
    this.countVotes();
  }

  componentDidUpdate() {
    this.countVotes();
  }

  countVotes() {
    if (this.state.isCounted) return;

    let count = 0;
    let upvoted = false;
    let downvoted = false;

    this.props.fetchCommentVotes(this.props.comment._id)
      .then(res => {
        const votes = Object.values(res.data);
        votes.forEach(vote => {
          (vote.upvote) ? count += 1 : count -= 1;

          if (vote.user === this.props.currentUserId) {
            if (vote.upvote) upvoted = true;
            if (!vote.upvote) downvoted = true;
          }

        });

        if (this.state.votes !== count) {
          this.setState({ votes: count, upvoted, downvoted })
        }
      })
  }

  upvote() {
    const commentId = this.props.comment._id;
    const userId = this.props.currentUserId;
    const upvote = true;

    if (this.state.upvoted || this.state.downvoted) {
      this.props.updateVote({ commentId, userId, upvote });
        // .then(() => {
        //   this.setState({ upvoted: upvote, downvoted: !upvote, isCounted: false })
        // })
    } else {
      this.props.voteOnComment({ commentId, userId, upvote })
        .then(this.setState({ upvoted: true, downvoted: false, isCounted: false }))
    }
  }

  downvote() {
    const commentId = this.props.comment._id;
    const userId = this.props.currentUserId;
    const upvote = false;

    if (this.state.upvoted || this.state.downvoted) {
      this.props.updateVote({ commentId, userId, upvote });
    } else {
      this.props.voteOnComment({ commentId, userId, upvote })
        .then(this.setState({ upvoted: false, downvoted: true, isCounted: false }))
    }
  }

  removeVote() {
    const userId = this.props.currentUserId;
    const commentId = this.props.comment._id;

    this.props.removeVote({ userId, commentId });
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
        {this.state.votes}
        <button onClick={this.upvote}>Upvote</button>
        <button onClick={this.downvote}>Downvote</button>
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
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    fetchCommentVotes: commentId => fetchCommentVotes(commentId)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentIndexItem);