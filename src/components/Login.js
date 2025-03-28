import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');   // Pre-filled email
  const [password, setPassword] = useState('cityslicka');     // Pre-filled password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);      // Store token in localStorage
      navigate('/users');                                // Navigate to the Users List page
    } catch (error) {
      setError('Invalid credentials. Please try again.');  // Display error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center">Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
