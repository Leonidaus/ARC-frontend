import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from "../assets/pages/EventsPage";
import ContactPage from "../assets/pages/ContactPage";
import ImagePage from "../assets/pages/ImagePage";
import CommunityPage from "../assets/pages/CommunityPage";
import NavBar from "../assets/components/NavBar";
import HomePage from "../assets/pages/HomePage";
import LoadingScreen from "../assets/components/LoadingScreen";
import AdminPage from '../admin/AdminPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");

  const handleLoadingFinish = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <Router>
      {loading && <LoadingScreen onFinish={handleLoadingFinish} />}
      {!loading && (
        <div>
          <Routes>
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/" element={
              <>
                <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage} />
                <div>
                  {currentPage === "home" && <HomePage />}
                  {currentPage === "events" && <EventsPage />}
                  {currentPage === "contact" && <ContactPage />}
                  {currentPage === "gallery" && <ImagePage />}
                  {currentPage === "community" && <CommunityPage />}
                </div>
              </>
            } />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;