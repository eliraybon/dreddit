import React from 'react';
import { Link } from 'react-router-dom'
// import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className='nav-auth-links'>
          <div className='nav-subdreddits'>
            <Link to={'/tweets'}>Subdreddits</Link>
          </div>
          <div className='nav-search'>
            <label>
              <div className='nav-search-logo'>
              </div>
            </label>
            <input
              className='nav-search-input'
              type='text'
              placeholder="Search Dreddit"
            />
            
          </div>
          <div className='nav-right-links'>
            <Link className='nav-post' to={'/submit'}></Link>
            <div className='nav-profile-div'>
              <div className='nav-profile'>
                <div className='nav-drop-down'>
                  <Link to={'/profile'}>Profile</Link>
                  <button onClick={this.logoutUser}>Logout</button>
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
        <div className='nav-logo-div'>
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