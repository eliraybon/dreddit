import React from 'react';

export default class PostShow extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId)
  }

  render() {
    const { post } = this.props;

    return (
      <div className="post-show">
        <h1>{post.title}</h1>
        <p>{post.text}</p>
      </div>
    )
  }
}