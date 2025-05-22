import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const USERS = [
  { 
    email: 'admin@bibliotheca.com', 
    password: 'Admin@123', 
    role: 'admin',
    name: 'Admin User' 
  },
  { 
    email: 'user@bibliotheca.com', 
    password: 'User@123', 
    role: 'user',
    name: 'Regular User' 
  }
];

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    
    setTimeout(() => {
      const user = USERS.find(user => 
        user.email === formData.email && 
        user.password === formData.password
      );
      
      if (user) {
        
        localStorage.setItem('bibliotheca_user', JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role
        }));
        
        
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setLoginError('Invalid email or password');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full" style={{ background: `#6F6149` }}>
      <div className="relative pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-decorative text-center mb-6">
            Sign In
          </h2>
          
          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-serif mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-serif mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#e3d6b3] hover:bg-[#d6c9a6]'} text-gray-900`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            
            
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">Create an account</a>
            </p>
          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default Login;