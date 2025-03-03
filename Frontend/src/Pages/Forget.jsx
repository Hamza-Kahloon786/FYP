// Forget.js
import React, { useState } from 'react';

const Forget = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="text-[#CF992D] text-2xl font-semibold mb-6">
        PangeaPay
      </div>
      
      <div className="bg-white rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Password Reset</h1>
        <p className="text-gray-600 mb-6">
          To reset your password, enter the email address you use to sign in to PangeaPay
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <div className="text-green-500 text-sm text-center">{message}</div>}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#CF992D] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forget;