import React from 'react';

export default class CommentIndexItem extends React.Component {
  render() {
    const { comment } = this.props; 

    return <li>{comment.text}</li>
  }
}