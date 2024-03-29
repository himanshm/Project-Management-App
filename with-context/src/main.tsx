import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ProjectContextProvider from './context/ProjectContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProjectContextProvider>
      <App />
    </ProjectContextProvider>
  </React.StrictMode>
);
