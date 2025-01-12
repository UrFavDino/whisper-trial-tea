import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import '../Login/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // useNavigate hook to handle redirection

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleLogin = () => {
    // Check if the username and password match the hardcoded credentials
    if (username === 'Dino' && password === 'dino01') {
      // Redirect to the /home page if credentials are correct
      navigate('/home');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <>
      <div className='bg-login'>
        <link
          href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap"
          rel="stylesheet"
        />
        <div className='Login-container'>
          <div className='title'>Whisper</div>
          <div className='Login-form'>
            <input
              placeholder='Username'
              type='text'
              className='holder'
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Track username
            />
            <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              className='holder'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Track password
            />
            <label className='showpass'>
              <input
                type="checkbox"
                style={{ marginRight: '10px' }}
                onChange={togglePasswordVisibility}
              />
              Show password
            </label>

            <button className='btn-login' onClick={handleLogin}>
              Login
            </button>

            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: 'purple', fontWeight: 'bold' }}>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
