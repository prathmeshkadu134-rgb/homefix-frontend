import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig'; 
import toast from 'react-hot-toast'; 
import './auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await api.post('/users/login', {
          email: formData.email,
          password: formData.password
        });
        
        login(response.data); 
        toast.success(`Welcome back, ${response.data.name}!`);
        navigate('/dashboard');

      } else {
        const response = await api.post('/users/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        login(response.data);
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Authentication failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Log in to manage your bookings.' : 'Join HomeFix to book top professionals.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <FiUser className="input-icon" />
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="input-group">
            <FiMail className="input-icon" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
              {isLogin ? 'Sign up here' : 'Log in here'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;