import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initVisitor } from './model/initVisitor';
import { App } from './App';
import './styles/index.css';

initVisitor();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
