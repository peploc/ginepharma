import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png"

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <img src={logo} alt="logo" />
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </nav>
    );
  }
}
