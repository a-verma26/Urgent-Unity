import React, { Component } from 'react';
import '../scss/SignupCredentials.scss';
class SignupCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    // Construct the request payload
    const requestBody = {
      username: username,
      password: password,
      // Add other fields if needed
    };

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming the response contains JSON data, you can parse it
      const responseData = await response.json();

      // Handle the response data as needed
      console.log('API Response:', responseData);

      // Redirect to the details page
      window.location.href = window.location.origin + '/details';
    } catch (error) {
      console.error('Error during API request:', error);
      // Handle errors, e.g., show an error message to the user
    }
  };
  

  render() {
    return (
      <div className='signupCredentialsContainer'>
        
        <h2>Signup - Login Credentials</h2>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}

export default SignupCredentials;
