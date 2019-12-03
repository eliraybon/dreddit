import React from 'react';
import CommentIndex from './comment_index_container';
import CommentForm from './create_comment_form_container';
import { connect } from 'react-redux';
import {
  makeReply,
  voteOnComment,
  removeVote,
  updateVote,
  deleteComment
} from '../../actions/comment_actions';  
import { fetchCommentVotes } from '../../util/vote_api_util';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyForm: false,
      votes: 0,
      upvoted: false,
      downvoted: false,
      isCounted: false,
      upHover: false, 
      downHover: false  
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

    this.props.removeVote({ userId, commentId })
      .then(() => {
        this.setState({ upHover: false, downHover: false })
      })
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
    if ((comment.user._id || comment.user) !== currentUserId) return null;
    return <div className='comment-remove'>
      <div className='comment-remove-image'></div>
      <button
        onClick={() => this.props.deleteComment(comment._id)}>
        Delete
      </button>
    </div>
  }

  enterUp = () => {
    this.setState({ upHover: true });
  }

  leaveUp = () => {
    this.setState({ upHover: false });
  }

  renderUpArrow = () => {
    if (this.state.upvoted && !this.state.upHover) {
      return (
        <img
          className="up-arrow"
          onClick={this.removeVote}
          onMouseOver={this.enterUp}
          onMouseOut={this.leaveUp}
          src="assets/images/comment_arrows/upvote.png"
          width="17px"
          height="18px"
        />
      )
    } else if (this.state.upvoted && this.state.upHover) {
      return (
        <img
          className="up-arrow"
          onClick={this.removeVote}
          onMouseOver={this.enterUp}
          onMouseOut={this.leaveUp}
          src="assets/images/comment_arrows/upvote.png"
          width="17px"
          height="18px"
        />
      )
    } else if (!this.state.upvoted && !this.state.upHover) {
      return (
        <img
          className="up-arrow"
          onClick={this.upvote}
          onMouseOver={this.enterUp}
          onMouseOut={this.leaveUp}
          src="assets/images/comment_arrows/up.png"
          width="17px"
          height="18px"
        />
      )
    } else if (!this.state.upvoted && this.state.upHover) {
      return (
        <img
          className="up-arrow"
          onClick={this.upvote}
          onMouseOver={this.enterUp}
          onMouseOut={this.leaveUp}
          src="assets/images/comment_arrows/upvote.png"
          width="17px"
          height="18px"
        />
      )
    }
  }

  enterDown = () => {
    this.setState({ downHover: true });
  }

  leaveDown = () => {
    this.setState({ downHover: false });
  }

  renderDownArrow = () => {
    if (this.state.downvoted && !this.state.downHover) {
      return (
        <img
          className="down-arrow"
          onClick={this.removeVote}
          onMouseOver={this.enterDown}
          onMouseOut={this.leaveDown}
          src="assets/images/comment_arrows/downvote.png"
          width="17px"
          height="18px"
        />
      )
    } else if (this.state.downvoted && this.state.downHover) {
      return (
        <img
          className="down-arrow"
          onClick={this.removeVote}
          onMouseOver={this.enterDown}
          onMouseOut={this.leaveDown}
          src="assets/images/comment_arrows/downvote.png"
          width="17px"
          height="18px"
        />
      )
    } else if (!this.state.downvoted && !this.state.downHover) {
      return (
        <img
          className="down-arrow"
          onClick={this.downvote}
          onMouseOver={this.enterDown}
          onMouseOut={this.leaveDown}
          src="assets/images/comment_arrows/down.png"
          width="17px"
          height="18px"
        />
      )
    } else if (!this.state.downvoted && this.state.downHover) {
      return (
        <img
          className="down-arrow"
          onClick={this.downvote}
          onMouseOver={this.enterDown}
          onMouseOut={this.leaveDown}
          src="assets/images/comment_arrows/downvote.png"
          width="17px"
          height="18px"
        />
      )
    }
  }

  render() {
    const { comment } = this.props; 

    return (
      <li className='post-comment'>
        <div className='comment-content'>
          <div className='comment-votes'>
            {this.renderUpArrow()}
            {/* <button className='comment-upvote' onClick={this.upvote}></button> */}
            {/* {this.state.votes} */}
            {this.renderDownArrow()}
            {/* <button className='comment-downvote' onClick={this.downvote}></button> */}
          </div>
          <div className='comment-main'>
            <div className='comment-points'>
              {this.state.votes}
              <p className='comment-points-label'>{this.state.votes === 1 ? 'point' : 'points'}</p>
            </div>
            <div className='comment-text'>
              {comment.text}
            </div>
          </div>
        </div>
        <div className='comments-bottom'>
          <div className='comment-reply'>
            <div className='comment-reply-image'></div>
            <button onClick={ this.openReplyForm }>Reply</button>
          </div>
          {this.renderDeleteButton()}
          
        </div>
        
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
    fetchCommentVotes: commentId => fetchCommentVotes(commentId),
    voteOnComment: voteInfo => dispatch(voteOnComment(voteInfo)),
    removeVote: voteInfo => dispatch(removeVote(voteInfo)),
    updateVote: voteInfo => dispatch(updateVote(voteInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentIndexItem);