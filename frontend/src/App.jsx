import React from "react";
import { AuthProvider } from "./context/AuthContext";
import PlexusBackground from "./components/PlexusBackground.jsx";
import RoutesList from "../routes/RoutesList.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {!isAuthPage && <PlexusBackground />}
      <Navbar />
      <RoutesList />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
