import React from 'react';
import { createRoot } from 'react-dom/client';
import './demoApi'; // wires up demo data for the (long-dead) public APIs
import './index.css';
import Application from './Application';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
