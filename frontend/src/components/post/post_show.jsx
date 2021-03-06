import React from 'react';
import CommentForm from '../comment/create_comment_form_container';
import CommentIndex from '../comment/comment_index_container';
import { Link } from 'react-router-dom';

export default class PostShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      upvoted: false,
      downvoted: false,
      isCounted: false,
      upHover: false, 
      downHover: false 
    }

    this.countVotes = this.countVotes.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.removeVote = this.removeVote.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId)
      .then(() => this.countVotes())
  }

  componentDidUpdate(prevProps) {
    if (this.props.postId !== prevProps.postId) {
      this.props.fetchPost(this.props.postId)
        .then(() => this.countVotes())
    }
  }

  countVotes() {
    if (this.state.isCounted) return;

    let count = 0;
    let upvoted = false;
    let downvoted = false;

    this.props.fetchPostVotes(this.props.postId)
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
    const postId = this.props.postId;
    const userId = this.props.currentUserId;
    const upvote = true;

    if (this.state.upvoted || this.state.downvoted) {
      this.props.updateVote({ postId, userId, upvote })
        .then(() => {
          this.setState({ upvoted: upvote, downvoted: !upvote, isCounted: false });
          this.countVotes();
        })
    } else {
      this.props.voteOnPost({ postId, userId, upvote })
        .then(() => {
          this.setState({ upvoted: upvote, downvoted: !upvote, isCounted: false });
          this.countVotes();
        })
    }
  }

  downvote() {
    const postId = this.props.post._id;
    const userId = this.props.currentUserId;
    const upvote = false;

    if (this.state.upvoted || this.state.downvoted) {
      this.props.updateVote({ postId, userId, upvote })
        .then(() => {
          this.setState({ upvoted: upvote, downvoted: !upvote, isCounted: false });
          this.countVotes();
        })
    } else {
      this.props.voteOnPost({ postId, userId, upvote })
        .then(() => {
          this.setState({ upvoted: upvote, downvoted: !upvote, isCounted: false });
          this.countVotes();
        })
    }
  }

  removeVote() {
    const userId = this.props.currentUserId;
    const postId = this.props.post._id;

    this.props.removeVote({ userId, postId })
      .then(() => {
        this.countVotes();
      })
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
          src="assets/images/arrows/upvote.png"
          width="17px"
          height="18px"
          alt="up-arrow"
        />
      )
    } else if (this.state.upvoted && this.state.upHover) {
      return (
        <img
          className="up-arrow"
          onClick={this.removeVote}
          onMouseOver={this.enterUp}
          onMouseOut={this.leaveUp}
          src="assets/images/arrows/upvote.png"
          width="17px"
          height="18px"
          alt="up-arrow"
        />
      )
    } else if (!this.state.upvoted && !this.state.upHover) {
      return (
        <img
          className="up-arrow"
          onClick={this.upvote}
          onMouseOver={this.enterUp}
          onMouseOut={this.leaveUp}
          src="assets/images/arrows/up.png"
          width="17px"
          height="18px"
          alt="up-arrow"
        />
      )
    } else if (!this.state.upvoted && this.state.upHover) {
      return (
        <img
          className="up-arrow"
          onClick={this.upvote}
          onMouseOver={this.enterUp}
          onMouseOut={this.leaveUp}
          src="assets/images/arrows/upvote.png"
          width="17px"
          height="18px"
          alt="up-arrow"
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
          src="assets/images/arrows/downvote.png"
          width="17px"
          height="18px"
          alt="down-arrow"
        />
      )
    } else if (this.state.downvoted && this.state.downHover) {
      return (
        <img
          className="down-arrow"
          onClick={this.removeVote}
          onMouseOver={this.enterDown}
          onMouseOut={this.leaveDown}
          src="assets/images/arrows/downvote.png"
          width="17px"
          height="18px"
          alt="down-arrow"
        />
      )
    } else if (!this.state.downvoted && !this.state.downHover) {
      return (
        <img
          className="down-arrow"
          onClick={this.downvote}
          onMouseOver={this.enterDown}
          onMouseOut={this.leaveDown}
          src="assets/images/arrows/down.png"
          width="17px"
          height="18px"
          alt="down-arrow"
        />
      )
    } else if (!this.state.downvoted && this.state.downHover) {
      return (
        <img
          className="down-arrow"
          onClick={this.downvote}
          onMouseOver={this.enterDown}
          onMouseOut={this.leaveDown}
          src="assets/images/arrows/downvote.png"
          width="17px"
          height="18px"
          alt="down-arrow"
        />
      )
    }
  }

  render() {
    const { post } = this.props;

    if (!post) return null;

    return (
      <div className='post-show'>
        <div className="pii-show">

          <div className='pii-votes'>
            {this.renderUpArrow()}
            {this.state.votes}
            {this.renderDownArrow()}
          </div>
          <div className='pii-content'>
            <div className="pii-sub-and-name">
              <Link
                to={`/subdreddits/${post.subDreddit._id}`}
                className="pii-sub-title">
                d/{post.subDreddit.title}
              </Link>
              <span className="pii-username"><span>Posted by </span> 
                <Link to={`/users/${post.user._id}`} className="user-username-link">
                  u/{post.user.username}
                </Link>
              </span>
            </div>
      
              <div className='pii-top'>

                {post.title}
              </div>
              <div className='post-text'>
                  {post.text}
                </div>
              <div className='pii-media'>
                {post.imgUrl && (
                  <img
                    src={post.imgUrl}
                    width="200px"
                    height="200px"
                    alt="post"
                  />
                )}

                {post.videoUrl && (
                  <video src={post.videoUrl}
                    width="320px"
                    height="240px"
                    controls
                  >
                  </video>
                )}
                
              </div>
          </div>

          </div>
          <div className='post-comments'>
            <CommentForm postId={ post._id } />
            <CommentIndex comments={ this.props.comments } context="post" /> 
          </div>
        
      </div>
    )
  }
}