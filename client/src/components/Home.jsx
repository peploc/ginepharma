import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom"

export default class Home extends Component {
  render() {
    if(this.props.user) return <h1>hola user</h1>
    return(
      <Redirect to="/login" />
    )
  }
}
