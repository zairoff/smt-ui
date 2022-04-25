import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {user ? user.username : "Artel"}
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active" aria-current="page">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Plan
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Report
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/department" className="nav-link">
                Department
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink to="/product" className="dropdown-item">
                    Product
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/brand" className="dropdown-item">
                    Brand
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/productBrand" className="dropdown-item">
                    Product-Brand
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/model" className="dropdown-item">
                    Model
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/defect" className="dropdown-item">
                    Defect
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/line" className="dropdown-item">
                    Line
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/lineDefect" className="dropdown-item">
                    Line-Defect
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!user && (
              <React.Fragment>
                <NavLink to="/register" className="nav-item nav-link">
                  Register
                </NavLink>
                <NavLink to="/login" className="nav-item nav-link">
                  Login
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink to="/" className="nav-item nav-link">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
