import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Subscribe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const eventLink = location.state?.eventLink || '';

  useEffect(() => {
    if (!eventLink) {
      navigate('/'); 
    }
  }, [eventLink, navigate]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/subscribe/send-otp`, {
        email,
        dob,
        eventLink,
      });
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/subscribe/verify-otp`, {
        email,
        dob,
        otp,
        eventLink,
      });
      window.location.href = eventLink;
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Almost There!</h2>
          <p className="text-gray-600">
            {step === 1
              ? 'Enter your email and date of birth to receive an OTP'
              : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-900"
                required
              />
            </div>
            {error && (
              <div className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </div>
            )}
            <button
              type="submit"
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-900"
                required
              />
            </div>
            {error && (
              <div className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </div>
            )}
            <button
              type="submit"
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify & Go to Event'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200"
          >
            Return to events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;