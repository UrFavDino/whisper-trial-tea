import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/LoginAdmin.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleLogin = () => {
    // Check if the username and password match the hardcoded credentials
    if (username === 'Admin' && password === 'admin01') {
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
        <div className='Login-containers'>
          <div className='titles'>Whisper</div>
          <div className='sub-title'>Welcome Admin</div>


          <div className='Login-form'>
            <input
              placeholder='Username'
              type='text'
              className='holder'
            />
            <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              className='holder'
            />
            <label className='showpass'>
              <input
                type="checkbox"
                style={{ marginRight: '10px' }}
                onChange={togglePasswordVisibility}
              />
              Show password
            </label>

            <button className='btn-logins' onClick={handleLogin}>
              Login
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
