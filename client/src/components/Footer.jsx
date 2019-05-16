import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="page-footer transparent">
        <div className="container center">
          <p className="light grey-text">
            By Doctors For Doctors - Made with ❤ by Giuseppe Locanto -{" "}
          </p>
          <a className="grey-text" href="mailto:peplocanto@gmail.com">
            <i className="material-icons">email</i>{" "}
          </a>
        </div>
      </footer>
    );
  }
}
