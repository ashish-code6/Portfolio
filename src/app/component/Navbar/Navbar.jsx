"use client";

import Link from "next/link";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <img src="/images/logo.png" alt="Logo" style={{ height: "80px", width: "auto" }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${isNavOpen ? "toggler-open" : ""}`} />
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-center w-100">
            <li className="nav-item me-3"><Link className="nav-link" href="/" onClick={closeNav}>Home</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" href="#about" onClick={closeNav}>About Us</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" href="#education" onClick={closeNav}>Education</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" href="#project" onClick={closeNav}>Project</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" href="#profile" onClick={closeNav}>Profile</Link></li>
            <li className="nav-item me-3"><Link className="nav-link" href="#contact" onClick={closeNav}>Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
