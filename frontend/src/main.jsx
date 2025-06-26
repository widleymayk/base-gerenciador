import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/reset.css'; 
import './assets/css/variaveis.css';  

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);