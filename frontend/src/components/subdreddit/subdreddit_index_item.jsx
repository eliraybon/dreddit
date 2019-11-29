import React from 'react';

export default class SubDredditIndexItem extends React.Component {
  render() {
    const { sub } = this.props;
    return (
      <li className="subdreddit-index-item">
        <p>{sub.title}</p>
      </li>
    )
  }
}