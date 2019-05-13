import React from "react";
import "./App.css";
// Components
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"
import Main from "./components/Main"
import ExtendedCard from './components/ExtendedCard'
import NotFound from "./components/NotFound"
// Routing & DOM
import { Switch, Route, Redirect } from "react-router-dom";
// Service
import AuthService from "./services/auth-service";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
    this.state = { user: this.fetchUser() };
  }

  fetchUser = () => {
    this.service
      .loggedin()
      .then(response => {
        this.setState({ user: response });
      })
      .catch(x => this.setState({ user: false }));
  };

  setTheUser = (user) => { this.setState({ user: user }) }

  logout = () => {
    this.service.logout()
    .then(response => {
      this.setState({ user: null });
    })
  }
  
  componentWillMount(){this.fetchUser()}

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() =>
            this.state.user ? <Redirect to={"/app"}/> :
            <Home getUser={(user) => this.setTheUser(user)}/> } />

          <Route exact path='/app' render={() =>
            this.state.user ? <Main logout={() => this.logout()} /> :
            <Redirect to={"/"}/> } />

          <Route path='/one/:id' render={(matchProps) =>
            this.state.user ? <ExtendedCard {...matchProps} {...this.props} logout={() => this.logout()}/> :
            <Redirect to={"/"}/> } />

          <Route exact path='/signup' render={() => 
            this.state.user ? <Redirect to={"/app"}/> :
            <Signup getUser={(user) => this.setTheUser(user)} /> } from={false}/>

          <Route exact path='/login' render={() => 
            this.state.user ? <Redirect to={"/app"}/> :
            <Login getUser={(user) => this.setTheUser(user)} from={false}/> } />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}
