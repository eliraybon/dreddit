import React from 'react';
import { Link } from 'react-router-dom'
import SearchBar from './search_bar_container';
import SubdredditIndex from '../subdreddit/subdreddit_index_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserSubs(this.props.currentUserId);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  returnHome = () => {
    this.props.history.push('/')
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className='nav-auth-links'>
          <div className='nav-subdreddits'>
            <div className="user-subs">
              <SubdredditIndex subs={ this.props.userSubs } />
            </div>
          </div>
          <div className='nav-search'>
            <label>
              <div className='nav-search-logo'>
              </div>
            </label>
            <SearchBar />
          </div>
          <div className='nav-right-links'>
            <Link className='nav-post' to={'/subdreddits/new'}></Link>
            <div className='nav-profile-div'>
              <div className='nav-profile'>
                <div className='nav-drop-down'>
                  <div className='nav-drop-profile'>
                    <label className='nav-profile-label'>
                      <div className='nav-profile-pic'>
                      </div>
                      <Link className='nav-profile-link' to={'/profile'}>Profile</Link>
                    </label>
                  </div>
                  <div className='nav-drop-logout'>
                    <label className='nav-logout-label'>
                      <div className='nav-logout-pic'>
                      </div>
                      <button className='nav-logout-link' onClick={this.logoutUser}>Logout</button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='nav-links'>
          <div className='nav-signup'>
            <Link className='nav-signup-link' to={'/signup'}>Sign Up</Link>
          </div>
          <div className='nav-login'>
            <Link className='nav-login-link' to={'/login'}>Log In</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar">
        <div className='nav-logo-div' onClick={ this.returnHome }>
          <div className='nav-logo'>
          </div>
          <div className='nav-site-name'>
            dreddit
          </div>
        </div>
        
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;