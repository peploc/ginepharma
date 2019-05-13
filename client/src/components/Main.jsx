import React, { Component } from "react";
import Services from "../services/pharma-service";
import SearchBar from "./SearchBar";
import Card from "./Card";

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
    filtered = obj.pregnancy ? filtered.filter(el => el.Pregnancy_category === "A") : filtered
    filtered = obj.lactation ? filtered.filter(el => el.Lactation_category === "0") : filtered
    filtered = filtered.filter(el => {
        if (el.Name.toLowerCase().includes(obj.keyword.toLowerCase()) ||
        el.Class1.toLowerCase().includes(obj.keyword.toLowerCase()) ||
        el.Class2.toLowerCase().includes(obj.keyword.toLowerCase()) ||
        el.Class3.toLowerCase().includes(obj.keyword.toLowerCase())
        ) return el
    });
    this.setState({
      ...this.state,
      dataShowed: filtered
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          search={obj => this.search(obj)}
          logout={() => this.props.logout()}
        />
        {this.state.dataShowed.map((dat, idx) => {
          if(idx > 59) return
          return <Card key={idx} {...dat}/>;
        })}
      </div>
    );
  }
}
