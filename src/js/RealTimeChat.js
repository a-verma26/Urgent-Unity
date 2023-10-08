import React, { Component } from 'react';
import healthCareTips from './healthCareTips.js';
import '../scss/healthCareTips.scss';
import bulbImg from "./assets/bulb.jpg"

class RealTimeChat extends Component {
  render() {
    const { emergencyType } = this.props;

    // Get health care tips based on the emergency type
    const tipsForEmergencyType = healthCareTips[emergencyType] || [];

    return (
      <div className='footer'>
        <img style={{ display: 'inline-block', width: '100px', verticalAlign:'top', marginTop:'18px' }} className="bulb-img" src={bulbImg} alt="Bulb"/>
        <div  style={{ display: 'inline-block', width: '80%' }}>
        <h3 >Do these Health Care Tips for {emergencyType} while CPR Practitioner is on its way !</h3>
        <ul>
          {tipsForEmergencyType.map((tip, index) => (
            <li key={index}><p>{tip}</p></li>
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default RealTimeChat;
