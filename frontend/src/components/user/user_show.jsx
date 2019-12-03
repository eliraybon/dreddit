import React from 'react';
import PostIndex from '../post/post_index_container';
import CommentIndex from '../comment/comment_index_container';
import SubDredditIndex from '../subdreddit/subdreddit_index_container';

export default class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.fetchUser(this.props.userId);
    }
  }

  render() {
    const { user, subs, posts, comments } = this.props;
    if (!user) return null; 
    return (
      <div>
        <div className="user-show-blue">
          <h1 className="user-show-username">u/{user.username}</h1>
        </div>
        <div className="user-show-content">
          <PostIndex posts={ posts } />
        </div>
      </div>
    )
  } 
}