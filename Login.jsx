import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';
import logo from '../assets/images/logo.jpeg'
import ErrorComponent from './ErrorComponent'; 
import { AuthContext } from '../Context/AuthContext'; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 
  const { login, setInfo } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlesignin = () =>{
    navigate('/signin')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://frontend-env.eba-eg4kjf3d.ap-south-1.elasticbeanstalk.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData) 
      });

      if (response.ok) {
        console.log("Login successful");

        const data = await response.json()

        console.log(data.data.accessToken)

        setInfo(data.data.data)
        login(); 
        navigate('/'); 
      } else {
        console.error('Failed to login');
        setError('Failed to login. Please check your credentials and try again.'); 
      }
    } catch (error) {
      console.error("An error occurred during login", error);
      setError('An error occurred during login. Please try again later.'); 
    }

    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className='form-container_login'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='form-logo'>
          <img src={logo} alt='logo' />
        </div>
        {error && <ErrorComponent error={error} />} 
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input 
            type='email' 
            id='email' 
            name='email' 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input 
            type='password' 
            id='password' 
            name='password' 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <div className='signin-text' onClick={handlesignin}>
          Sign In
      </div>
    </div>
  );
}

export default Login;
