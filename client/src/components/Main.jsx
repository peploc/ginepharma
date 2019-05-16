import React, { Component } from "react";
import Services from "../services/pharma-service";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Preloader from "./Preloader";
import "../style/Main.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataCopy: [],
      dataShowed: []
    };
  }

  Services = new Services();

  componentDidMount() {
    this.Services.all().then(data => {
      this.setState({
        ...this.state,
        dataCopy: data,
        dataShowed: data
      });
    });
  }

  search(obj) {
    let filtered = [...this.state.dataCopy];
    filtered = obj.pregnancy
      ? filtered.filter(el => el.Pregnancy_category === "A")
      : filtered;
    filtered = obj.lactation
      ? filtered.filter(el => el.Lactation_category === "L1")
      : filtered;
    filtered = filtered.filter(el => {
      if (
        el.Name.toLowerCase().includes(obj.keyword.toLowerCase()) ||
        el.Class1.toLowerCase().includes(obj.keyword.toLowerCase()) ||
        el.Class2.toLowerCase().includes(obj.keyword.toLowerCase()) ||
        el.Class3.toLowerCase().includes(obj.keyword.toLowerCase())
      )
        return el;
    });
    this.setState({
      ...this.state,
      dataShowed: filtered
    });
  }

  render() {
    window.scrollTo(0, 0);
    if (this.state.dataCopy.length === 0) {
      return <Preloader />
    } else {
      return (
        <div id="main" className="row">
          <SearchBar
            search={obj => this.search(obj)}
            logout={() => this.props.logout()}
          />
          <div className="col s12 cards-container">
            {this.state.dataShowed.map((dat, idx) => {
              if (idx > 59) return;
              return <Card key={idx} {...dat} main={true} />;
            })}
          </div>
        </div>
      );
    }
  }
}
