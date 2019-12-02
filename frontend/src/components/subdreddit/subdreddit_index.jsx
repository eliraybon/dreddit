import React from 'react';
import SubDredditIndexItem from './subdreddit_index_item';

export default class SubDredditIndex extends React.Component {
  render() {
    const { subs } = this.props;

    return (
      <ul className="subdreddit-index">
        {subs.map(sub => {
          return <SubDredditIndexItem
            sub={ sub }
            key={ sub._id }
          />
        })}
      </ul>
    )
  }
}