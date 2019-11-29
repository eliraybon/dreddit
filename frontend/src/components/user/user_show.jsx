import React from 'react';
import PostIndex from '../post/post_index_container';
import CommentIndex from '../comment/comment_index_container';
//also need subs, which you don't have yet

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
      <div className="user-show">
        <h1>{user.username}</h1>
        <PostIndex posts={ posts } />
        <CommentIndex comments={ comments } context="user" />
      </div>
    )
  } 
}