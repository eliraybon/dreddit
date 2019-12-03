import React from 'react';
import SubDredditIndex from '../subdreddit/subdreddit_index_container';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subs: [], resultsDropdown: false }

    this.container = React.createRef();

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.updateSearchTerm(e.currentTarget.value)
      .then(res => {
        this.setState({ subs: res.subDreddits, resultsDropdown: true })
      })
  }

  handleOutsideClick = e => {
    if (!this.container.current.contains(e.target)) {
      this.setState({ resultsDropdown: false });
    }
  }

  handleOutsideClick(e) {
    if (this.container.current && !this.container.current.contains(e.target)) {
      this.setState({ userSubsDropdown: false });
    };
  }

  closeResults = () => {
    this.setState({ resultsDropdown: false });
  }

  toggleResultsDropdown = () => {
    if (!this.state.subs.length) return null;

    this.setState(state => {
      return { userSubsDropdown: !state.userSubsDropdown }
    });
  }

  render() {

    return (
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search Dreddit"
          onChange={this.handleUpdate}
          // ref={this.container}
          onClick={this.toggleResultsDropdown}
        />

        <div className="search-results" ref={this.container} onClick={this.closeResults}>
          {this.state.resultsDropdown && (
            <SubDredditIndex subs={ this.state.subs } />
          )}
        </div>
      </div>
    )
  }
}