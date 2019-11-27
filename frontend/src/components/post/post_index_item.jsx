import React from 'react';
import { Link } from 'react-router-dom';

export default class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { upvotes: 0, upvoted: false, downvoted: false };

    this.countVotes = this.countVotes.bind(this);
    this.upvote = this.upvote.bind(this);
    this.renderTest = this.renderTest.bind(this);
  }

  componentDidMount() {
    this.countVotes();
  }

  componentDidUpdate() {
    this.countVotes();
  }

  countVotes() {
    let count = 0;
    this.props.fetchPostVotes(this.props.post._id)
      .then(res => {
        const votes = Object.values(res.data);
        votes.forEach(vote => {
          (vote.upvote) ? count += 1 : count -= 1;
          debugger;
          if (vote.user === this.props.currentUserId) {
            //not using set state here because i don't want to trigger re-render
            //check into shouldComponentUpdate if you want to use setState later 
            if (vote.upvote) this.state.upvoted = true;
            if (!vote.upvote) this.state.downvoted = true;
          } else {
            this.state.upvoted = false;
            this.state.downvoted = false;
          }
        });
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

  renderTest() {
    if (this.state.upvoted) return <h1>It's working</h1>
  }



  render() {
    const { post } = this.props;

    return (
      <li className="pii">  
        <Link to={`/posts/${post._id}`}>
          {post.title}  
        </Link>

        {this.renderTest()}
        {this.state.upvotes}
        <button onClick={this.upvote}>Upvote</button>
      </li>
    )
  }
}