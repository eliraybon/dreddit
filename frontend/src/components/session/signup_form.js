import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.demoLogin = this.demoLogin.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // if (nextProps.signedIn === true) {
    //   this.props.history.push('/login');
    // }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

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

  demoLogin(e) {
    e.preventDefault();
    const demoUser = { username: 'demo', password: 'lola12' };
    this.props.login(demoUser);
  }

  returnHome = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="auth-div">
        <div className='auth-image'>
        </div>
        <form onSubmit={this.handleSubmit} className='auth-form'>
          <div className='auth-logo' onClick={ this.returnHome }>
          </div>
          <div className='form-type'>
            Sign Up
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
          <div className='password-div'>
            <input type="password"
              className='password-input'
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
          </div>
            <br />
          <div className='password-div'>
            <input type="password"
              className='password-input'
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
            />
          </div>
          <div className='auth-errors'>
            {this.renderErrors()}
          </div>
          <div className='auth-btns'>
            <div className='auth-btn'>
              <input className='auth-btn-text' type="submit" value="Submit" />
            </div>
            <div className='auth-demo'>
              <button onClick={this.demoLogin}>Log In As Demo User</button>
            </div>
          </div>
          <div className='auth-signin-link'>
            <div className='auth-user'>
              Already a Dredditer?
            </div>
            <div className='new-signin-link'>
              <Link to={'/login'}>Sign In</Link>
            </div>
          </div>
        </form>
        
      </div>
    );
  }
}

export default withRouter(SignupForm);