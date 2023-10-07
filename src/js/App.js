import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmergencyForm from './EmergencyForm';
import SignupCredentials from './SignupCredentials';
import '../scss/App.scss';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyType: '',
      location: null,
      cprLocation: null,
    };
  }
  handleEmergencySubmit = (type) => {
    this.setState({ emergencyType: type });
  };
  render() {
    return (
      <Router>
        <div>
        <nav className="navbar">
          <h1>Emergency Response App</h1>
        </nav>
          <Routes>
            <Route path="/" element={<SignupCredentials />} />
            <Route
              path="/emergency"
              element={<EmergencyForm onSubmit={this.handleEmergencySubmit} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;