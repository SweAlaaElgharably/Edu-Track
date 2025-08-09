import React from "react";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PlexusBackground from "./components/PlexusBackground.jsx";
import RoutesList from "../routes/RoutesList.jsx";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  // If the route is not matched by your main routes, show 404 without layout
  const notFound = [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/courses",
    "/schedule",
    "/profile",
    "/features",
    "/contact",
    "/universities",
    "/about",
    "/help",
    
  ];
  const isFacultyManage = /^\/universities\/[^/]+\/faculties$/.test(
    location.pathname
  );
  const isKnownRoute = notFound.includes(location.pathname) || isFacultyManage;

  if (!isKnownRoute) {
    return <PageNotFound />;
  }

  return (
    <div className="App">
      {!isAuthPage && <PlexusBackground />}
      <Navbar />
      <main className="main-content">
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
