import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function LocationTracker() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate();

  useEffect(() => {
    const trackLocation = () => {
      const userId = localStorage.getItem('userId');  // Get userId inside the function

      if (!userId) {
        console.error('User ID not found, redirecting to login...');
        navigate('/login');  // Redirect to login
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
            await API.post('/locations', { latitude, longitude, userId });
            console.log('Location sent successfully');
          } catch (error) {
            console.error('Failed to send location', error.response?.data || error.message);
          }
        },
        (error) => console.error('Error getting location:', error.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    };

    const intervalId = setInterval(trackLocation, 4000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div>
      <h1>Live Location Tracking</h1>
      {location.latitude && location.longitude ? (
        <p>
          Current Location: Latitude {location.latitude}, Longitude {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}

export default LocationTracker;
