import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link, Redirect } from "react-router-dom";

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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Complete Name: </label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />

          <label>Medical License Number: </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Login" />
        </form>
        {(() => {
          if (this.state.error !== "") {
            return (
              <p>
                {this.state.error}
              </p>
            );
          }
        })()}
        {!this.props.from
          ? <p>
              Don't have an account?
              <Link to={"/signup"}>Signup</Link>
            </p>
          : <p>
              Don't have an account?
              <button onClick={this.props.switchFunction}>Signup</button>
            </p>}
      </div>
    );
  }
}
