import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { PrismaHero } from './components/ui/PrismaHero';
import Telemetry from './components/ui/Telemetry';
import SystemOverview from './components/ui/SystemOverview';
import SecurityProtocols from './components/ui/SecurityProtocols';
import Administration from './components/ui/Administration';
import GenderGateway from './components/ui/GenderGateway';
import Navbar from './components/ui/Navbar';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        // Check if a token exists
        const token = localStorage.getItem("token");
        return token !== null; // For now, if ANY token exists, let them in
    };

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <main className="w-full bg-[#0a0a0a] scroll-smooth text-zinc-300 font-sans">
            <Navbar />
            <section id="landing">
              <PrismaHero />
            </section>
            <section id="overview">
              <SystemOverview />
            </section>
            <section id="telemetry">
              <Telemetry />
            </section>
            <section id="security">
              <SecurityProtocols />
            </section>
            <section id="administration">
              <Administration />
            </section>
          </main>
        } />
        <Route path="/login" element={<Login />} />
        <Route 
            path="/dashboard" 
            element={
                <ProtectedRoute>
                    <GenderGateway />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/dashboard/:sector" 
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
