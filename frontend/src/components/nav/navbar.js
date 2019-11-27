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
        <div className='nav-links'>
          <Link to={'/tweets'}>Subdreddits</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/submit'}>Create a Post</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className='nav-links'>
          <div className='nav-signup'>
            <Link className='nav-signup-link' to={'/signup'}>Signup</Link>
          </div>
          <div className='nav-login'>
            <Link className='nav-login-link' to={'/login'}>Login</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar">

        <div className='nav-logo'>
        </div>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;