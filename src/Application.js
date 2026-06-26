import React, { Component } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Account from './Components/Account/Account';
import Stock from './Components/Stock/Stock';
import Balance from './Components/Balance/Balance';
import Header from './Components/Header/Header';
import Buy from './Components/Buy/Buy';

// HashRouter keeps deep links working on GitHub Pages (no server-side routing).
class Application extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/account" replace />} />
          <Route path="/account" element={<Account />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/stock/:id" element={<Buy />} />
        </Routes>
        <Balance />
      </Router>
    );
  }
}

export default Application;
