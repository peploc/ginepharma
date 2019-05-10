import React, { Component } from 'react';
import AuthService from "../services/auth-service";
import { Link, Redirect } from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: this.props.name, password: '', logged: false, error: '' };
        this.service = new AuthService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.service.login(username, password)
             .then(response => {            
                 this.setState({ username: "", password: "", logged: true }, () => this.props.logged(response));
             })
             .catch(error => {
                console.log(error)
                this.setState({ error: error.response.data.message});
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        // this.state.error = ''
    }

    render(){
      return(
        
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
            
            <input type="submit" value="Login" />
          </form>
          <p>Don't have an account? 
              <Link to={"/verification"}> Signup</Link>
          </p>
          {(() => {
          if (this.state.error !== "") {
            return (<p>{this.state.error}</p>)}
          })()}
        </div>
      )
    }
}