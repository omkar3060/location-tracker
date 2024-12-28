import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import LocationTracker from './components/LocationTracker';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm type="register" />} />
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/tracker" element={<LocationTracker />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
