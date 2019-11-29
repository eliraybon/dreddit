import React from 'react';
import CommentForm from '../comment/create_comment_form_container';
import CommentIndex from '../comment/comment_index_container';

export default class PostShow extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId)
  }

  //not sure why I had to use the match params here. Kinda weird
  componentDidUpdate(prevProps) {
    if (this.props.postId !== prevProps.postId) {
      this.props.fetchPost(this.props.postId);
    }
  }

  render() {
    const { post } = this.props;
    if (!post) return null;

    return (
      <div className="post-show">
        <h1>{post.title}</h1>
        <p>{post.text}</p>

        <CommentForm postId={ post._id } />
        <CommentIndex comments={ this.props.comments } context={'post'} />
      </div>
    )
  }
}