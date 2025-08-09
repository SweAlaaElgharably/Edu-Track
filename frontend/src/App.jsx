import React from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PlexusBackground from './components/PlexusBackground.jsx';
import RoutesList from '../routes/RoutesList.jsx';

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      <PlexusBackground />
      <Navbar />
      <main className="main-content">
        <ScrollToTop />
        <RoutesList />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
