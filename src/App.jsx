import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home';
import Navbar from './layouts/navbar';
import ErrorPage from './pages/error/error';
import AboutPage from './pages/about/about';
import SignupPage from './pages/auth/signup';
import LoginPage from './pages/auth/login';
import AdminPage from './pages/admin/admin';
import ContactPage from './pages/contact/contact';

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;