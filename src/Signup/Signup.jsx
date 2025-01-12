import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Signup/Signup.css';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <div className='bg-signup'>
        <link
          href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap"
          rel="stylesheet"
        />
        <div className='Signup-container'>
          <div className='signup-title'>Whisper</div>
          <p style={{fontSize: '17px', marginBottom: '40px', marginLeft: '30px', marginRight: '30px', textAlign: 'center', color: 'gray'}}>Join the conversation. Create, share, and engage in secure spaces.</p>
          <div className='Signup-form'>
            <input
              placeholder='Full Name'
              type='text'
              className='holder'
            />
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
            <input
              placeholder='Confirm Password'
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

            <button className='btn-signup'>
              Signup
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              Already have an account?{' '}
              <Link to="/" style={{ color: 'purple',fontWeight: 'bold' }}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;