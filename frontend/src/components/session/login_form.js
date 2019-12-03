import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors })
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  demoLogin() {
    const demoUser = { username: 'demo', password: 'lola12' };
    this.props.login(demoUser);
  }

  returnHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='auth-div'>
        <div className='auth-image'>
        </div>
        <form onSubmit={this.handleSubmit} className="auth-form">
          <div className='auth-logo' onClick={this.returnHome}>
          </div>
          <div className='form-type'>
            Sign in
          </div>
          <div className="username-div">
            <input type="text"
              className='username-input'
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="Username"
            />
          </div>
            <br />
          <div className="password-div">
            <input type="password"
              className='password-input'
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
          </div>
           
          <div className='auth-errors'>
            {this.renderErrors()}
          </div>
          
          <div className='auth-btn'>
            <input className='auth-btn-text' type="submit" value="SIGN IN" />
          </div>
          <div className='auth-signup-link'>
            <div className='auth-new'>
              New to Dreddit?
            </div>
            <div className='new-signup-link'>
              <Link to={'/signup'}>Sign Up</Link>
            </div>
          </div>
        </form>
        {/* <button onClick={this.demoLogin}>Log In As Demo User</button> */}
      </div>
    );
  }
}

export default withRouter(LoginForm);