import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link } from 'react-router-dom';


export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
      },      
    };

    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.user.username;
    const password = this.state.user.password;
    const email = this.state.user.email;

    this.service.signup(username, email, password)
    .then( response => {
      console.log(response)
        this.setState({
            username: "", 
            password: "",
            email: ""
        });
        // this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

 
  handleChange = event => {
    const { name, value } = event.target;
 
    this.setState({ user:{ ...this.state.user, [name]: value } });
    
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
  
        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p>
  
      </div>
    )
  }
}