import React, { useEffect, useState } from 'react';
import API from '../utils/api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error.response?.data || error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleFetchLocations = async (userId) => {
    setSelectedUser(userId);
    try {
      const response = await API.get(`/admin/locations/${userId}`);
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch locations', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id} style={{ marginBottom: '10px' }}>
                <div>
                  <span>{user.username} ({user.email})</span>
                  <button 
                    style={{ marginLeft: '10px' }} 
                    onClick={() => handleFetchLocations(user._id)}
                  >
                    View Locations
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Location Logs</h2>
          {selectedUser ? (
            <ul>
              {locations.map((loc) => (
                <li key={loc._id}>
                  Latitude: {loc.latitude}, Longitude: {loc.longitude}, Time: {new Date(loc.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Select a user to view their location logs.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
