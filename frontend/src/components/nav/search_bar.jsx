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
        debugger;
        //i need to see how i can add the things that it returns to the state
        this.setState({ subs: res.subDreddits })
      })
  }

  render() {
    return (
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="⌕ Search"
          onChange={this.handleUpdate}
        />

        <SubDredditIndex subs={ this.state.subs } />
      </div>
    )
  }
}