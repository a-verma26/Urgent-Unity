// hospitalData.js
const hospitalData = [
  {
    name: 'Inova Fairfax',
    address: '3300 Gallows Rd Falls Church, VA 22042',
    location: { lat: 38.8573, lng: -77.2278 }, // Replace with actual coordinates
    healthInsurance: "Yes",
    waitTime: 7
  },
  {
    name: 'Inova Fair Oaks',
    address: '3600 Joseph Siewick Dr Fairfax, VA 22033',
    location: { lat:38.859633, lng: -77.283583 }, // Replace with actual coordinates
    healthInsurance: "No",
    waitTime: 10

  },
  {
    name: 'Inova Reston',
    address: '1850 Town Center Pkwy Reston, VA 20190',
    location: { lat:38.9654, lng: -77.3567 }, // Replace with actual coordinates
    healthInsurance: "No",
    waitTime: 30

  },
  {
    name: 'Virginia Hospital Center',
    address: '1701 N George Mason Dr Arlington, VA 22205',
    location: { lat:38.1882, lng: -77.2232 }, // Replace with actual coordinates
    healthInsurance: "Yes",
    waitTime: 20

  },
  // Add more hospitals as needed
];

export default hospitalData;
