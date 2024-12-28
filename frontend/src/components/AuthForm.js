import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function AuthForm({ type }) {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === 'register' ? '/auth/register' : '/auth/login';
      const response = await API.post(endpoint, formData);

      if (type === 'login') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate('/tracker');
      } else {
        alert('Registration successful! You can now log in.');
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
      </form>

      {/* Error Message and Navigation Button */}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
          {error.includes('Email or username already in use') && (
            <button onClick={() => navigate('/login')}>Go to Login</button>
          )}
        </div>
      )}
    </div>
  );
}

export default AuthForm;
