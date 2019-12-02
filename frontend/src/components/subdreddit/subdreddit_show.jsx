import React from 'react';
import PostForm from '../post/create_post_form_container';
import PostIndex from '../post/post_index_container';
import { Link } from 'react-router-dom';

class SubDredditShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followed: false
    }
  }
  componentDidMount(){
    this.props.fetchSubDreddit(this.props.match.params.subId)
      .then(res => {
        const sub = res.payload.sub;
        let followed = false;
        sub.followers.forEach(follower => {
          if (follower === this.props.currentUserId) followed = true;
        })
        this.setState({ followed });
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.subId !== prevProps.subId) {
      this.props.fetchSubDreddit(this.props.subId)
        .then(res => {
          const sub = res.payload.sub;
          let followed = false;
          sub.followers.forEach(follower => {
            if (follower === this.props.currentUserId) followed = true;
          })
          this.setState({ followed });
        })
    }
  }

  followSub = () => {
    const { subId, currentUserId } = this.props;
    this.props.followSub({ subId, userId: currentUserId })
      .then(res => {
        this.setState({ followed: true });
      })
  }

  unfollowSub = () => {
    const { subId, currentUserId } = this.props;
    this.props.unfollowSub({ subId, userId: currentUserId })
      .then(res => {
        this.setState({ followed: false });
      });
  }

  renderFollowButton = () => {
    if (this.state.followed) {
      return (
        <button onClick={this.unfollowSub}>
          Unfollow
        </button>
      )
    } else {
      return (
        <button onClick={this.followSub}>
          Follow
        </button>
      )
    }
  }

  render(){
    const { sub } = this.props;
    console.log(sub);
    if (!sub) return null; 

    return (
      <div className="sub-dreddit">
        <div className='sub-info'>
          <div className='sub-info-head'>
            COMMUNITY DETAILS
          </div>
          <div className='sub-info-content'>
            <h1>{sub.title}</h1>
            <p>{sub.description}</p>
            <div className='sub-info-buttons'>
              {this.renderFollowButton()}
            </div>
          </div>
        </div>
        {/* <PostForm subId={sub._id} /> */}
        <PostIndex posts={this.props.posts} />
      </div>
    )
  }
}

export default SubDredditShow;