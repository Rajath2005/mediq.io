// Navbar.js
import React from "react";
import logo from './images/logo.png';
import './Navbar.css';
/**
 * Navbar component
 * 
 * @returns {JSX.Element} The Navbar component
 */
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavbarBrand />
        <NavbarToggler />
        <NavbarCollapse />
      </div>
    </nav>
  );
};

/**
 * NavbarBrand component
 * 
 * @returns {JSX.Element} The NavbarBrand component
 */
const NavbarBrand = () => {
  return (
    <a className="navbar-brand" href="#">
      <img
        src={logo}
        alt="Logo"
        width="30"
        height="30"
        className="d-inline-block align-text-top"
      />
      Navbar
    </a>
  );
};

/**
 * NavbarToggler component
 * 
 * @returns {JSX.Element} The NavbarToggler component
 */
const NavbarToggler = () => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};

/**
 * NavbarCollapse component
 * 
 * @returns {JSX.Element} The NavbarCollapse component
 */
const NavbarCollapse = () => {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <NavbarNav />
      <NavbarSearch />
    </div>
  );
};

/**
 * NavbarNav component
 * 
 * @returns {JSX.Element} The NavbarNav component
 */
const NavbarNav = () => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Link
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};

/**
 * NavbarSearch component
 * 
 * @returns {JSX.Element} The NavbarSearch component
 */
const NavbarSearch = () => {
  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Navbar;
