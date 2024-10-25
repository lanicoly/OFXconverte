import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.css';

// Cria a raiz do React
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Renderiza o aplicativo
root.render(
  <App />
);
