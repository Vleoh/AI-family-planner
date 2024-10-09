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

const App = () => {
  return (
    <AuthState>
      <FamilyState>
        <AIState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route
                    exact
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