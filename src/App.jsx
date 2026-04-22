import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TenantProvider, useTenant } from './context/TenantContext';

// Components (Placeholder imports for now)
import Layout from './components/layout/Layout';
import Inventory from './pages/Inventory';
import VehicleDetails from './pages/VehicleDetails';
import MyGarage from './pages/MyGarage';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/:slug" element={<Layout><Inventory /></Layout>} />
      <Route path="/:slug/vehicle/:id" element={<Layout><VehicleDetails /></Layout>} />
      <Route path="/:slug/garage" element={<Layout><MyGarage /></Layout>} />
      
      {/* Fallback to a default slug or a landing page if needed */}
      <Route path="/" element={<Navigate to="/cars24" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <TenantProvider>
        <Router>
          <AppContent />
        </Router>
      </TenantProvider>
    </ThemeProvider>
  );
}

export default App;
