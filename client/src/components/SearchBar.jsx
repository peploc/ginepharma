import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import "../style/SearchBar.css";

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      pregnancy: false,
      lactation: false
    };
  }

  toggle = key => {
    this.setState(
      {
        ...this.state,
        [key]: !this.state[key]
      },
      () => this.props.search(this.state)
    );
  };

  setKey = key => {
    this.setState(
      {
        ...this.state,
        keyword: key
      },
      () => this.props.search(this.state)
    );
  };

  render() {
    return (
      <React.Fragment>
        <nav id="search-nav" className="hide-on-med-and-down z-depth-3 white">
          <div id="dex-nav" className="nav-wrapper valign-wrapper">
            <img src={logo} className="brand-logo left" />
            <form id="dex-form" className="valign-wrapper">
              <div className="input-field">
                <input
                  id="search"
                  className="search"
                  type="search"
                  name="title"
                  value={this.state.keyword}
                  placeholder="Find by Name or Class"
                  onChange={e => {
                    this.setKey(e.target.value);
                  }}
                />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons">close</i>
              </div>
              <label className="dex-check" htmlFor="pregnancy">
                <input
                  id="pregnancy"
                  type="checkbox"
                  name="filter"
                  value="pregnancy"
                  onClick={e => {
                    this.toggle(e.target.value);
                  }}
                />
                <span>Pregnancy Safe</span>
              </label>
              <label className="dex-check" htmlFor="lactation">
                <input
                  id="lactation"
                  type="checkbox"
                  name="filter"
                  value="lactation"
                  onClick={e => {
                    this.toggle(e.target.value);
                  }}
                />
                <span>Lactation Safe</span>
              </label>
            </form>
            <ul className="right">
              <li>
                <a
                  onClick={() => this.props.logout()}
                  id="dex-btn"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <nav id="search-nav" className="nav-extended hide-on-large-only">
          <div id="mob-nav" className="nav-wrapper valign-wrapper">
            <img src={logo} className="brand-logo left" />
            <form id="mob-form" className="">
              <div className="input-field valign-wrapper">
                <input
                  id="search"
                  className="search"
                  type="search"
                  name="title"
                  value={this.state.keyword}
                  placeholder="Find by Name or Class"
                  onChange={e => {
                    this.setKey(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
          <div className="nav-content">
            <form>
              <label className="mob-check col s6" htmlFor="mob-pregnancy">
                <input
                  id="mob-pregnancy"
                  type="checkbox"
                  name="filter"
                  value="pregnancy"
                  onClick={e => {
                    this.toggle(e.target.value);
                  }}
                />
                <span>Pregnancy Safe</span>
              </label>
              <label className="mob-check col s6" htmlFor="mob-lactation">
                <input
                  id="mob-lactation"
                  type="checkbox"
                  name="filter"
                  value="lactation"
                  onClick={e => {
                    this.toggle(e.target.value);
                  }}
                />
                <span>Lactation Safe</span>
              </label>
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
