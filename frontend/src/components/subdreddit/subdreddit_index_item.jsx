import React from 'react';
import { Link } from 'react-router-dom';

export default class SubDredditIndexItem extends React.Component {
  render() {
    const { sub } = this.props;
    return (
      <li className="subdreddit-index-item">
        <Link to={`/subdreddits/${sub._id}`}>
          {sub.title}
        </Link>
      </li>
    )
  }
}