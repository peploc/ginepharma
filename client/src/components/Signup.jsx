import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link } from 'react-router-dom';


export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: this.props.name,
        email: "",
        password: "",
        error: ""
      }

    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    this.service.signup(username, email, password)
    .then( response => {
      this.props.signed(this.state.username)
        this.setState({
            username: "", 
            password: "",
            email: ""
        });
    })
    .catch( error => {
        this.setState({ ...this.state, username: "", email: "", password: "", error: error.response.data.message})
    })
  }

 
  handleChange = event => {
    const { name, value } = event.target;
 
    this.setState({ ...this.state, [name]: value } );
    
  };

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Signup" />
        </form>
        {(() => {
          if (this.state.error !== "") {
            return (<p>{this.state.error}</p>)}
        })()}
      </div>
    )
  }
}