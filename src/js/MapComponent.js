import React, { useEffect, useRef, useState } from 'react';
let initMap; 

const MapComponent = () => {
  const mapRef = useRef(null);
  const [arrivalTimeMinutes, setArrivalTimeMinutes] = useState(0);

   

  useEffect(() => {
    window.initMap = initMap;
    const apiKey = process.env.REACT_APP_API_KEY;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
    window.initMap = initMap;
    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

   initMap = () => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API not loaded');
      return;
    }

    // Replace these with actual coordinates for your use case
    const YOUR_LATITUDE = 37.7749;
    const YOUR_LONGITUDE = -77.3117;
    const DUMMY_LATITUDE = 37.7791;
    const DUMMY_LONGITUDE = -77.3166;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE },
      zoom: 13,
    });

    if (!map) {
      console.error('Error creating the map.');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    const request = {
      origin: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE },
      destination: { lat: DUMMY_LATITUDE, lng: DUMMY_LONGITUDE },
      travelMode: 'DRIVING',
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(result);

        // Estimate Arrival Time
        const route = result.routes[0];
        let duration = 0;

        for (let i = 0; i < route.legs.length; i++) {
          duration += route.legs[i].duration.value;
        }

        setArrivalTimeMinutes(Math.round(duration / 60));
      } else {
        console.error('Directions request failed with status:', status);
      }
    });
  };
  

  return (
    <div className='container'>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
      <div>Estimated Arrival Time of CPR Practitioner: is {arrivalTimeMinutes} minutes</div>
    </div>
  );
};

export default MapComponent;
