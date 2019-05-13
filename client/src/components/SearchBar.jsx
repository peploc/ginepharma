import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";

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
        <input
          className="search"
          type="text"
          name="title"
          value={this.state.keyword}
          placeholder="Find by Name or Class"
          onChange={e => {
            this.setKey(e.target.value);
          }}
        />
        <form>
          <span>Low Risk Pharma Filter</span>

          <input
            type="checkbox"
            name="filter"
            value="pregnancy"
            onClick={e => {
              this.toggle(e.target.value);
            }}
          />
          <label htmlFor="pregnancy">Pregnancy</label>
          <input
            type="checkbox"
            name="filter"
            value="lactation"
            onClick={e => {
              this.toggle(e.target.value);
            }}
          />
          <label htmlFor="lactation">Lactation</label>
        </form>
        <button onClick={() => this.props.logout()}>Logout</button>
      </React.Fragment>
    );
  }
}
