import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const { token } = useParams();
  const navigate = useNavigate();
  
  // Validate token on mount
  useEffect(() => {
    // Basic client-side validation
    if (!token) {
      setError('Invalid reset link');
      setIsTokenValid(false);
      setIsLoading(false);
      return;
    }
    
    // Set loading to false after a brief delay 
    // In a real app, you might want to verify the token with the server here
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [token]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setMessage('');
    
    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Your password has been reset successfully');
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/Login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Reset password error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
        <div className="text-white text-xl">Verifying reset link...</div>
      </div>
    );
  }
  
  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
        <div className="text-[#CF992D] text-2xl font-semibold mb-6">
          Anxiety
        </div>
        
        <div className="bg-white rounded-3xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Invalid Reset Link</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
          <p className="text-gray-600 mb-6">
            The password reset link is invalid or has expired.
          </p>
          <Link 
            to="/Forget" 
            className="w-full bg-[#CF992D] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors text-center block"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="text-[#CF992D] text-2xl font-semibold mb-6">
        Anxiety
      </div>
      
      <div className="bg-white rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
        <p className="text-gray-600 mb-6">
          Please enter your new password
        </p>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              required
              minLength="6"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
              required
              minLength="6"
              disabled={isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#CF992D] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
          
          <div className="text-center mt-4">
            <Link to="/Login" className="text-[#CF992D] hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;