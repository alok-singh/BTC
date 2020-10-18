import React, { Component } from "react";

export default class TestComponent extends Component {
  render() {
    return <div className="main">{this.props.render("somedata")}</div>;
  }
}
