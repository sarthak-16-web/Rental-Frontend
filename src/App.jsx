import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import SupportContact from "./pages/SupportContact";
import Admin from "./pages/Admin";
import Collaboration from "./pages/Collaboration";
import ScrollToTop from "./components/ScrollToTop";

import api from "./api/axios";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/admin/check");

        if (res.data.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return null; // or return <h2>Loading...</h2>;
  }

  return (
    <Router>
      <ScrollToTop />

      <div className="app">
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/support-contact" element={<SupportContact />} />
            <Route path="/collaboration" element={<Collaboration />} />

            <Route
              path="/admin"
              element={isLoggedIn ? <Admin /> : <Home />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;