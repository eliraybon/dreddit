import React from 'react';
import { Link } from 'react-router-dom';

export default class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      votes: 0, 
      upvoted: false, 
      downvoted: false, 
      isCounted: false 
    };

    this.countVotes = this.countVotes.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.renderTest = this.renderTest.bind(this);
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

    this.props.voteOnPost({ postId, userId, upvote })
      .then(this.setState({ upvoted: true, downvoted: false, isCounted: false }))
  }

  downvote() {
    const postId = this.props.post._id;
    const userId = this.props.currentUserId;
    const upvote = false;

    this.props.voteOnPost({ postId, userId, upvote })
      .then(this.setState({ upvoted: false, downvoted: true, isCounted: false }))
  }

  removeVote() {
    const userId = this.props.currentUserId;
    const postId = this.props.post._id;
    
    this.props.removeVote({ userId, postId });
  }

  renderTest() {
    if (this.state.upvoted) return <h1>User has upvoted</h1>
  }

  render() {
    const { post } = this.props;

    return (
      <li className="pii">  
        <Link to={`/posts/${post._id}`}>
          {post.title}  
        </Link>

        {this.renderTest()}
        {this.state.votes}
        <button onClick={this.upvote}>Upvote</button>
        <button onClick={this.downvote}>Downvote</button>
        <button onClick={this.removeVote}>Test Remove Vote</button>
      </li>
    )
  }
}