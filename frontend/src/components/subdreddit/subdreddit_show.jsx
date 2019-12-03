import React from 'react';
import PostForm from '../post/create_post_form_container';
import PostIndex from '../post/post_index_container';
import { Link } from 'react-router-dom';
import SubDredditMenu from './subdreddit_menu';
import DailyDredd from '../nav/daily_dredd';

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
        <button className='sub-info-join' onClick={this.unfollowSub}>
          Leave
        </button>
      )
    } else {
      return (
        <button className='sub-info-join' onClick={this.followSub}>
          Join
        </button>
      )
    }
  }

  render(){
    const { sub } = this.props;
    if (!sub) return null; 

    return (
      <div className="sub-dreddit">
        <div className="sub-show-sidebar">
          <SubDredditMenu 
            sub={ sub } 
            renderFollowButton={ this.renderFollowButton }
            history={ this.props.history }
          />

          <DailyDredd />
        </div>

        {/* <div className='sub-info'>
          <div className='sub-info-head'>
            COMMUNITY DETAILS
          </div>
          <div className='sub-info-content'>
            <div className='sub-info-brand'>
              <div className='sub-logo'>
              </div>
              <h1>{sub.title}</h1>
            </div>
            <div className='sub-info-description'>
              <p>{sub.description}</p>
            </div>
            <div className='sub-info-buttons'>
              {this.renderFollowButton()}
              <button 
                className='sub-create-post'
                onClick={() => this.props.history.push(`/submit/${sub._id}`)}>
                  CREATE POST
              </button>
            </div>
          </div>
        </div> */}

        <PostIndex posts={this.props.posts} />
      </div>
    )
  }
}

export default SubDredditShow;