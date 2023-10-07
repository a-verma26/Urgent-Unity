import React, { Component } from 'react';
import '../scss/SignupCredentials.scss';
import SignupDetails from './SignupDetails';
class SignupCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      nextClicked:false
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({nextClicked: true})
  };
  

  render() {

    return (
      <>
      {!this.state.nextClicked && <div className='signupCredentialsContainer'>
        
        <h2>Signup - Login Credentials</h2>
        <div >
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit" onClick={this.handleClick}>Next</button>
        </div>
      </div>}
      {this.state.nextClicked && <SignupDetails username={this.state.username} password={this.state.password}/>}
      </>
    );
  }
}

export default SignupCredentials;
