import React from "react";
import "./App.css";
// Components
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"
// Routing & DOM
import { Switch, Route } from "react-router-dom";
// Service
import authService from "./services/auth-service";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new authService();
  }

  fetchUser = () => {
    this.service
      .loggedin()
      .then(response => {
        console.log(response);
        this.setState({ loggedInUser: response });
      })
      .catch(x => this.setState({ loggedInUser: false }));
  };

  setTheUser = userObj => {
    this.setState({ loggedInUser: userObj });
  };

  render() {
    const { loggedInUser } = this.state
    
    return (
      <div>
        <Switch>
          <Route user={this.state.loggedInUser} exact path='/' component={Home} />
          <Route exact path='/signup' render={() => 
            <Signup setUser={this.setTheUser} userInSession={this.state.loggedInUser}/>} />
          <Route exact path='/login' render={() => 
            <Login setUser={this.setTheUser} userInSession={this.state.loggedInUser} />} /> 
        </Switch>
      </div>
    )
  }
}
