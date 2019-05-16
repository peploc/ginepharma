import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link, Redirect } from "react-router-dom";
import "../style/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name,
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
      .login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" }, () =>
          this.props.getUser(response)
        );
      })
      .catch(error => {
        this.setState({ error: error.response.data.message });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="login" className={`${this.props.from ? null : "page"}`}>
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
            <input className="btn-flat" type="submit" value="Login" />
        {(() => {
          if (this.state.error !== "") {
            return (
              <p id="error-message">
                {this.state.error}
              </p>
            );
          }
        })()}
          </form>
        </div>
        {!this.props.from
          ? <p>
              Don't you have an account?
              <Link className="btn-flat" to={"/signup"}>
                Signup
              </Link>
            </p>
          : <p>
              Don't you have an account?
              <button className="btn-flat" onClick={this.props.switchFunction}>
                Signup
              </button>
            </p>}
      </div>
    );
  }
}
