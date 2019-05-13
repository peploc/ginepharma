import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ExtendedCard.css";
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
            (el.Pregnancy_category === "A" || el.Lactation_category === "0") &&
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
                el.Lactation_category === "0") &&
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
      return <h3>Loading</h3>;
    } else {
      return (
        <React.Fragment>
          <nav>
            {" "}<Link to="/app">
              {" "}<img src={logo} alt="logo" />
            </Link>{" "}
            <button onClick={() => this.props.logout()}>Logout</button>
          </nav>
          <div className="extendedCard">
            <h3>
              {data.Name}
            </h3>

            {this.state.alternatives
              .filter(el => el.Lactation_category === "0")
              .map((dat, idx) => {
                if (idx > 5) return;
                return <Card key={idx} {...dat} />;
              })}
            {this.state.alternatives
              .filter(el => el.Pregnancy_category === "A")
              .map((dat, idx) => {
                if (idx > 5) return;
                return <Card key={idx} {...dat} />;
              })}
          </div>
        </React.Fragment>
      );
    }
  }
}
