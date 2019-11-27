import React from 'react';
import { Link } from 'react-router-dom';

export default class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { upvotes: 0 };

    this.countVotes = this.countVotes.bind(this);
    this.upvote = this.upvote.bind(this);
  }

  componentDidMount() {
    debugger;
    this.countVotes();
  }

  componentDidUpdate() {
    debugger;
    this.countVotes();
  }

  countVotes() {
    let count = 0;
    this.props.fetchPostVotes(this.props.post._id)
      .then(res => {
        const votes = Object.values(res.data);
        debugger;
        votes.forEach(vote => {
          (vote.upvote) ? count += 1 : count -= 1;
        });
        // debugger;
        if (this.state.upvotes !== count) {
          this.setState({ upvotes: count })
        }
      })
  }

  upvote() {
    const postId = this.props.post._id;
    const upvote = true;
    this.props.upvotePost({ postId, upvote });
  }



  render() {
    const { post } = this.props;

    return (
      <li className="pii">  
        <Link to={`/posts/${post._id}`}>
          {post.title}  
        </Link>

        {this.state.upvotes}
        <button onClick={this.upvote}>Upvote</button>
      </li>
    )
  }
}