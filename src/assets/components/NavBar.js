import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = ({ setCurrentPage, currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const shouldUseDarkText = () => {
    return currentPage === "gallery";
  };

  const handleShopClick = () => {
    window.location.href = "https://holvi.com/shop/AALTORUNNINGCLUB/"; // Replace with the actual URL
  };

  return (
    <nav className={`navbar ${shouldUseDarkText() ? 'dark-text' : ''}`}>
      <div className="nav-container">
        {/* Left Side - Navigation Buttons (Hidden in Mobile) */}
        <div className="nav-items left desktop-only">
          <button onClick={() => setCurrentPage("home")} className={currentPage === "home" ? "active" : ""}>Home</button>
          <button onClick={() => setCurrentPage("events")} className={currentPage === "events" ? "active" : ""}>Events</button>
          <button onClick={() => setCurrentPage("community")} className={currentPage === "community" ? "active" : ""}>Community</button>
        </div>

        {/* Center - ARC Logo */}
        <div className="nav-logo">ARC<span className="tm">TM</span></div>

        {/* Right Side - Navigation Buttons (Hidden in Mobile) */}
        <div className="nav-items right desktop-only">
          <button></button>
          <button onClick={() => setCurrentPage("gallery")} className={currentPage === "gallery" ? "active" : ""}>Sponsors</button>
          <button onClick={() => setCurrentPage("contact")} className={currentPage === "contact" ? "active" : ""}>Contact</button>
          <button onClick={handleShopClick} className="shop">Shop</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => { setCurrentPage("home"); setMenuOpen(false); }} className={currentPage === "home" ? "active" : ""}>Home</button>
        <button onClick={() => { setCurrentPage("events"); setMenuOpen(false); }} className={currentPage === "events" ? "active" : ""}>Events</button>
        <button onClick={() => { setCurrentPage("community"); setMenuOpen(false); }} className={currentPage === "community" ? "active" : ""}>Community</button>
        <button onClick={() => { setCurrentPage("contact"); setMenuOpen(false); }} className={currentPage === "contact" ? "active" : ""}>Contact</button>
        <button onClick={() => { setCurrentPage("gallery"); setMenuOpen(false); }} className={currentPage === "gallery" ? "active" : ""}>Sponsors</button>
        <button onClick={handleShopClick} className="shop">Shop</button>
      </div>

      <style>{`
        /* Global Reset */
        body {
          margin: 0;
          padding: 0;
          background-color: black;
          color: white;
          font-family: Arial, sans-serif;
        }

        /* Navbar Styling */
        .navbar {
          position: fixed;
          top: 5px;
          left: 0;
          width: 100%;
          height: 60px;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          z-index: 1000;
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease-in-out;
        }

        /* Hover Effect - Navbar Pops Up */
        .navbar:hover {
          transform: translateY(-3px);
          background: rgba(0, 0, 0, 0.3); /* Darker background color on hover */
        }

        /* Underline Effect on Hover */
        .navbar:hover::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background: #FF4500;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        /* Navbar Container */
        .nav-container {
          width: 90%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        

        /* Add these new styles for dark text mode */
        .navbar.dark-text {
          color: black;
        }

        .navbar.dark-text .nav-items button {
          color: black;
        }

        .navbar.dark-text .nav-items button:hover, 
        .navbar.dark-text .nav-items button.active {
          color: #FF4500;
        }

        .navbar.dark-text .nav-logo {
          color: black;
        }

        .navbar.dark-text .hamburger {
          color: black;
        }

        /* Update hover effect for dark text mode */
        .navbar.dark-text:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Navigation Buttons */
        .nav-items {
          display: flex;
          gap: 20px;
        }

        .nav-items button {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          padding: 10px 20px;
          text-transform: uppercase;
        }

        .nav-items button:hover, .nav-items button.active {
          color: #FF4500;
        }

        /* ARC Logo */
        .nav-logo {
          font-size: 18px;
          font-weight: bold;
              position: absolute; /* Position it absolutely within the container */
              left: 50%; /* Move to the horizontal center */
              transform: translateX(-50%); /* Adjust for the element's width */
        }

        .tm {
          font-size: 10px;
          position: relative;
          top: -12px;
          margin-left: 3px;
        }

        /* Hamburger Button (Only Mobile) */
        .hamburger {
          display: none;
          cursor: pointer;
          color: white;
          background: transparent;
          z-index: 1100;
        }

        /* Mobile Full-Screen Sliding Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          transition: right 0.3s ease-in-out;
          z-index: 1000;
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu button {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          text-transform: uppercase;
        }

        .mobile-menu button:hover, .mobile-menu button.active {
          color: #FF4500;
        }

        /* Responsive Adjustments */
        @media (max-width: 720px) {
          .desktop-only {
            display: none;
          }
          .mobile-only {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;