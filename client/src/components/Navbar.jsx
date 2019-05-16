import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import "../style/Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="hide-on-med-and-down white" role="navigation">
        <div className="nav-wrapper">
            <div id="logo-container" className="brand-logo">
              <img src={logo} alt="logo" /> <span>GinePharma</span>
            </div>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
