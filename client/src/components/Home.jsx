import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./Navbar";
import bfbg from "../images/breastf.jpg";
import bg2 from "../images/bg2.jpg";
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

        <div id="index-banner" class="parallax-container">
          <div class="section no-pad-bot">
            <div class="container">
              <h1 class="header">GinePharma</h1>
              <div class="row">
                <h4 class="header col s12 light">
                  GinePharma is the unique search engine in the world <br />
                  for drugs breastfeeding and pregnancy category risk.
                </h4>
              </div>
            </div>
          </div>
          <div class="parallax">
            <img src={bfbg} alt="bf" />
          </div>
        </div>

        <div class="container">
          <div class="section">
            <div class="row">
              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">beenhere</i>
                  </h2>
                  <h5 class="center">Reliable</h5>
                  <p class="light hide-on-med-and-down">
                    Its database counts over than 1500 active principles and
                    still growing.
                  </p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">flash_on</i>
                  </h2>
                  <h5 class="center">Fast</h5>
                  <p class="light hide-on-med-and-down">
                    Faster than a vademecum, GineFharma's focused on this kind
                    of search and return only what you need
                  </p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">grade</i>
                  </h2>
                  <h5 class="center">Free</h5>
                  <p class="light center hide-on-med-and-down">What Else?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="parallax-container">
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

          <div class="parallax">
            <img src={bg2} alt="Unsplashed background img 2" />
          </div>
        </div>

        <div class="container">
          <div class="section">
            <div class="row">
              <div class="col s12 center">
                <h3 class="">Api and DataBase</h3>
                <p class="light">
                  Based on australian pregnancy risk classification and on european data about breastfeeding and nursing risk, our database stores +1500 active principles categorized by pregnancy risk, +800 have pregnancy risk classification too.
                  Check an active principle into the searchbar, check its risk's class, GinePharma will automatically provide safer alternatives to the searched drug.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer class="page-footer transparent">
          <div class="container center">
            <p class="light grey-text">
              By Doctors For Doctors - Made with ❤ by Giuseppe Locanto -{" "}
            </p>
            <a class="grey-text" href="mailto:peplocanto@gmail.com">
              <i class="material-icons">email</i>{" "}
            </a>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
