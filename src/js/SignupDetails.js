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
      username: this.props.username || '', // Initialize from props or set to an empty string
      password: this.props.password || '', 
    };
  }

  handleChange = (e) => {
    const { name, type } = e.target;
  
    if (type === 'file') {
      // Create a FormData object
      const formData = new FormData();
      // Append the file to the FormData object
      formData.append(name, e.target.files[0]);
      // Update the state with the FormData object
      this.setState({
        [name]: formData,
      });
    } else {
      // For non-file inputs, update the state as usual
      this.setState({
        [name]: e.target.value,
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make a POST request to the server
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state),
        });
  
        if (response.ok) {
          // Handle success (you can redirect or show a success message)
          window.alert('Details submitted successfully!');
          window.location.href = window.location.origin + '/emergency';
        } else {
          // Handle error
          console.error('Failed to submit details:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting details:', error);
      }
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
