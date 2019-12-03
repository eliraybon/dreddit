import React from 'react';
import SubDredditIndex from '../subdreddit/subdreddit_index_container';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subs: [] }

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.updateSearchTerm(e.currentTarget.value)
      .then(res => {
        this.setState({ subs: res.subDreddits })
      })
  }

  render() {
    return (
      <div className='search-bar-div'>
        <input
          className="search-bar"
          type="text"
          placeholder="Search Dreddit"
          onChange={this.handleUpdate}
        />

        <div className="search-results">
          <SubDredditIndex subs={ this.state.subs } />
        </div>
      </div>
    )
  }
}