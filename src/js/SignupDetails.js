import React, { Component } from 'react';
import '../scss/SignupDetails.scss';
class SignupDetails extends Component {


  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      contactNumber: '',
      emailAddress: '',
      stateIDOrPassport: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      emergencyContactRelationship: '',
      healthInsuranceProvider: '',
      policyNumber: '',
      uploadedHealthInsurance: null,
      permanentAddress: '',
    };
  }

  handleChange = (e) => {
    const { name, value, type } = e.target;
    // If the input type is file (for file uploads), handle differently
    this.setState({
      [name]: type === 'file' ? e.target.files[0] : value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup details logic (e.g., API call for saving user details)
    window.alert('Details submitted:', this.state);
    window.location.href= window.location.origin +"/emergency";
  };

  render() {
    return (
      <div className="signupdetailsContainer">
        <h2>Signup - Additional Details</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={this.state.fullName}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
            Permanent Address:
            <input
              type="text"
              name="permanentAddress"
              value={this.state.permanentAddress}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
            Contact Number:
            <input
              type="number"
              name="contactNumber"
              value={this.state.contactNumber}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
            Email Address:
            <input
              type="email"
              name="emailAddress"
              value={this.state.emailAddress}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
              
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* Add more gender options as needed */}
            </select>
          </label>
          <label>
            Emergency Contact Name:
            <input
              type="text"
              name="emergencyContactName"
              value={this.state.emergencyContactName}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
          Emergency Contact Number:
            <input
              type="number"
              name="emergencyContactNumber"
              value={this.state.emergencyContactNumber}
              onChange={this.handleChange}
              
            />
          </label>
      
        
          <label>
            Upload State ID or Passport:
            <input
              type="file"
              name="stateIDOrPassport"
              onChange={this.handleChange}
            />
          </label>
          <label>
          Health Insurance Provider:
            <input
              type="text"
              name="healthInsuranceProvider"
              value={this.state.healthInsuranceProvider}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
          Policy Number:
            <input
              type="number"
              name="policyNumber"
              value={this.state.policyNumber}
              onChange={this.handleChange}
              
            />
          </label>
          <label>
            Upload Insurance Policy:
            <input
              type="file"
              name="uploadedHealthInsurance"
              onChange={this.handleChange}
            />
          </label>
          
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default SignupDetails;
