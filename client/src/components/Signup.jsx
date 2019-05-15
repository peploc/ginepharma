import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link } from "react-router-dom";
import "../style/Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "");
    const password = this.state.password;

    this.service
      .signup(username, password)
      .then(response => {
        this.props.getUser(response);
        this.setState({
          username: "",
          password: "",
          email: ""
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          username: "",
          password: "",
          error: error.response.data.message
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div id="signup">
        <div className="row container valign-wrapper center-align">
          <form className="col s12" onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">account_circle</i>
              <input
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
              <label htmlFor="username">Complete Name</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">enhanced_encryption</i>
              <input
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
              <label htmlFor="password">Medical License Number</label>
            </div>
            <input type="submit" value="Signup" />
          </form>
        </div>
        {(() => {
          if (this.state.error !== "") {
            return (
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                {this.state.error}
              </span>
            );
          }
        })()}
        {!this.props.from
          ? <p>
              Do you already have an account?
              <Link to={"/login"}>Login</Link>
            </p>
          : <p>
              Do you already have an account?
              <button onClick={this.props.switchFunction}>Login</button>
            </p>}
      </div>
    );
  }
}
