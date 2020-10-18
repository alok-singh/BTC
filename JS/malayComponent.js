import React, { Component } from "react";
import { data } from "../Data/languageMap";
import TestComponent from "./testComponent";

export default class MalayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(JSON.stringify(data.english)),
      language: "english",
    };
    this.activeMap = {};
  }

  onClickCard(key) {
    this.activeMap[key] = !this.activeMap[key];
    this.setState({});
  }

  componentDidMount() {
    const language = window.location.pathname.split("/").pop();
    window.langData = data[language];
    this.setState({
      language,
      data: JSON.parse(JSON.stringify(data[language])),
    });
  }

  render() {
    return (
      <div className="main">
        {Object.keys(this.state.data).map((key) => {
          return (
            <div
              className={`${this.activeMap[key] ? "active" : ""} card`}
              onClick={() => this.onClickCard(key)}
            >
              {this.activeMap[key] ? this.state.data[key] : key}
            </div>
          );
        })}
        <TestComponent
          render={(prop) => {
            return <span>{JSON.stringify(prop)}</span>;
          }}
        />
      </div>
    );
  }
}
