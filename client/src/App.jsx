import React from "react";
import "./App.css";
// Components
import Signup from "./components/Signup";
import Verification from "./components/Verification";
import Login from "./components/Login";
import Home from "./components/Home"
import Main from "./components/Main"
import NotFound from "./components/NotFound"
// Routing & DOM
import { Switch, Route, Redirect } from "react-router-dom";
// Service
import authService from "./services/auth-service";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logged: false, verified: false, signed: false, user: null, name: "" };
    this.service = new authService();
  }

  logged(user){
    this.setState({
      ...this.state,
      logged: true,
      user: user
    })
  }

  verified(name){
    this.setState({
      ...this.state,
      verified: true,
      name: name
    })
  }

  signed(name){
    this.setState({
      ...this.state,
      signed: true,
      name: name
    })
  }

  render() {    
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/app' render={() =>
            this.state.logged ? <Main /> :
            <Redirect to={"/login"}/> } />

          <Route exact path='/verification' render={() => 
            this.state.logged ? <Redirect to={"/app"}/> :
            <Verification verified={val => this.verified(val)}/> } />

          <Route exact path='/signup' render={() => 
            this.state.logged ? <Redirect to={"/app"}/> :
            this.state.signed ? <Redirect to={"/login"}/> :
            this.state.verified ? <Signup name={this.state.name} signed={name => this.signed(name)}/> :
            <Redirect to={"/verification"}/> }/>

          <Route exact path='/login' render={() => 
            this.state.logged ? <Redirect to={"/app"}/> :
            <Login name={this.state.name} logged={user => this.logged(user)}/> } />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}
