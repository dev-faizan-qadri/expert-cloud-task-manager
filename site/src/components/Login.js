// src/components/Login.js
import React, { useState, useEffect } from 'react';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/', {
      credentials: 'include',
    }).then(() => {
      const cookies = document.cookie.split('; ');
      const csrf = cookies.find((row) => row.startsWith('CSRF-TOKEN='));
      if (csrf) {
        const token = decodeURIComponent(csrf.split('=')[1]);
        setCsrfToken(token);
      }
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, 
      },
      credentials: 'include',
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });

    if (response.ok) {
      setAuth(true);
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin} className="border p-4 shadow rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
