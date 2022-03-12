import React, { Component } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Artel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Plan
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Report
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link to="/product" className="dropdown-item">
                    Product
                  </Link>
                </li>
                <li>
                  <Link to="/brand" className="dropdown-item">
                    Brand
                  </Link>
                </li>
                <li>
                  <Link to="/productBrand" className="dropdown-item">
                    Product-Brand
                  </Link>
                </li>
                <li>
                  <Link to="/model" className="dropdown-item">
                    Model
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
