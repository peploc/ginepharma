import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./Navbar";
import "../style/Home.css";

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

        <div id="title">
          {" "}<div id="index-banner" className="parallax-container">
            
              <div className="container">
                <h1 className="header">GinePharma</h1>
                <div className="row">
                  <h4>
                    GinePharma is the unique search engine in the world <br />
                    for drugs breastfeeding and pregnancy category risk.
                  </h4>
                </div>
            
            </div>
            <div className="parallax">
              <img src="./images/breastf.jpg" alt="bf" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="grey-text">
                    <i className="material-icons">beenhere</i>
                  </h2>
                  <h5>Reliable</h5>
                  <p className="light hide-on-med-and-down">
                    Its database counts over than 1500 active principles and
                    still growing.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="grey-text">
                    <i className="material-icons">flash_on</i>
                  </h2>
                  <h5>Fast</h5>
                  <p className="light hide-on-med-and-down">
                    Faster than a vademecum, GineFharma's focused on this kind
                    of search and return only what you need
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="grey-text">
                    <i className="material-icons">grade</i>
                  </h2>
                  <h5>Free</h5>
                  <p className="light hide-on-med-and-down">What Else?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="parallax-container">
          {this.state.switch
            ? <Signup
                from={true}
                switchFunction={() => this.switchFunction()}
                getUser={user => this.props.getUser(user)}
              />
            : <Login
                from={true}
                switchFunction={() => this.switchFunction()}
                getUser={user => this.props.getUser(user)}
              />}

          <div className="parallax">
            <img src="./images/bg2.jpg" alt="Unsplashed background img 2" />
          </div>
        </div>

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 center">
                <h3 id="database">Api and DataBase</h3>
                <p className="light">
                  Based on australian pregnancy risk classification and on
                  european data about breastfeeding and nursing risk, our
                  database stores +1500 active principles categorized by
                  pregnancy risk, +800 have lactancy risk classification too.
                  Search an active principle into the searchbar, check its
                  risk's class, GinePharma will automatically provide safer
                  alternatives to the searched drug.
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
