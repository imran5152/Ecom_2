import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
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

  const registerUser = async () => {
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
        setMessage('✅ Registered successfully!');
        resetForm();
        setIsLogin(true);
      } else {
        setMessage(` ${data.message}`);
      }
    } catch (error) {
      setMessage(` ${error.message}`);
    }
    setLoading(false);
  };

  const loginUser = async () => {
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
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setMessage(` ${data.message}`);
      }
    } catch (error) {
      setMessage(` ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? 'Admin Login' : 'Register Admin'}
        </h2>
        {message && (
          <div className={`text-center mb-2 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full border p-2 rounded"
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full border p-2 rounded"
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full border p-2 rounded"
        />
        <button
          onClick={isLogin ? loginUser : registerUser}
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => { setIsLogin(false); resetForm(); }} className="text-blue-500 underline">
                Register
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button onClick={() => { setIsLogin(true); resetForm(); }} className="text-green-500 underline">
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
