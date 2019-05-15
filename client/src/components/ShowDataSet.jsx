import React, { Component } from "react";

export default class ShowDataSet extends Component {

  margin = 20,
  diameter = +this.svg.attr("width"),
  g = this.svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

  render() {
    return (
      <svg
        width={this.props.size}
        height={this.props.size}
        ref={element => (this.svg = d3.select(element))}
      />
    );
  }
}
