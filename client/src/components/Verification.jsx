import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link, Redirect } from "react-router-dom";

export default class Verification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      number: "",
      verified: false,
      error: ""
    };

    this.service = new AuthService();
  }

  checkSubmit = (event) => {
    event.preventDefault();
    const firstname = this.state.firstname.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const lastname = this.state.lastname.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const number = this.state.number

    this.service.validationCheck(firstname, lastname, number)
    .then( response => {
        this.setState({...this.state, verified: true}, () => this.props.verified(firstname));
    })
    .catch( error => {
        this.setState({ ...this.state, firstname: "", lastname: "", number: "", error: error.response.data.message})
    })
  }
 
  handleChange = event => {
    const { name, value } = event.target;
 
    this.setState({ ...this.state, [name]: value });
    
  };

  render() {
    if (this.state.verified) return <Redirect to="/signup"/>
    else {
      return (
        <div>
        <form onSubmit={this.checkSubmit}>
          <label>Firstname:</label>
          <input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={e => this.handleChange(e)}
          />

          <label>Lastname:</label>
          <input
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={e => this.handleChange(e)}
          />

          <label>Número de Colegiado:</label>
          <input
            type="number"
            name="number"
            value={this.state.number}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Check" />
        </form>
        <p>
          Already have account?
          <Link to="/login">Login</Link>
        </p>
        {(() => {
          if (this.state.error !== "") {
            return (<p>{this.state.error}</p>)}
        })()}
        </div>
      );
    }
  }
}
