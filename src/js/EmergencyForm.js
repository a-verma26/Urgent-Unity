import React, { Component } from 'react';
import HospitalNotification from './HospitalNotification';
import MapComponent from './MapComponent';
import RealTimeChat from './RealTimeChat';
import '../scss/EmergencyForm.scss';
import SpeechToText from './SpeechToText';
import ambulanceImg from "./assets/ambulance.png"

class EmergencyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyType: '',
      emergencyDetails: '', // Added state for emergency details
      isSubmitClicked: false,
      notifyNearbyHospital: false,
      userLocation: {
        latitude: null,
        longitude: null,
        address: '',
      },
    };
  }

  componentDidMount() {
    this.fetchUserLocation();
  }

  fetchUserLocation = () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          // Reverse geocoding using Google Maps Geocoding API
          const reverseGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=${apiKey}`;

          try {
            const response = await fetch(reverseGeocodingUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted_address;
              this.setState((prevState) => ({
                userLocation: {
                  ...prevState.userLocation,
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                  address: address,
                },
              }));
            }
          } catch (error) {
            console.error('Error fetching user address:', error);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { emergencyType, emergencyDetails } = this.state;
    this.setState({ isSubmitClicked: true });
    this.props.onSubmit(emergencyType, emergencyDetails);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNotifyHospital = () => {
    this.setState({ notifyNearbyHospital: true });
  };

   handleCloseModal = () => {
    this.setState({ notifyNearbyHospital: false });
  };

  render() {
    const { emergencyType, emergencyDetails, isSubmitClicked, notifyNearbyHospital, userLocation } = this.state;

    return (
      <div className={`headContainer${isSubmitClicked ? 'next' : ''}`}>
        {!isSubmitClicked && <div className='emergencyFormContainer'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Type of Emergency:
              <select name="emergencyType" value={emergencyType} onChange={this.handleChange}>
                <option value="">Select an Emergency Type</option>
                <option value="Cardiac Arrest">Cardiac Arrest</option>
                <option value="Choking">Choking</option>
                <option value="Trauma">Trauma</option>
                <option value="Heart Attack">Heart Attack</option>
                <option value="Accident">Accident</option>
                <option value="Seizure">Seizure</option>
                <option value="Stroke">Stroke</option>
                <option value="Diabetic Emergency">Diabetic Emergency</option>
                <option value="Allergic Reaction">Allergic Reaction (Anaphylaxis)</option>
              </select>
            </label>
            <label>
              Additional Details:
              <textarea
                name="emergencyDetails"
                value={emergencyDetails}
                onChange={this.handleChange}
                rows="4"
                cols="50"
                placeholder="Provide additional details or notes about the emergency..."
              />
            </label>

            <button type="submit">Submit</button>
          </form>
          <SpeechToText />
        </div>}
        {isSubmitClicked && (

          <div className='mapContainer'>
            {userLocation && userLocation.address && (
              <div>
                <b><span>Your Current Location:   </span></b>
                <span>{userLocation.address}</span>
              </div>
            )}
            <span style={{ marginRight: '30px' }}>
              Would you like to notify the nearby hospital to prepare for the patient's arrival in advance?
            </span>
            <div className='buttonContainer'>
              <button onClick={this.handleNotifyHospital}>Notify Nearby Hospital</button>
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '10px' }}>
        Your current location has been shared with nearby CPR practitioners.</div>

            <MapComponent emergencyType={emergencyType} />
            <img className="ambulance-img" src={ambulanceImg} alt="Ambulance"/>
            <div className='message'>Estimated Arrival Time of Ambulance : <b>14 minutes</b> </div>

          </div>
        )}


        {notifyNearbyHospital && <HospitalNotification onClose={this.handleCloseModal}/>}
        {isSubmitClicked && <RealTimeChat emergencyType={emergencyType} />}
        {!isSubmitClicked && <div className='footer'>
          <h3>Frequently Asked Questions</h3>
          <ul>
            <li>
              <strong>Q: How does the app work?</strong>
              <p>A: The app connects users with nearby CPR practitioners and emergency services to provide timely assistance during emergencies.</p>
            </li>
            <li>
              <strong>Q: What information is shared with CPR practitioners?</strong>
              <p>A: Only essential information, such as your location and emergency type, is shared with CPR practitioners to ensure a prompt response.</p>
            </li>
            <li>
              <strong>Q: How is my data handled?</strong>
              <p>A: Your data is handled securely and is only used for emergency response purposes. We prioritize user privacy and data protection.</p>
            </li>
            {/* Add more FAQs as needed */}
          </ul>
        </div>}
      </div>

    );
  }
}

export default EmergencyForm;
