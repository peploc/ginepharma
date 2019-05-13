import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        <Link to={`/one/${this.props._id}`}>
          <h3>
            {this.props.Name}
          </h3>
        </Link>
        <p>
          Pregnancy Risk Class: {this.props.Pregnancy_category}
        </p>
        <p>
          Lactation Risk Class: {this.props.Lactation_category}
        </p>
          <ul>
            <li>
              {this.props.Class1}
            </li>
            {this.props.Class2 === "x"
              ? null
              : <li>
                  {this.props.Class2}
                </li>}
            {this.props.Class3 === "x"
              ? null
              : <li>
                  {this.props.Class3}
                </li>}
          </ul>
      </div>
    );
  }
}
