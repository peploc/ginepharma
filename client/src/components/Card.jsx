import React, { Component } from "react";
import { Link } from "react-router-dom";
import lactancyLogoL1 from "../images/lact/lactancyL1.svg";
import lactancyLogoL2 from "../images/lact/lactancyL2.svg";
import lactancyLogoL3 from "../images/lact/lactancyL3.svg";
import lactancyLogoL4 from "../images/lact/lactancyL4.svg";
import lactancyLogoN from "../images/lact/lactancyN.svg";

import pregnancyLogoA from "../images/preg/pregnancyA.svg";
import pregnancyLogoB1 from "../images/preg/pregnancyB1.svg";
import pregnancyLogoB2 from "../images/preg/pregnancyB2.svg";
import pregnancyLogoB3 from "../images/preg/pregnancyB3.svg";
import pregnancyLogoC from "../images/preg/pregnancyC.svg";
import pregnancyLogoD from "../images/preg/pregnancyD.svg";
import pregnancyLogoX from "../images/preg/pregnancyX.svg";

import "../style/Card.css";

export default class Card extends Component {
  color = {
    A: pregnancyLogoA,
    B1: pregnancyLogoB1,
    B2: pregnancyLogoB2,
    B3: pregnancyLogoB3,
    C: pregnancyLogoC,
    D: pregnancyLogoD,
    X: pregnancyLogoX,
    L1: lactancyLogoL1,
    L2: lactancyLogoL2,
    L3: lactancyLogoL3,
    L4: lactancyLogoL4,
    N: lactancyLogoN
  };

  render() {
    return (
      <div className={this.props.main ? "card horizontal col s12 m6 l4" : "card horizontal"} style={{ height: "15vh" }}>
        <div className="card-image">
          <div className="valign-wrapper">
            <img
              src={this.color[this.props.Pregnancy_category]}
              style={{ height: "5vh" }}
            />
            <p>
              {this.props.Pregnancy_category}
            </p>
          </div>
          <div className="valign-wrapper">
            {" "}<img
              src={this.color[this.props.Lactation_category]}
              style={{ height: "5vh" }}
            />
            <p>{this.props.Lactation_category}</p>
          </div>
        </div>
        <div className="card-stacked">
          <div className="card-action">
            <Link to={`/one/${this.props._id}`}>
              <h6 className="header">
                {this.props.Name}
              </h6>
            </Link>
          </div>
          <div className="card-content">
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
        </div>
      </div>
    );
  }
}
