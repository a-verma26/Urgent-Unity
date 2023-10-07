import React, { Component } from 'react';
import healthCareTips from './healthCareTips.js';
import '../scss/healthCareTips.scss';

class RealTimeChat extends Component {
  render() {
    const { emergencyType } = this.props;

    // Get health care tips based on the emergency type
    const tipsForEmergencyType = healthCareTips[emergencyType] || [];

    return (
      <div className='healthCareContainer'>
        <h2>Health Care Tips</h2>
        <p>
          <strong>Emergency Type:</strong> {emergencyType}
        </p>
        <ul>
          {tipsForEmergencyType.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RealTimeChat;
