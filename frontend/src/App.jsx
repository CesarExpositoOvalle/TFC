import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routes/RoutesConfig';
import MainLayout from './layout/MainLayOut';
import './assets/styles/App.css'; 

function App() {
  return (
    <Router>
      <MainLayout>
        <RoutesConfig />
      </MainLayout>
    </Router>
  );
}

export default App;