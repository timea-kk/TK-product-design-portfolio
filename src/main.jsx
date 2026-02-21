/**
 * main.jsx – Entry point for the React app.
 * Mounts the app into #root (see index.html). index.css contains Tailwind and base theme variables.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
