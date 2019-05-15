import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/ExtendedCard.css";
import Card from "./Card";
import logo from "../logo.png";
import PharmaServices from "../services/pharma-service";

export default class ExtendedCard extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      data: [],
      all: [],
      alternatives: []
    };
    this.service = new PharmaServices();
  }

  stringNormalizer(str) {
    str = str.toLowerCase().normalize("NFC").replace(/ /g, "");
    str = str.indexOf("(") > -1 ? str.substring(0, str.indexOf("(")) : str;
    str = str.replace(/[^a-z]+/g, "");
    return str;
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.service.oneData(id).then(data => {
      this.setState({
        ...this.state,
        id: id,
        data: data
      });
      let class1 = this.stringNormalizer(data.Class1);
      let class2 =
        data.Class2 !== "x" ? this.stringNormalizer(data.Class2) : null;
      let class3 =
        data.Class3 !== "x" ? this.stringNormalizer(data.Class3) : null;

      this.service.all().then(data => {
        let all = data;
        let alternatives = data.filter(el => {
          if (
            (this.stringNormalizer(el.Class1) === class1 ||
              this.stringNormalizer(el.Class2) === class2 ||
              this.stringNormalizer(el.Class3) === class3) &&
            (el.Pregnancy_category === "A" || el.Lactation_category === "L1") &&
            el.Name !== this.state.data.Name
          ) {
            return el;
          }
        });
        this.setState({
          ...this.state,
          alternatives: alternatives,
          all: all
        });
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let id = this.props.match.params.id;
      let one;
      this.service.oneData(id).then(data => {
        one = data;
        let class1 = this.stringNormalizer(data.Class1);
        let class2 =
          data.Class2 !== "x" ? this.stringNormalizer(data.Class2) : null;
        let class3 =
          data.Class3 !== "x" ? this.stringNormalizer(data.Class3) : null;

        this.service.all().then(data => {
          let all = data;
          let alternatives = data.filter(el => {
            if (
              (this.stringNormalizer(el.Class1) === class1 ||
                this.stringNormalizer(el.Class2) === class2 ||
                this.stringNormalizer(el.Class3) === class3) &&
              (el.Pregnancy_category === "A" ||
                el.Lactation_category === "L1") &&
              el.Name !== this.state.data.Name
            ) {
              return el;
            }
          });
          window.scrollTo(0, 0);
          this.setState({
            ...this.state,
            alternatives: alternatives,
            data: one,
            all: all
          });
        });
      });
    }
  }

  render() {
    let data = this.state.data;
    if (this.state.alternatives.length === 0) {
      return (
        <div className="progress">
          <div className="indeterminate deep-purple lighten-2" />
        </div>
      );
    } else {
      return (
        <div className="row">
          <nav id="ext-nav" className="col s12">
            {" "}<Link to="/app">
              <div className="valign-wrapper"><img src={logo} alt="logo" /> <p>  Back to Home</p></div>
            </Link>{" "}
          </nav>
          <div>
            <div className="extendedCard col s12 l6">
              <h2>
                {data.Name}
              </h2>
              <h5>
                Pregnancy Risk Class:{" "}
                <Link to="/risktable">{data.Pregnancy_category}</Link>
              </h5>
              <p>
                <a
                  href={`${data.GURL}+pregnancy+nlm.nih`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Resources
                </a>
              </p>
              <h5>
                Lactation Risk Class:{" "}
                <Link to="/risktable">{data.Lactation_category}</Link>
              </h5>
              <p>
                <a
                  href={`${data.GURL}+breastfeeding+nlm.nih`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Resources
                </a>
              </p>
              <ul id="pharmaclass">
                <li className="valign-wrapper">
                  <i className="small material-icons">chevron_right</i>{data.Class1}
                </li>
                {data.Class2 === "x"
                  ? null
                  : <li className="valign-wrapper">
                      <i className="small material-icons">chevron_right</i>{data.Class2}
                    </li>}
                {data.Class3 === "x"
                  ? null
                  : <li className="valign-wrapper">
                      <i className="small material-icons">chevron_right</i>{data.Class3}
                    </li>}
              </ul>
            </div>
            <div className="ext-card-list">
              <div className="list-alternatives lactation col s12 l3">
                <h5>Lactation Safe Alternatives</h5>
                {this.state.alternatives
                  .filter(
                    el =>
                      el.Lactation_category === "L1" &&
                      el.Name !== this.state.data.Name
                  )
                  .map((dat, idx) => {
                    if (idx > 5) return;
                    return <Card key={idx} {...dat} />;
                  })}
              </div>
              <div className="list-alternatives pregnancy col s12 l3">
                <h5>Pregnancy Safe Alternatives</h5>
                {this.state.alternatives
                  .filter(
                    el =>
                      el.Pregnancy_category === "A" &&
                      el.Name !== this.state.data.Name
                  )
                  .map((dat, idx) => {
                    if (idx > 5) return;
                    return <Card key={idx} {...dat} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
