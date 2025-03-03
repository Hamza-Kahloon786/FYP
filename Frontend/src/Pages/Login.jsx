// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/kyc');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="text-[#CF992D] text-2xl font-semibold mb-6 flex items-center">
        PangeaPay
      </div>
      
      <div className="bg-white rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Login to account</h1>
        <p className="text-gray-600 mb-6">
          Access to the most powerfull tool in the entire design and web industry.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            required
          />
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              required
            />
            <div className="text-right">
              <Link to="/Forget" className="text-sm text-black hover:text-[#CF992D]">
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#CF992D] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/RegisterPage" className="text-gray-900 font-medium hover:underline">
            Register new account
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;