import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Userlogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setMessage('');
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setMessage('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Registered successfully! Please login.');
        resetForm();
        setIsLogin(true);
      } else {
        setMessage(`❌ ${data.message || 'Registration failed'}`);
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('Please enter username and password');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Login successful!');
        localStorage.setItem('token', data.token);
        resetForm();
        navigate('/userdashboard'); // Redirect user to their dashboard
      } else {
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h2>

        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="username"
        />

        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="email"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete={isLogin ? "current-password" : "new-password"}
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          disabled={loading}
          className={`w-full ${
            isLogin ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-3 rounded transition disabled:opacity-50`}
        >
          {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                className="text-blue-600 hover:underline font-semibold"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                className="text-green-600 hover:underline font-semibold"
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Userlogin;
