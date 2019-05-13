import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link } from "react-router-dom";

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

          <input type="submit" value="Signup" />
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
