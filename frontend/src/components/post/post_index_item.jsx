import React from 'react';
import { Link } from 'react-router-dom';

export default class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      votes: 0, 
      upvoted: false, 
      downvoted: false, 
      isCounted: false,
      upHover: false,
      downHover: false   
    };

    this.countVotes = this.countVotes.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.removeVote = this.removeVote.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
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

    this.props.fetchPostVotes(this.props.post._id)
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
    const postId = this.props.post._id;
    const userId = this.props.currentUserId;
    const upvote = true;

    if (this.state.upvoted || this.state.downvoted) {
      this.props.updateVote({ postId, userId, upvote });
    } else {
      this.props.voteOnPost({ postId, userId, upvote })
        .then(this.setState({ upvoted: true, downvoted: false, isCounted: false }))
    }
  }

  downvote() {
    const postId = this.props.post._id;
    const userId = this.props.currentUserId;
    const upvote = false;

    if (this.state.upvoted || this.state.downvoted) {
      this.props.updateVote({ postId, userId, upvote });
    } else {
      this.props.voteOnPost({ postId, userId, upvote })
        .then(this.setState({ upvoted: false, downvoted: true, isCounted: false }))
    }
  }

  removeVote() {
    const userId = this.props.currentUserId;
    const postId = this.props.post._id;

    this.props.removeVote({ userId, postId })
      .then(() => {
        this.setState({ upvoted: false, downvoted: false })
      })
  }


  renderDeleteButton() {
    const { post, currentUserId } = this.props;
    if (post.user !== currentUserId) return null;
    return <div className='pii-remove'>
        <div className='pii-remove-image'>
        </div>
        <button 
        onClick={() => this.props.deletePost(post._id)}>
        Remove
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
          src="assets/images/arrows/upvote.png"
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
          src="assets/images/arrows/upvote.png"
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
          src="assets/images/arrows/up.png"
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
          src="assets/images/arrows/upvote.png"
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
          src="assets/images/arrows/downvote.png"
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
          src="assets/images/arrows/downvote.png"
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
          src="assets/images/arrows/down.png"
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
          src="assets/images/arrows/downvote.png"
          width="17px"
          height="18px"
        />
      )
    }
  }

  render() {
    const { post } = this.props;
    console.log(post);
    return (
      <li className="pii">  
          <div className='pii-votes'>
            {/* <button onClick={this.upvote} className='pii-upvote'></button> */}
            {this.renderUpArrow()}
            {this.state.votes}
            {/* <button onClick={this.downvote} className='pii-downvote'></button> */}
            {this.renderDownArrow()}
          </div>
          <div className='pii-content'>
          <Link to={`/posts/${post._id}`} className='pii-show-link'>
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
            
          </Link>
            <div className='pii-bottom'>
              <div className='pii-comment'>
                <Link 
                  to={`/posts/${post._id}`}
                  >
                  <div className='pii-comment-link'>
                  <div className='pii-comment-image'>
                  </div>
                  <div>
                    Comments
                  </div>
                  </div>
                </Link>
              </div>
              
              <div className='pii-remove'>
                {this.renderDeleteButton()}
              </div>
            </div>
          </div>
        {/* {this.renderTest()} */}
      </li>
    )
  }
}