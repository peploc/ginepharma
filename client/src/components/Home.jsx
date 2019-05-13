import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./Navbar";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: false
    };
  }

  switchFunction = () => {
    this.setState({
      switch: !this.state.switch
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        {this.state.switch
          ? <Signup
              from={true}
              switchFunction={() => this.switchFunction()}
              getUser={(user) => this.props.getUser(user)}
            />
          : <Login
              from={true}
              switchFunction={() => this.switchFunction()}
              getUser={(user) => this.props.getUser(user)}
            />}
      </React.Fragment>
    );
  }
}
