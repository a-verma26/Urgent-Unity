import React, { Component } from 'react';

class LocationSharing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
  }

  componentDidMount() {
    // Use Geolocation API or another library to get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.props.onLocationSubmit(this.state.location);
    }
  }

  render() {
    return <div>Location Sharing Component</div>;
  }
}

export default LocationSharing;
