import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import FamilyState from './context/family/FamilyState';
import AIState from './context/ai/AIState';

import './App.css';

const App: React.FC = () => {
  return (
    <AuthState>
      <FamilyState>
        <AIState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container mx-auto px-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard"
                    element={<PrivateRoute component={Dashboard} />}
                  />
                </Routes>
              </div>
            </div>
          </Router>
        </AIState>
      </FamilyState>
    </AuthState>
  );
};

export default App;