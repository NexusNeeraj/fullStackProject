import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <Routes>
        <Route path="/" element={
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        } />
        <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
    </Routes>
);
};

const AppWrapper = () => (
  <Router>
      <App />
  </Router>
);


export default AppWrapper;
