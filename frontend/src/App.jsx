import React from "react";
import { AuthProvider } from "./context/AuthContext";
import PlexusBackground from "./components/PlexusBackground.jsx";
import RoutesList from "../routes/RoutesList.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <PlexusBackground />
        <Navbar />
          <RoutesList />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
