import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmergencyForm from './EmergencyForm';
import MapComponent from './MapComponent';
import SignupCredentials from './SignupCredentials';
import SignupDetails from './SignupDetails';

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
          <h1>Emergency Response App</h1>
          <Routes>
            <Route path="/" element={<SignupCredentials />} />
            <Route path="/details" element={<SignupDetails />} />
            <Route
              path="/emergency"
              element={<EmergencyForm onSubmit={this.handleEmergencySubmit} />}
            />
            {/* <Route
              path="/location"
              element={<MapComponent />}
            /> */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
