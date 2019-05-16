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
      <Link to={`/one/${this.props._id}`}>
        <div
          className={`pharmacard ${this.props.main ? "main" : null}`}
        >
          <h6 className="card-header trunk-title">
            {this.props.Name}
          </h6>
          <div className="card-content">
            <div className="card-image">
              <img src={this.color[this.props.Pregnancy_category]} />{" "}
              <img src={this.color[this.props.Lactation_category]} />
            </div>

            <div className="card-list">
              <ul>
                <li className="trunk-li">
                  {this.props.Class1}
                </li>
                {this.props.Class2 === "x"
                  ? null
                  : <li className="trunk-li">
                      {this.props.Class2}
                    </li>}
                {this.props.Class3 === "x"
                  ? null
                  : <li className="trunk-li">
                      {this.props.Class3}
                    </li>}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
